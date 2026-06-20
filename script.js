// --- НАСТРОЙКА THREE.JS СЦЕНЫ ---
const container = document.getElementById("canvas3d");
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 1.5, 8); // Немного опустили камеру, чтобы лучше видеть ноги

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxPolarAngle = Math.PI / 2 + 0.05; 
controls.minDistance = 3;
controls.maxDistance = 15;

// Освещение
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x222222, 0.3);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

// Сетка координат
const gridHelper = new THREE.GridHelper(20, 20, 0x4f46e5, 0x222222);
gridHelper.position.y = -2.66;
scene.add(gridHelper);

// --- СОЗДАНИЕ РОБЛОКС ПЕРСОНАЖА ---
const robloxCharacter = new THREE.Group();
const hatGroup = new THREE.Group(); 
const weaponGroup = new THREE.Group(); 
robloxCharacter.add(hatGroup);

const skinMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc99, roughness: 0.7 });
const torsoMaterial = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.5 }); 
const pantsMaterial = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 }); 

// 1. Голова и Лицо
const head = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), skinMaterial);
head.position.y = 1.9;
robloxCharacter.add(head);

const faceCanvas = document.createElement('canvas'); faceCanvas.width = 128; faceCanvas.height = 128;
const fCtx = faceCanvas.getContext('2d'); fCtx.fillStyle = '#000000';
fCtx.fillRect(30, 40, 15, 25); fCtx.fillRect(83, 40, 15, 25);
fCtx.fillRect(44, 85, 40, 10); fCtx.fillRect(39, 80, 5, 10); fCtx.fillRect(84, 80, 5, 10);

const faceTexture = new THREE.CanvasTexture(faceCanvas);
const faceMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 0.95), new THREE.MeshStandardMaterial({ map: faceTexture, roughness: 0.7, transparent: true }));
faceMesh.position.set(0, 1.9, 0.51); 
robloxCharacter.add(faceMesh);

// 2. Торс
const torso = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 1), torsoMaterial);
torso.position.y = 0.4;
robloxCharacter.add(torso);

// 3. Руки (с точками вращения в плечах)
const leftArmPivot = new THREE.Group(); leftArmPivot.position.set(-1.5, 1.4, 0);
const leftArmMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), torsoMaterial); leftArmMesh.position.y = -1;
leftArmPivot.add(leftArmMesh); robloxCharacter.add(leftArmPivot);

const rightArmPivot = new THREE.Group(); rightArmPivot.position.set(1.5, 1.4, 0);
const rightArmMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), torsoMaterial); rightArmMesh.position.y = -1;
rightArmPivot.add(rightArmMesh); weaponGroup.position.set(0, -1.8, 0.2); rightArmPivot.add(weaponGroup);
robloxCharacter.add(rightArmPivot);

// 4. ИСПРАВЛЕННЫЕ НОГИ (С правильными точками вращения на поясе)
const leftLegPivot = new THREE.Group(); 
leftLegPivot.position.set(-0.5, -0.6, 0); // Пояс (стык с торсом)
const leftLegMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), pantsMaterial); 
leftLegMesh.position.y = -1; // Опускаем сам куб ноги на полную высоту вниз от пояса
leftLegPivot.add(leftLegMesh); 
robloxCharacter.add(leftLegPivot);

const rightLegPivot = new THREE.Group(); 
rightLegPivot.position.set(0.5, -0.6, 0); // Пояс (стык с торсом)
const rightLegMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), pantsMaterial); 
rightLegMesh.position.y = -1; // Опускаем сам куб ноги на полную высоту вниз от пояса
rightLegPivot.add(rightLegMesh); 
robloxCharacter.add(rightLegPivot);

// Центрируем всего персонажа, чтобы он идеально стоял на сцене
robloxCharacter.position.y = -0.05; 
scene.add(robloxCharacter);

// Серый подиум-платформа под ногами
const stage = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 3.0, 0.3, 32), new THREE.MeshStandardMaterial({ color: 0x2e3440, roughness: 0.7 }));
stage.position.y = -2.65; 
scene.add(stage);


// --- СИСТЕМА ПИТОМЦЕВ (PETS) ---
const petGroup = new THREE.Group();
scene.add(petGroup);

function updatePet() {
    while(petGroup.children.length > 0) { petGroup.remove(petGroup.children[0]); }
    const petType = document.getElementById("pet").value;
    const colorVal = document.getElementById("color").value;

    if (petType === "none") return;

    let petMesh;
    if (petType === "cubeSp") {
        petMesh = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 }));
        const ears = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.2, 0.1), new THREE.MeshStandardMaterial({ color: colorVal }));
        ears.position.set(-0.2, 0.3, 0);
        const ears2 = ears.clone(); ears2.position.x = 0.2;
        petMesh.add(ears, ears2);
    } else if (petType === "wisp") {
        petMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.3), new THREE.MeshBasicMaterial({ color: colorVal, wireframe: true }));
    }
    petGroup.add(petMesh);
}

// --- СМЕНА БИОМОВ (ФОНА) ---
function updateBiome() {
    const biome = document.getElementById("biome").value;
    if (biome === "space") {
        scene.background = new THREE.Color(0x020617);
        gridHelper.visible = true; gridHelper.material.color.setHex(0x1e1b4b);
    } else if (biome === "neon") {
        scene.background = new THREE.Color(0x090d16);
        gridHelper.visible = true; gridHelper.material.color.setHex(0x00ffcc);
    } else if (biome === "dark") {
        scene.background = new THREE.Color(0x050505);
        gridHelper.visible = false;
    }
}

// --- СИСТЕМА ОДЕДЖЫ, ШЛЯП И ОРУЖИЯ ---
function updateOutfit() {
    const outfit = document.getElementById("outfit").value;
    const globalColor = document.getElementById("color").value;
    if (outfit === "default") {
        skinMaterial.color.setHex(0xffcc99); skinMaterial.emissive.setHex(0x000000);
        torsoMaterial.color.setHex(0x2563eb); torsoMaterial.emissive.setHex(0x000000); torsoMaterial.wireframe = false;
        pantsMaterial.color.setHex(0x1e293b); pantsMaterial.emissive.setHex(0x000000);
    } else if (outfit === "noob") {
        skinMaterial.color.setHex(0xffd700); skinMaterial.emissive.setHex(0x000000);
        torsoMaterial.color.setHex(0x0055ff); torsoMaterial.emissive.setHex(0x000000); torsoMaterial.wireframe = false;
        pantsMaterial.color.setHex(0x00aa00); pantsMaterial.emissive.setHex(0x000000);
    } else if (outfit === "knight") {
        skinMaterial.color.setHex(0xd1d5db); skinMaterial.emissive.setHex(0x000000);
        torsoMaterial.color.setHex(0x4b5563); torsoMaterial.emissive.set(globalColor).multiplyScalar(0.2); torsoMaterial.wireframe = false;
        pantsMaterial.color.setHex(0x374151); pantsMaterial.emissive.setHex(0x000000);
    } else if (outfit === "void") {
        skinMaterial.color.setHex(0x030712); skinMaterial.emissive.set(globalColor).multiplyScalar(0.4);
        torsoMaterial.color.setHex(0x030712); torsoMaterial.emissive.set(globalColor).multiplyScalar(0.7); torsoMaterial.wireframe = true;
        pantsMaterial.color.setHex(0x030712); pantsMaterial.emissive.set(globalColor).multiplyScalar(0.4);
    }
}

function updateGear() {
    while(hatGroup.children.length > 0) { hatGroup.remove(hatGroup.children[0]); }
    const hatType = document.getElementById("hat").value;
    const colorVal = document.getElementById("color").value;

    if (hatType === "wizardHat") {
        const hatMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.8 });
        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.08, 16), hatMat); base.position.set(0, 2.45, 0);
        const cone = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.2, 16), hatMat); cone.position.set(0, 3.05, -0.05); cone.rotation.x = -0.1;
        hatGroup.add(base, cone);
    } else if (hatType === "horns") {
        const hornMat = new THREE.MeshBasicMaterial({ color: colorVal });
        const leftHorn = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.6, 8), hornMat); leftHorn.position.set(-0.4, 2.5, 0.1); leftHorn.rotation.set(0.2, 0, 0.4);
        const rightHorn = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.6, 8), hornMat); rightHorn.position.set(0.4, 2.5, 0.1); rightHorn.rotation.set(0.2, 0, -0.4);
        hatGroup.add(leftHorn, rightHorn);
    }

    while(weaponGroup.children.length > 0) { weaponGroup.remove(weaponGroup.children[0]); }
    const weaponType = document.getElementById("weapon").value;
    if (weaponType === "staff") {
        const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.4), new THREE.MeshStandardMaterial({ color: 0x451a03 })); shaft.position.y = 0.5; shaft.rotation.x = Math.PI / 2;
        const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.2), new THREE.MeshBasicMaterial({ color: colorVal })); crystal.position.set(0, 1.7, 0); shaft.add(crystal);
        weaponGroup.add(shaft);
    } else if (weaponType === "lightsaber") {
        const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.5), new THREE.MeshStandardMaterial({ color: 0x6b7280 })); handle.rotation.x = Math.PI / 2;
        const blade = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.2), new THREE.MeshBasicMaterial({ color: colorVal })); blade.position.set(0, 1.3, 0); blade.rotation.x = Math.PI / 2;
        weaponGroup.add(handle, blade);
    } else if (weaponType === "sword") {
        const hilt = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.5), new THREE.MeshStandardMaterial({ color: 0x374151 })); hilt.rotation.x = Math.PI / 2;
        const guard = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.1, 0.1), new THREE.MeshStandardMaterial({ color: 0xd97706 })); guard.position.y = 0.25; guard.rotation.x = Math.PI / 2;
        const steel = new THREE.Mesh(new THREE.BoxGeometry(0.25, 2.0, 0.04), new THREE.MeshStandardMaterial({ color: 0x9ca3af, metalness: 0.6 })); steel.position.set(0, 1.2, 0); steel.rotation.x = Math.PI / 2;
        weaponGroup.add(hilt, guard, steel);
    }
}

// --- СИСТЕМА ТРЕХМЕРНОЙ АУРЫ ---
let auraParticles = [];
const auraGroup = new THREE.Group();
scene.add(auraGroup);

function createAura() {
    while(auraGroup.children.length > 0){ auraGroup.remove(auraGroup.children[0]); }
    auraParticles = [];

    const count = +document.getElementById("count").value;
    const sizeVal = +document.getElementById("size").value * 0.03; 
    const colorVal = document.getElementById("color").value;
    const shape = document.getElementById("shape").value;
    const glowRadius = +document.getElementById("glow").value * 0.05;

    let particleGeo = shape === "cube" ? new THREE.BoxGeometry(sizeVal, sizeVal, sizeVal) :
                      shape === "sphere" ? new THREE.SphereGeometry(sizeVal / 2, 8, 8) :
                      shape === "fire" ? new THREE.ConeGeometry(sizeVal / 3, sizeVal * 1.5, 4) :
                      new THREE.OctahedronGeometry(sizeVal / 2, 0);

    const particleMat = new THREE.MeshBasicMaterial({ color: colorVal, transparent: true, opacity: 0.75 });

    for (let i = 0; i < count; i++) {
        const mesh = new THREE.Mesh(particleGeo, particleMat);
        const angle = Math.random() * Math.PI * 2;
        const radius = glowRadius * (0.5 + Math.random() * 0.7);
        const yPos = (Math.random() * 4.7) - 2.2; 

        mesh.position.set(Math.cos(angle) * radius, yPos, Math.sin(angle) * radius);
        
        auraParticles.push({
            mesh: mesh, angle: angle, baseRadius: radius, radius: radius, baseSize: sizeVal,
            speedY: 0.015 + Math.random() * 0.02, speedInward: 0.015 + Math.random() * 0.02,
            rotSpeed: (Math.random() - 0.5) * 0.05, seed: Math.random() * 100
        });
        auraGroup.add(mesh);
    }
}

// Навешивание триггеров обновлений на интерфейс
document.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("input", () => {
        updateOutfit(); updateGear(); updatePet(); updateBiome();
        if(el.id !== "pose" && el.id !== "outfit" && el.id !== "weapon" && el.id !== "pet" && el.id !== "biome") createAura();
        updatePower();
    });
});

function updatePower() {
    const count = +document.getElementById("count").value;
    const speed = +document.getElementById("speed").value;
    const glow = +document.getElementById("glow").value;
    document.getElementById("power").textContent = "Сила ауры: " + Math.min(100, Math.floor((count / 6 + speed * 5 + glow)));
}

// Рандомайзер
document.getElementById("randomBtn").onclick = () => {
    document.getElementById("color").value = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    document.getElementById("count").value = Math.floor(Math.random() * 400) + 50;
    document.getElementById("speed").value = Math.floor(Math.random() * 10) + 1;
    document.getElementById("size").value = Math.floor(Math.random() * 12) + 3;
    document.getElementById("glow").value = Math.floor(Math.random() * 40) + 10;
    document.getElementById("shape").value = ["cube", "sphere", "fire", "star"][Math.floor(Math.random() * 4)];
    document.getElementById("direction").value = ["up", "down", "inward"][Math.floor(Math.random() * 3)];
    document.getElementById("fxMode").value = ["smooth", "pulse", "chaos"][Math.floor(Math.random() * 3)];
    document.getElementById("outfit").value = ["default", "noob", "knight", "void"][Math.floor(Math.random() * 4)];
    document.getElementById("hat").value = ["none", "wizardHat", "horns"][Math.floor(Math.random() * 3)];
    document.getElementById("weapon").value = ["none", "staff", "lightsaber", "sword"][Math.floor(Math.random() * 4)];
    document.getElementById("pose").value = ["wizard", "float", "combat", "dance"][Math.floor(Math.random() * 4)];
    document.getElementById("pet").value = ["none", "cubeSp", "wisp"][Math.floor(Math.random() * 3)];

    updateOutfit(); updateGear(); updatePet(); updateBiome(); createAura(); updatePower();
};

// Ульта
document.getElementById("speakBtn").onclick = () => {
    const text = document.getElementById("spell").value.trim(); if (!text) return;
    const speech = document.getElementById("speech"); speech.innerText = text; speech.style.display = "block";

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.frequency.setValueAtTime(150, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 0.5);
    osc.type = "sawtooth"; gain.gain.setValueAtTime(0.2, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
    osc.start(); osc.stop(audioCtx.currentTime + 0.5);

    let jumpTime = 0;
    function jump() {
        jumpTime += 0.25; const jumpY = Math.sin(jumpTime) * 0.6;
        head.position.y = 1.9 + jumpY; faceMesh.position.y = 1.9 + jumpY; hatGroup.position.y = jumpY;
        if (jumpTime < Math.PI) requestAnimationFrame(jump);
        else { head.position.y = 1.9; faceMesh.position.y = 1.9; hatGroup.position.y = 0; }
    }
    jump();

    const oldGlow = document.getElementById("glow").value; document.getElementById("glow").value = 50; createAura();
    setTimeout(() => { document.getElementById("glow").value = oldGlow; createAura(); speech.style.display = "none"; }, 3000);
};

// --- ИГРОВОЙ ЦИКЛ АНИМАЦИИ ---
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();
    const globalSpeed = +document.getElementById("speed").value * 0.2;
    const pose = document.getElementById("pose").value;
    const dir = document.getElementById("direction").value;
    const fxMode = document.getElementById("fxMode").value;
    const maxRadius = +document.getElementById("glow").value * 0.05;

    // Сброс костей в дефолт
    robloxCharacter.position.y = -0.05; robloxCharacter.rotation.set(0, 0, 0);
    leftArmPivot.rotation.set(0, 0, 0); rightArmPivot.rotation.set(0, 0, 0);
    leftLegPivot.rotation.set(0, 0, 0); rightLegPivot.rotation.set(0, 0, 0);

    // --- АНИМАЦИЯ ПОЗ С УЧЕТОМ ОБНОВЛЕННЫХ СУСТАВОВ НОГ ---
    if (pose === "wizard") {
        robloxCharacter.rotation.y = Math.sin(elapsedTime * 0.5) * 0.2;
        leftArmPivot.rotation.x = 0.5 + Math.sin(elapsedTime * 1.5) * 0.05;
        rightArmPivot.rotation.x = -0.2; rightArmPivot.rotation.z = 0.3;
    } else if (pose === "float") {
        robloxCharacter.position.y = 0.4 + Math.sin(elapsedTime * 2) * 0.15;
        robloxCharacter.rotation.y = elapsedTime * 0.2;
        leftArmPivot.rotation.z = -0.4; rightArmPivot.rotation.z = 0.4;
        leftLegPivot.rotation.x = 0.2; rightLegPivot.rotation.x = -0.1;
    } else if (pose === "combat") {
        robloxCharacter.rotation.y = -0.4;
        rightArmPivot.rotation.x = 1.3; rightArmPivot.rotation.y = -0.3;
        leftArmPivot.rotation.x = 0.2; leftArmPivot.rotation.z = -0.2;
        leftLegPivot.rotation.x = 0.3; rightLegPivot.rotation.x = -0.3;
    } else if (pose === "dance") {
        robloxCharacter.position.y = 0.7; robloxCharacter.rotation.z = Math.PI; robloxCharacter.rotation.y = elapsedTime * 4 * (globalSpeed + 0.2);
        leftArmPivot.rotation.z = -0.8; rightArmPivot.rotation.z = 0.8;
        leftLegPivot.rotation.x = Math.sin(elapsedTime * 10) * 0.4; rightLegPivot.rotation.x = -Math.sin(elapsedTime * 10) * 0.4;
    }

    // Дыхание головы
    if(head.position.y === 1.9) {
        const breath = Math.sin(elapsedTime * 2) * 0.02;
        head.position.y = 1.9 + breath; faceMesh.position.y = 1.9 + breath; hatGroup.position.y = breath;
    }

    // Анимация полета питомца
    if (petGroup.children.length > 0) {
        const petOrbitRadius = maxRadius + 0.8;
        petGroup.children[0].position.set(
            Math.cos(elapsedTime * 1.5) * petOrbitRadius,
            Math.sin(elapsedTime * 3) * 0.2 + 0.5,
            Math.sin(elapsedTime * 1.5) * petOrbitRadius
        );
        petGroup.children[0].rotation.y = -elapsedTime * 1.5;
    }

    // FX режимы
    let pulseScale = fxMode === "pulse" ? 0.7 + Math.sin(elapsedTime * 4 * (globalSpeed + 0.5)) * 0.4 : 1.0;

    // --- АНИМАЦИЯ АУРЫ ---
    auraParticles.forEach((p) => {
        p.angle += globalSpeed * 0.025;

        if (dir === "up") {
            p.mesh.position.y += p.speedY * (globalSpeed + 0.5);
            if (p.mesh.position.y > 2.5) { p.mesh.position.y = -2.2; p.radius = p.baseRadius; }
        } else if (dir === "down") {
            p.mesh.position.y -= p.speedY * (globalSpeed + 0.5);
            if (p.mesh.position.y < -2.2) { p.mesh.position.y = 2.5; p.radius = p.baseRadius; }
        } else if (dir === "inward") {
            p.radius -= p.speedInward * (globalSpeed * 0.3 + 0.2);
            p.mesh.position.y += p.speedY * 0.15;
            if (p.radius < 0.4 || p.mesh.position.y > 2.5) {
                p.radius = maxRadius * (0.5 + Math.random() * 0.7); p.mesh.position.y = (Math.random() * 4.7) - 2.2;
            }
        }

        let currentRadius = dir === "inward" ? p.radius : p.baseRadius * pulseScale;

        if (fxMode === "chaos") {
            const chaosSize = p.baseSize * (0.3 + Math.abs(Math.sin(elapsedTime * 10 + p.seed)) * 1.2);
            p.mesh.scale.set(chaosSize/p.baseSize, chaosSize/p.baseSize, chaosSize/p.baseSize);
        } else {
            p.mesh.scale.set(1, 1, 1);
        }

        p.mesh.position.x = Math.cos(p.angle) * currentRadius;
        p.mesh.position.z = Math.sin(p.angle) * currentRadius;

        p.mesh.rotation.x += p.rotSpeed; p.mesh.rotation.y += p.rotSpeed;
    });

    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

// Запуск
updateOutfit(); updateGear(); updatePet(); updateBiome(); createAura(); updatePower(); animate();