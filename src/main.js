import { createAuraScene } from "./scene.js";
import { createUI } from "./ui.js";

if (!window.THREE?.OrbitControls) {
    document.body.innerHTML = "<p class='fatal-error'>Не удалось загрузить 3D-движок. Проверьте подключение к интернету и обновите страницу.</p>";
} else {
    const auraScene = createAuraScene(document.getElementById("canvas3d"));
    createUI(auraScene);
}
