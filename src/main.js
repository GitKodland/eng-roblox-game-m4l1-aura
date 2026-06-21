import { createAuraScene } from "./scene.js";
import { createUI } from "./ui.js";
import { createI18n } from "./i18n.js";

if (!window.THREE?.OrbitControls) {
    document.body.innerHTML = "<p class='fatal-error'>Не удалось загрузить 3D-движок. Проверьте подключение к интернету и обновите страницу.</p>";
} else {
    const i18n = createI18n();
    i18n.apply();
    const auraScene = createAuraScene(document.getElementById("canvas3d"));
    createUI(auraScene, i18n);
}
