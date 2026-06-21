const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const defaults = {
    auraName: "Фиолетовый импульс",
    color: "#8b5cf6",
    count: 260,
    speed: 4,
    size: 5,
    glow: 25,
    shape: "cube",
    direction: "up",
    fxMode: "smooth",
    outfit: "default",
    hat: "none",
    weapon: "staff",
    pose: "wizard",
    pet: "wisp",
    biome: "space",
    cameraZoom: 8,
    lightPower: 7,
    spell: ""
};

const presets = {
    void: {
        auraName: "Король Бездны", color: "#8b5cf6", count: 280, speed: 4, size: 5,
        glow: 28, shape: "star", direction: "inward", fxMode: "pulse",
        outfit: "void", hat: "horns", weapon: "staff", pose: "float", pet: "wisp", biome: "space"
    },
    admin: {
        auraName: "ADMIN OVERDRIVE", color: "#ff3b30", count: 420, speed: 8, size: 4,
        glow: 32, shape: "cube", direction: "up", fxMode: "chaos",
        outfit: "noob", hat: "none", weapon: "lightsaber", pose: "combat", pet: "cubeSp", biome: "neon"
    },
    galaxy: {
        auraName: "Галактический Noob", color: "#22d3ee", count: 340, speed: 3, size: 7,
        glow: 38, shape: "sphere", direction: "up", fxMode: "pulse",
        outfit: "noob", hat: "wizardHat", weapon: "staff", pose: "float", pet: "wisp", biome: "space"
    },
    toxic: {
        auraName: "Токсичный вайб", color: "#84cc16", count: 360, speed: 6, size: 6,
        glow: 24, shape: "fire", direction: "down", fxMode: "chaos",
        outfit: "knight", hat: "horns", weapon: "sword", pose: "combat", pet: "cubeSp", biome: "dark"
    }
};

const controlIds = Object.keys(defaults);
const randomOptions = {
    shape: ["cube", "sphere", "fire", "star"],
    direction: ["up", "down", "inward"],
    fxMode: ["smooth", "pulse", "chaos"],
    outfit: ["default", "noob", "knight", "void"],
    hat: ["none", "wizardHat", "horns"],
    weapon: ["none", "staff", "lightsaber", "sword"],
    pose: ["wizard", "float", "combat", "dance"],
    pet: ["none", "cubeSp", "wisp"],
    biome: ["space", "neon", "dark"]
};
const funnyNames = [
    "Налоговый некромант", "Аура последней пятницы", "Повелитель пельменей",
    "Квантовый Noob", "Сигма Бездны", "Неоновый картофель", "Админ на минималках"
];

let toastTimer;
let saveTimer;
let ultimateActive = false;

function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function readConfig() {
    return Object.fromEntries(controlIds.map((id) => {
        const element = document.getElementById(id);
        return [id, element?.type === "range" ? Number(element.value) : element?.value];
    }));
}

function applyConfig(config, notify = false) {
    controlIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element && config[id] !== undefined) element.value = config[id];
    });
    syncInterface();
    rebuildAll();
    if (notify) showToast("Конфигурация применена");
}

function syncInterface() {
    ["count", "speed", "size", "glow", "cameraZoom", "lightPower"].forEach((id) => {
        const input = document.getElementById(id);
        const output = document.getElementById(`${id}Value`);
        if (!input) return;
        if (output) output.textContent = input.value;
        const percentage = ((input.value - input.min) / (input.max - input.min)) * 100;
        input.style.setProperty("--fill", `${percentage}%`);
    });
    $("#colorValue").textContent = $("#color").value.toUpperCase();
    setAccent($("#color").value);
    $$(".biome-card").forEach((card) => card.classList.toggle("active", card.dataset.biome === $("#biome").value));
}

function setAccent(hex) {
    const value = hex.replace("#", "");
    const rgb = [0, 2, 4].map((offset) => parseInt(value.slice(offset, offset + 2), 16));
    document.documentElement.style.setProperty("--accent", hex);
    document.documentElement.style.setProperty("--accent-rgb", rgb.join(","));
}

function scheduleSave() {
    clearTimeout(saveTimer);
    $("#saveStatus").textContent = "Сохраняю изменения…";
    saveTimer = setTimeout(() => {
        localStorage.setItem("aura-lab-config", JSON.stringify(readConfig()));
        $("#saveStatus").textContent = "Сохранено локально";
    }, 350);
}

// THREE.JS SCENE
const canvasContainer = $("#canvas3d");
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x020617, 0.035);

const camera = new THREE.PerspectiveCamera(43, 1, 0.1, 1000);
camera.position.set(0, 1.15, 8);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    preserveDrawingBuffer: true
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
canvasContainer.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.055;
controls.minDistance = 4;
controls.maxDistance = 12;
controls.maxPolarAngle = Math.PI / 2 + 0.08;
controls.target.set(0, 0.2, 0);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.62);
const keyLight = new THREE.DirectionalLight(0xffffff, 1.1);
keyLight.position.set(4, 9, 6);
keyLight.castShadow = true;
const rimLight = new THREE.PointLight(0x8b5cf6, 1.5, 18);
rimLight.position.set(-4, 2, -3);
scene.add(ambientLight, keyLight, rimLight);

const gridHelper = new THREE.GridHelper(28, 28, 0x6d5dd3, 0x20263a);
gridHelper.position.y = -2.57;
scene.add(gridHelper);

const stageMaterial = new THREE.MeshStandardMaterial({ color: 0x171c2c, roughness: 0.45, metalness: 0.5 });
const stage = new THREE.Mesh(new THREE.CylinderGeometry(2.35, 2.7, 0.28, 48), stageMaterial);
stage.position.y = -2.55;
stage.receiveShadow = true;
scene.add(stage);

const stageRing = new THREE.Mesh(
    new THREE.TorusGeometry(2.35, 0.035, 8, 72),
    new THREE.MeshBasicMaterial({ color: defaults.color })
);
stageRing.rotation.x = Math.PI / 2;
stageRing.position.y = -2.39;
scene.add(stageRing);

const starGroup = new THREE.Group();
const starGeometry = new THREE.BufferGeometry();
const starPositions = new Float32Array(900);
for (let i = 0; i < starPositions.length; i += 3) {
    const radius = 12 + Math.random() * 20;
    const angle = Math.random() * Math.PI * 2;
    starPositions[i] = Math.cos(angle) * radius;
    starPositions[i + 1] = Math.random() * 22 - 7;
    starPositions[i + 2] = Math.sin(angle) * radius;
}
starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
starGroup.add(new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xa5b4fc, size: 0.045, transparent: true, opacity: 0.75 })));
scene.add(starGroup);

const character = new THREE.Group();
const hatGroup = new THREE.Group();
const weaponGroup = new THREE.Group();
const skinMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc99, roughness: 0.65 });
const torsoMaterial = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.5 });
const pantsMaterial = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 });

function box(width, height, depth, material) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
    mesh.castShadow = true;
    return mesh;
}

const head = box(1, 1, 1, skinMaterial);
head.position.y = 1.85;
const torso = box(2, 2, 1, torsoMaterial);
torso.position.y = 0.35;

const faceCanvas = document.createElement("canvas");
faceCanvas.width = faceCanvas.height = 128;
const faceContext = faceCanvas.getContext("2d");
faceContext.fillStyle = "#111827";
faceContext.fillRect(29, 38, 14, 24);
faceContext.fillRect(85, 38, 14, 24);
faceContext.fillRect(43, 82, 42, 9);
faceContext.fillRect(38, 76, 6, 12);
faceContext.fillRect(85, 76, 6, 12);
const face = new THREE.Mesh(
    new THREE.PlaneGeometry(0.91, 0.91),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(faceCanvas), transparent: true })
);
face.position.set(0, 1.85, 0.506);

function makeLimb(x, y, material) {
    const pivot = new THREE.Group();
    pivot.position.set(x, y, 0);
    const limb = box(1, 2, 1, material);
    limb.position.y = -1;
    pivot.add(limb);
    return pivot;
}

const leftArm = makeLimb(-1.5, 1.35, torsoMaterial);
const rightArm = makeLimb(1.5, 1.35, torsoMaterial);
const leftLeg = makeLimb(-0.5, -0.65, pantsMaterial);
const rightLeg = makeLimb(0.5, -0.65, pantsMaterial);
weaponGroup.position.set(0, -1.65, 0.15);
rightArm.add(weaponGroup);
character.add(head, face, torso, leftArm, rightArm, leftLeg, rightLeg, hatGroup);
character.position.y = -0.02;
scene.add(character);

const auraGroup = new THREE.Group();
const petGroup = new THREE.Group();
scene.add(auraGroup, petGroup);
let particles = [];

function clearGroup(group) {
    while (group.children.length) {
        const child = group.children.pop();
        child.geometry?.dispose();
        if (Array.isArray(child.material)) child.material.forEach((material) => material.dispose());
        else child.material?.dispose();
    }
}

function createAura() {
    clearGroup(auraGroup);
    particles = [];
    const count = Number($("#count").value);
    const size = Number($("#size").value) * 0.026;
    const radius = Number($("#glow").value) * 0.055;
    const color = $("#color").value;
    const shape = $("#shape").value;
    const geometry = shape === "cube" ? new THREE.BoxGeometry(size, size, size)
        : shape === "sphere" ? new THREE.SphereGeometry(size * 0.55, 8, 8)
        : shape === "fire" ? new THREE.ConeGeometry(size * 0.36, size * 1.6, 5)
        : new THREE.OctahedronGeometry(size * 0.62, 0);
    const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.78, blending: THREE.AdditiveBlending });

    for (let i = 0; i < count; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        const angle = Math.random() * Math.PI * 2;
        const baseRadius = radius * (0.45 + Math.random() * 0.65);
        mesh.position.set(Math.cos(angle) * baseRadius, Math.random() * 4.8 - 2.25, Math.sin(angle) * baseRadius);
        particles.push({
            mesh, angle, radius: baseRadius, baseRadius,
            speed: 0.012 + Math.random() * 0.025,
            spin: (Math.random() - 0.5) * 0.06,
            seed: Math.random() * 20
        });
        auraGroup.add(mesh);
    }
    stageRing.material.color.set(color);
    rimLight.color.set(color);
}

function updateOutfit() {
    const type = $("#outfit").value;
    const color = $("#color").value;
    torsoMaterial.wireframe = false;
    [skinMaterial, torsoMaterial, pantsMaterial].forEach((material) => material.emissive.set(0x000000));
    if (type === "default") {
        skinMaterial.color.set(0xffcc99); torsoMaterial.color.set(0x2563eb); pantsMaterial.color.set(0x1e293b);
    } else if (type === "noob") {
        skinMaterial.color.set(0xffd21c); torsoMaterial.color.set(0x1677ff); pantsMaterial.color.set(0x16a34a);
    } else if (type === "knight") {
        skinMaterial.color.set(0xcbd5e1); torsoMaterial.color.set(0x4b5563); pantsMaterial.color.set(0x242b37);
        torsoMaterial.emissive.set(color).multiplyScalar(0.15);
    } else {
        skinMaterial.color.set(0x070912); torsoMaterial.color.set(0x070912); pantsMaterial.color.set(0x070912);
        skinMaterial.emissive.set(color).multiplyScalar(0.25);
        torsoMaterial.emissive.set(color).multiplyScalar(0.58);
        pantsMaterial.emissive.set(color).multiplyScalar(0.2);
        torsoMaterial.wireframe = true;
    }
}

function updateGear() {
    clearGroup(hatGroup);
    clearGroup(weaponGroup);
    const color = $("#color").value;
    const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.7 });

    if ($("#hat").value === "wizardHat") {
        const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 0.88, 0.08, 18), darkMaterial);
        const cone = new THREE.Mesh(new THREE.ConeGeometry(0.54, 1.2, 18), darkMaterial);
        brim.position.y = 2.43; cone.position.y = 3.02; cone.rotation.z = -0.1;
        hatGroup.add(brim, cone);
    } else if ($("#hat").value === "horns") {
        const hornMaterial = new THREE.MeshBasicMaterial({ color });
        [-0.42, 0.42].forEach((x) => {
            const horn = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.7, 8), hornMaterial);
            horn.position.set(x, 2.55, 0);
            horn.rotation.z = x < 0 ? 0.38 : -0.38;
            hatGroup.add(horn);
        });
    }

    const weapon = $("#weapon").value;
    if (weapon === "none") return;
    const metal = new THREE.MeshStandardMaterial({ color: 0x9ca3af, metalness: 0.75, roughness: 0.25 });
    if (weapon === "staff") {
        const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 2.5), new THREE.MeshStandardMaterial({ color: 0x4a250d }));
        const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.24), new THREE.MeshBasicMaterial({ color }));
        crystal.position.y = 1.42; shaft.add(crystal); weaponGroup.add(shaft);
    } else if (weapon === "lightsaber") {
        const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.55), metal);
        const blade = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 2.1), new THREE.MeshBasicMaterial({ color }));
        blade.position.y = 1.25; weaponGroup.add(handle, blade);
    } else {
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.28, 2, 0.07), metal);
        const guard = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.12, 0.12), new THREE.MeshStandardMaterial({ color: 0xf59e0b }));
        blade.position.y = 1.15; guard.position.y = 0.18; weaponGroup.add(blade, guard);
    }
    weaponGroup.rotation.x = -0.25;
}

function updatePet() {
    clearGroup(petGroup);
    const type = $("#pet").value;
    const color = $("#color").value;
    if (type === "none") return;
    const material = new THREE.MeshBasicMaterial({ color, wireframe: type === "wisp" });
    const pet = new THREE.Mesh(type === "cubeSp" ? new THREE.BoxGeometry(0.52, 0.52, 0.52) : new THREE.OctahedronGeometry(0.34), material);
    if (type === "cubeSp") {
        [-0.18, 0.18].forEach((x) => {
            const ear = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.25, 4), material);
            ear.position.set(x, 0.36, 0); pet.add(ear);
        });
    }
    petGroup.add(pet);
}

function updateBiome() {
    const biome = $("#biome").value;
    starGroup.visible = biome === "space";
    gridHelper.visible = biome !== "dark";
    if (biome === "space") {
        scene.background = new THREE.Color(0x020617);
        scene.fog.color.set(0x020617);
        gridHelper.material.color.set(0x292454);
        stageMaterial.color.set(0x171c2c);
    } else if (biome === "neon") {
        scene.background = new THREE.Color(0x041015);
        scene.fog.color.set(0x041015);
        gridHelper.material.color.set(0x00bfa5);
        stageMaterial.color.set(0x10282b);
    } else {
        scene.background = new THREE.Color(0x020204);
        scene.fog.color.set(0x020204);
        stageMaterial.color.set(0x111116);
    }
}

function updateWorld() {
    const light = Number($("#lightPower").value);
    ambientLight.intensity = 0.25 + light * 0.055;
    keyLight.intensity = 0.35 + light * 0.11;
    rimLight.intensity = 0.4 + light * 0.16;
    const targetZoom = Number($("#cameraZoom").value);
    if (Math.abs(camera.position.z) > 0.5) camera.position.setLength(targetZoom);
}

function updatePower() {
    const config = readConfig();
    const power = Math.min(100, Math.round(config.count / 10 + config.speed * 3 + config.glow * 0.75 + (config.fxMode === "chaos" ? 8 : 0)));
    const ranks = power >= 90 ? ["MYTHIC", "МИФИЧЕСКАЯ АУРА"] :
        power >= 72 ? ["LEGENDARY", "ЛЕГЕНДАРНАЯ АУРА"] :
        power >= 50 ? ["EPIC", "ЭПИЧЕСКАЯ АУРА"] :
        power >= 30 ? ["RARE", "РЕДКАЯ АУРА"] : ["COMMON", "ОБЫЧНАЯ АУРА"];
    $("#powerValue").textContent = power;
    $("#powerRing").style.setProperty("--power", `${power}%`);
    $("#rankBadge").textContent = ranks[0];
    $("#powerLabel").textContent = ranks[1];
}

function rebuildAll() {
    updateOutfit();
    updateGear();
    updatePet();
    updateBiome();
    updateWorld();
    createAura();
    updatePower();
}

function resetCamera() {
    camera.position.set(0, 1.15, Number($("#cameraZoom").value));
    controls.target.set(0, 0.2, 0);
    controls.update();
}

function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function randomize(all = true) {
    const config = all ? {
        auraName: randomChoice(funnyNames),
        color: `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`,
        count: 100 + Math.floor(Math.random() * 420),
        speed: 1 + Math.floor(Math.random() * 10),
        size: 2 + Math.floor(Math.random() * 12),
        glow: 12 + Math.floor(Math.random() * 37),
        ...Object.fromEntries(Object.entries(randomOptions).map(([key, values]) => [key, randomChoice(values)])),
        cameraZoom: defaults.cameraZoom,
        lightPower: 5 + Math.floor(Math.random() * 7),
        spell: $("#spell").value
    } : {
        ...readConfig(),
        outfit: randomChoice(randomOptions.outfit),
        hat: randomChoice(randomOptions.hat),
        weapon: randomChoice(randomOptions.weapon),
        pose: randomChoice(randomOptions.pose),
        pet: randomChoice(randomOptions.pet)
    };
    applyConfig(config);
    scheduleSave();
    showToast(all ? "Выпала новая безумная комбинация" : "Новый герой готов");
}

function mutate() {
    const config = readConfig();
    config.auraName = randomChoice(funnyNames);
    config.count = Math.max(20, Math.min(600, config.count + Math.floor(Math.random() * 121) - 60));
    config.speed = Math.max(1, Math.min(10, config.speed + Math.floor(Math.random() * 5) - 2));
    config.glow = Math.max(10, Math.min(50, config.glow + Math.floor(Math.random() * 15) - 7));
    config.fxMode = randomChoice(randomOptions.fxMode);
    config.shape = randomChoice(randomOptions.shape);
    applyConfig(config);
    scheduleSave();
    showToast("Аура мутировала 🧬");
}

function activateUltimate() {
    if (ultimateActive) return;
    ultimateActive = true;
    const text = $("#spell").value.trim() || "СИЛА АУРЫ — ПРОБУДИСЬ!";
    $("#speech").textContent = text;
    $("#speech").style.display = "block";
    $("#sceneFrame").classList.add("ultimate");
    $("#shockwave").classList.remove("active");
    void $("#shockwave").offsetWidth;
    $("#shockwave").classList.add("active");

    try {
        const audio = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();
        oscillator.connect(gain); gain.connect(audio.destination);
        oscillator.type = "sawtooth";
        oscillator.frequency.setValueAtTime(110, audio.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(950, audio.currentTime + 0.65);
        gain.gain.setValueAtTime(0.12, audio.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.7);
        oscillator.start(); oscillator.stop(audio.currentTime + 0.7);
    } catch (_) {}

    setTimeout(() => {
        $("#speech").style.display = "none";
        $("#sceneFrame").classList.remove("ultimate");
        ultimateActive = false;
    }, 2600);
}

async function copyShareCode() {
    const json = JSON.stringify(readConfig());
    const code = btoa(unescape(encodeURIComponent(json)));
    const url = `${location.origin}${location.pathname}#aura=${code}`;
    try {
        await navigator.clipboard.writeText(url);
        showToast("Ссылка на ауру скопирована");
    } catch (_) {
        window.prompt("Скопируй ссылку на ауру:", url);
    }
}

function downloadPhoto() {
    renderer.render(scene, camera);
    const link = document.createElement("a");
    link.download = `${$("#auraName").value.trim() || "aura-lab"}.png`;
    link.href = renderer.domElement.toDataURL("image/png");
    link.click();
    showToast("Снимок ауры сохранён");
}

function loadInitialConfig() {
    const hash = location.hash.match(/aura=([^&]+)/)?.[1];
    if (hash) {
        try {
            applyConfig(JSON.parse(decodeURIComponent(escape(atob(hash)))), true);
            return;
        } catch (_) {
            showToast("Не удалось прочитать код ауры");
        }
    }
    try {
        const saved = JSON.parse(localStorage.getItem("aura-lab-config"));
        applyConfig(saved ? { ...defaults, ...saved } : defaults);
    } catch (_) {
        applyConfig(defaults);
    }
}

// UI EVENTS
$$(".tab").forEach((tab) => tab.addEventListener("click", () => {
    $$(".tab").forEach((item) => item.classList.toggle("active", item === tab));
    $$(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === tab.dataset.tab));
}));

$$(".preset").forEach((button) => button.addEventListener("click", () => {
    $$(".preset").forEach((item) => item.classList.toggle("active", item === button));
    applyConfig({ ...readConfig(), ...presets[button.dataset.preset] });
    scheduleSave();
}));

$$(".swatches button").forEach((button) => button.addEventListener("click", () => {
    $("#color").value = button.dataset.color;
    syncInterface(); rebuildAll(); scheduleSave();
}));

$$(".biome-card").forEach((card) => card.addEventListener("click", () => {
    $("#biome").value = card.dataset.biome;
    syncInterface(); updateBiome(); scheduleSave();
}));

$$(".spell-chips button").forEach((button) => button.addEventListener("click", () => {
    $("#spell").value = button.textContent;
    scheduleSave();
}));

$$("input, select, textarea").forEach((element) => element.addEventListener("input", () => {
    syncInterface();
    if (["count", "size", "glow", "shape", "color"].includes(element.id)) createAura();
    if (["outfit", "color"].includes(element.id)) updateOutfit();
    if (["hat", "weapon", "color"].includes(element.id)) updateGear();
    if (["pet", "color"].includes(element.id)) updatePet();
    if (element.id === "biome") updateBiome();
    if (["cameraZoom", "lightPower"].includes(element.id)) updateWorld();
    updatePower();
    scheduleSave();
}));

$("#randomBtn").addEventListener("click", () => randomize(true));
$("#randomHeroBtn").addEventListener("click", () => randomize(false));
$("#mutateBtn").addEventListener("click", mutate);
$("#speakBtn").addEventListener("click", activateUltimate);
$("#ultimateMobile").addEventListener("click", activateUltimate);
$("#saveBtn").addEventListener("click", () => {
    localStorage.setItem("aura-lab-config", JSON.stringify(readConfig()));
    showToast("Аура сохранена в этом браузере");
});
$("#shareBtn").addEventListener("click", copyShareCode);
$("#photoBtn").addEventListener("click", downloadPhoto);
$("#resetBtn").addEventListener("click", () => {
    applyConfig(defaults);
    localStorage.removeItem("aura-lab-config");
    showToast("Настройки сброшены");
});
$("#resetCameraBtn").addEventListener("click", resetCamera);
$("#sceneResetBtn").addEventListener("click", resetCamera);
$("#fullscreenBtn").addEventListener("click", () => {
    if (!document.fullscreenElement) $("#sceneFrame").requestFullscreen?.();
    else document.exitFullscreen?.();
});

window.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
        event.preventDefault();
        activateUltimate();
    }
});

function resizeRenderer() {
    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
}
window.addEventListener("resize", resizeRenderer);

const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();
    const speed = Number($("#speed").value) * 0.2;
    const direction = $("#direction").value;
    const mode = $("#fxMode").value;
    const pose = $("#pose").value;
    const maxRadius = Number($("#glow").value) * 0.055;

    character.position.y = -0.02;
    character.rotation.set(0, 0, 0);
    leftArm.rotation.set(0, 0, 0); rightArm.rotation.set(0, 0, 0);
    leftLeg.rotation.set(0, 0, 0); rightLeg.rotation.set(0, 0, 0);

    if (pose === "wizard") {
        character.rotation.y = Math.sin(time * 0.55) * 0.18;
        leftArm.rotation.x = 0.45; rightArm.rotation.set(-0.2, 0, 0.3);
    } else if (pose === "float") {
        character.position.y = 0.35 + Math.sin(time * 2) * 0.14;
        character.rotation.y = time * 0.22;
        leftArm.rotation.z = -0.42; rightArm.rotation.z = 0.42;
    } else if (pose === "combat") {
        character.rotation.y = -0.38;
        rightArm.rotation.x = 1.25; leftArm.rotation.z = -0.25;
        leftLeg.rotation.x = 0.28; rightLeg.rotation.x = -0.28;
    } else {
        character.position.y = 0.65;
        character.rotation.z = Math.PI;
        character.rotation.y = time * 3.5 * (speed + 0.25);
        leftArm.rotation.z = -0.8; rightArm.rotation.z = 0.8;
        leftLeg.rotation.x = Math.sin(time * 9) * 0.4;
        rightLeg.rotation.x = -leftLeg.rotation.x;
    }

    const breath = Math.sin(time * 2) * 0.018;
    head.position.y = 1.85 + breath;
    face.position.y = 1.85 + breath;
    hatGroup.position.y = breath;

    if (petGroup.children[0]) {
        petGroup.children[0].position.set(
            Math.cos(time * 1.45) * (maxRadius + 0.75),
            0.55 + Math.sin(time * 3) * 0.2,
            Math.sin(time * 1.45) * (maxRadius + 0.75)
        );
        petGroup.children[0].rotation.y = -time * 1.5;
    }

    particles.forEach((particle) => {
        particle.angle += speed * 0.024;
        if (direction === "up") {
            particle.mesh.position.y += particle.speed * (speed + 0.5);
            if (particle.mesh.position.y > 2.55) particle.mesh.position.y = -2.25;
        } else if (direction === "down") {
            particle.mesh.position.y -= particle.speed * (speed + 0.5);
            if (particle.mesh.position.y < -2.25) particle.mesh.position.y = 2.55;
        } else {
            particle.radius -= particle.speed * (speed * 0.3 + 0.18);
            if (particle.radius < 0.35) particle.radius = maxRadius * (0.5 + Math.random() * 0.6);
        }
        const pulse = mode === "pulse" ? 0.8 + Math.sin(time * 4 + particle.seed) * 0.25 : 1;
        const radius = (direction === "inward" ? particle.radius : particle.baseRadius) * pulse;
        particle.mesh.position.x = Math.cos(particle.angle) * radius;
        particle.mesh.position.z = Math.sin(particle.angle) * radius;
        const chaos = mode === "chaos" ? 0.45 + Math.abs(Math.sin(time * 8 + particle.seed)) : 1;
        const ultimateScale = ultimateActive ? 1.7 + Math.sin(time * 18) * 0.3 : 1;
        particle.mesh.scale.setScalar(chaos * ultimateScale);
        particle.mesh.rotation.x += particle.spin;
        particle.mesh.rotation.y += particle.spin;
    });

    stageRing.rotation.z = time * 0.08;
    starGroup.rotation.y = time * 0.006;
    controls.update();
    renderer.render(scene, camera);
}

loadInitialConfig();
resizeRenderer();
resetCamera();
animate();
