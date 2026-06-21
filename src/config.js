export const defaults = {
    auraName: "Фиолетовый импульс",
    auraType: "orbit",
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
    cameraZoom: 10,
    lightPower: 7,
    magicType: "shockwave",
    spell: ""
};

export const presets = {
    void: {
        auraName: "Король Бездны", auraType: "rings", color: "#8b5cf6", count: 280,
        speed: 4, size: 5, glow: 28, shape: "star", direction: "inward", fxMode: "pulse",
        outfit: "void", hat: "horns", weapon: "staff", pose: "float", pet: "wisp", biome: "space"
    },
    admin: {
        auraName: "ADMIN OVERDRIVE", auraType: "storm", color: "#ff3b30", count: 420,
        speed: 8, size: 4, glow: 32, shape: "cube", direction: "up", fxMode: "chaos",
        outfit: "noob", hat: "none", weapon: "lightsaber", pose: "combat", pet: "cubeSp", biome: "neon"
    },
    galaxy: {
        auraName: "Галактический Noob", auraType: "halo", color: "#22d3ee", count: 340,
        speed: 3, size: 7, glow: 38, shape: "sphere", direction: "up", fxMode: "pulse",
        outfit: "noob", hat: "wizardHat", weapon: "staff", pose: "float", pet: "wisp", biome: "space"
    },
    toxic: {
        auraName: "Токсичный вайб", auraType: "orbit", color: "#84cc16", count: 360,
        speed: 6, size: 6, glow: 24, shape: "fire", direction: "down", fxMode: "chaos",
        outfit: "knight", hat: "horns", weapon: "sword", pose: "ninja", pet: "cubeSp", biome: "dark"
    },
    solar: {
        auraName: "Солнечный титан", auraType: "rings", color: "#f59e0b", count: 310,
        speed: 5, size: 8, glow: 34, shape: "fire", direction: "up", fxMode: "pulse",
        outfit: "knight", hat: "none", weapon: "sword", pose: "hero", pet: "none", biome: "space"
    },
    frost: {
        auraName: "Ледяное спокойствие", auraType: "halo", color: "#bfdbfe", count: 240,
        speed: 2, size: 5, glow: 40, shape: "star", direction: "down", fxMode: "smooth",
        outfit: "default", hat: "wizardHat", weapon: "staff", pose: "meditate", pet: "wisp", biome: "dark"
    }
};

export const randomOptions = {
    auraType: ["orbit", "rings", "storm", "halo"],
    shape: ["cube", "sphere", "fire", "star"],
    direction: ["up", "down", "inward"],
    fxMode: ["smooth", "pulse", "chaos"],
    outfit: ["default", "noob", "knight", "void"],
    hat: ["none", "wizardHat", "horns"],
    weapon: ["none", "staff", "lightsaber", "sword"],
    pose: ["wizard", "float", "combat", "hero", "ninja", "victory", "meditate", "dance"],
    pet: ["none", "cubeSp", "wisp"],
    biome: ["space", "neon", "dark"],
    magicType: ["shockwave", "lightning", "portal", "meteor"]
};

export const funnyNames = [
    "Налоговый некромант", "Аура последней пятницы", "Повелитель пельменей",
    "Квантовый Noob", "Сигма Бездны", "Неоновый картофель", "Админ на минималках"
];

export const controlIds = Object.keys(defaults);
