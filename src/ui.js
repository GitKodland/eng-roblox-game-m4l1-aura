import { defaults, funnyNames, presets, randomOptions } from "./config.js";
import { applyConfig, clearConfig, loadConfig, readConfig, saveConfig } from "./store.js";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const randomChoice = (values) => values[Math.floor(Math.random() * values.length)];

export function createUI(auraScene, i18n) {
    let toastTimer;
    let saveTimer;
    let speechTimer;
    let lastCastAt = 0;

    function showToast(message) {
        const toast = $("#toast");
        toast.textContent = message;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
    }

    function setAccent(hex) {
        const value = hex.replace("#", "");
        const rgb = [0, 2, 4].map((offset) => parseInt(value.slice(offset, offset + 2), 16));
        document.documentElement.style.setProperty("--accent", hex);
        document.documentElement.style.setProperty("--accent-rgb", rgb.join(","));
    }

    function syncInterface() {
        ["count", "speed", "size", "glow", "cameraZoom", "lightPower"].forEach((id) => {
            const input = document.getElementById(id);
            const output = document.getElementById(`${id}Value`);
            if (output) output.textContent = input.value;
            const fill = ((input.value - input.min) / (input.max - input.min)) * 100;
            input.style.setProperty("--fill", `${fill}%`);
        });
        $("#colorValue").textContent = $("#color").value.toUpperCase();
        setAccent($("#color").value);
        $$(".biome-card").forEach((card) => card.classList.toggle("active", card.dataset.biome === $("#biome").value));
        $$(".magic-card").forEach((card) => card.classList.toggle("active", card.dataset.magic === $("#magicType").value));
        updatePower();
    }

    function updatePower() {
        const config = readConfig();
        const power = Math.min(100, Math.round(config.count / 10 + config.speed * 3 + config.glow * 0.75 + (config.fxMode === "chaos" ? 8 : 0)));
        const rankIndex = power >= 90 ? 4 : power >= 72 ? 3 : power >= 50 ? 2 : power >= 30 ? 1 : 0;
        const rankCodes = ["COMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC"];
        $("#powerValue").textContent = power;
        $("#powerRing").style.setProperty("--power", `${power}%`);
        $("#rankBadge").textContent = rankCodes[rankIndex];
        $("#powerLabel").textContent = i18n.t.ranks[rankIndex];
    }

    function persistSoon() {
        clearTimeout(saveTimer);
        $("#saveStatus").textContent = i18n.t.messages.saving;
        saveTimer = setTimeout(() => {
            saveConfig(readConfig());
            $("#saveStatus").textContent = i18n.t.messages.saved;
        }, 250);
    }

    function setConfig(config, notify = "") {
        applyConfig(config);
        syncInterface();
        auraScene.sync(readConfig(), "all");
        if (notify) showToast(notify);
    }

    function randomize(heroOnly = false) {
        const current = readConfig();
        const config = heroOnly ? {
            ...current,
            outfit: randomChoice(randomOptions.outfit),
            hat: randomChoice(randomOptions.hat),
            weapon: randomChoice(randomOptions.weapon),
            pose: randomChoice(randomOptions.pose),
            pet: randomChoice(randomOptions.pet)
        } : {
            ...current,
            auraName: randomChoice(funnyNames),
            color: `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`,
            count: 100 + Math.floor(Math.random() * 420),
            speed: 1 + Math.floor(Math.random() * 10),
            size: 2 + Math.floor(Math.random() * 12),
            glow: 12 + Math.floor(Math.random() * 37),
            ...Object.fromEntries(Object.entries(randomOptions).map(([key, values]) => [key, randomChoice(values)]))
        };
        setConfig(config, heroOnly ? i18n.t.messages.heroReady : i18n.t.messages.comboReady);
        persistSoon();
    }

    function mutate() {
        const config = readConfig();
        config.auraName = randomChoice(funnyNames);
        config.count = Math.max(20, Math.min(600, config.count + Math.floor(Math.random() * 121) - 60));
        config.speed = Math.max(1, Math.min(10, config.speed + Math.floor(Math.random() * 5) - 2));
        config.glow = Math.max(10, Math.min(50, config.glow + Math.floor(Math.random() * 15) - 7));
        config.auraType = randomChoice(randomOptions.auraType);
        config.fxMode = randomChoice(randomOptions.fxMode);
        config.shape = randomChoice(randomOptions.shape);
        setConfig(config, i18n.t.messages.mutated);
        persistSoon();
    }

    function castMagic() {
        const now = performance.now();
        if (now - lastCastAt < 500) return;
        lastCastAt = now;
        const config = readConfig();
        const speech = $("#speech");
        speech.textContent = config.spell.trim() || i18n.t.messages.spell;
        speech.style.display = "block";
        $("#sceneFrame").classList.remove("ultimate");
        void $("#sceneFrame").offsetWidth;
        $("#sceneFrame").classList.add("ultimate");
        auraScene.castMagic(config.magicType);
        playMagicSound(config.magicType);
        clearTimeout(speechTimer);
        speechTimer = setTimeout(() => { speech.style.display = "none"; }, 1400);
    }

    function playMagicSound(kind) {
        try {
            const audio = new (window.AudioContext || window.webkitAudioContext)();
            const sounds = {
                shockwave: { type: "sine", start: 95, end: 420, duration: 0.7 },
                lightning: { type: "sawtooth", start: 920, end: 120, duration: 0.55 },
                portal: { type: "sine", start: 160, end: 680, duration: 0.9 },
                meteor: { type: "triangle", start: 75, end: 42, duration: 1.05 }
            };
            const sound = sounds[kind] || sounds.shockwave;
            [1, 1.015].forEach((detune, index) => {
                const oscillator = audio.createOscillator();
                const gain = audio.createGain();
                oscillator.connect(gain); gain.connect(audio.destination);
                oscillator.type = sound.type;
                oscillator.frequency.setValueAtTime(sound.start * detune, audio.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(sound.end * detune, audio.currentTime + sound.duration);
                gain.gain.setValueAtTime(index ? 0.018 : 0.035, audio.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + sound.duration);
                oscillator.start(audio.currentTime + index * 0.04);
                oscillator.stop(audio.currentTime + sound.duration);
            });
        } catch {}
    }

    function bindEvents() {
        $$(".tab").forEach((tab) => tab.addEventListener("click", () => {
            $$(".tab").forEach((item) => item.classList.toggle("active", item === tab));
            $$(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === tab.dataset.tab));
        }));
        $$(".preset").forEach((button) => button.addEventListener("click", () => {
            $$(".preset").forEach((item) => item.classList.toggle("active", item === button));
            setConfig({ ...readConfig(), ...presets[button.dataset.preset] });
            persistSoon();
        }));
        $$(".swatches button").forEach((button) => button.addEventListener("click", () => {
            $("#color").value = button.dataset.color;
            syncInterface(); auraScene.sync(readConfig(), "color"); persistSoon();
        }));
        $$(".biome-card").forEach((card) => card.addEventListener("click", () => {
            $("#biome").value = card.dataset.biome;
            syncInterface(); auraScene.sync(readConfig(), "biome"); persistSoon();
        }));
        $$(".magic-card").forEach((card) => card.addEventListener("click", () => {
            $("#magicType").value = card.dataset.magic;
            syncInterface(); persistSoon();
        }));
        $$(".spell-chips button").forEach((button) => button.addEventListener("click", () => {
            $("#spell").value = button.textContent;
            persistSoon();
        }));
        $$("input, select").forEach((element) => element.addEventListener("input", () => {
            syncInterface();
            auraScene.sync(readConfig(), element.id);
            persistSoon();
        }));

        $("#randomBtn").addEventListener("click", () => randomize(false));
        $("#randomHeroBtn").addEventListener("click", () => randomize(true));
        $("#mutateBtn").addEventListener("click", mutate);
        $("#speakBtn").addEventListener("click", castMagic);
        $("#ultimateMobile").addEventListener("click", castMagic);
        $("#saveBtn").addEventListener("click", () => {
            saveConfig(readConfig());
            showToast(i18n.t.messages.auraSaved);
        });
        $("#photoBtn").addEventListener("click", () => {
            auraScene.downloadImage($("#auraName").value.trim());
            showToast(i18n.t.messages.photoSaved);
        });
        $("#resetBtn").addEventListener("click", () => {
            clearConfig();
            setConfig(defaults, i18n.t.messages.reset);
            auraScene.resetCamera();
        });
        $("#resetCameraBtn").addEventListener("click", auraScene.resetCamera);
        $("#sceneResetBtn").addEventListener("click", auraScene.resetCamera);
        $("#fullscreenBtn").addEventListener("click", () => {
            if (!document.fullscreenElement) $("#sceneFrame").requestFullscreen?.();
            else document.exitFullscreen?.();
        });
        window.addEventListener("keydown", (event) => {
            if (event.code === "Space" && !["INPUT", "SELECT"].includes(document.activeElement.tagName)) {
                event.preventDefault();
                castMagic();
            }
        });
        window.addEventListener("aura:languagechange", () => {
            syncInterface();
            $("#saveStatus").textContent = i18n.t.messages.saved;
        });
    }

    applyConfig(loadConfig());
    syncInterface();
    auraScene.sync(readConfig(), "all");
    auraScene.resetCamera();
    bindEvents();
}
