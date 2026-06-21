import { controlIds, defaults } from "./config.js";

const STORAGE_KEY = "aura-lab-config-v2";

export function readConfig() {
    return Object.fromEntries(controlIds.map((id) => {
        const element = document.getElementById(id);
        return [id, element?.type === "range" ? Number(element.value) : element?.value];
    }));
}

export function applyConfig(config) {
    controlIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element && config[id] !== undefined) element.value = config[id];
    });
}

export function saveConfig(config) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function loadConfig() {
    try {
        return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
    } catch {
        return defaults;
    }
}

export function clearConfig() {
    localStorage.removeItem(STORAGE_KEY);
}
