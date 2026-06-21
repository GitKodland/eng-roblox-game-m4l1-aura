import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { controlIds, defaults, presets, randomOptions } from "../src/config.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

test("entry point uses ES modules and required local files exist", () => {
    const html = read("index.html");
    assert.match(html, /<script type="module" src="src\/main\.js"><\/script>/);
    ["src/main.js", "src/ui.js", "src/scene.js", "src/config.js", "src/store.js", "style.css"]
        .forEach((file) => assert.equal(fs.existsSync(path.join(root, file)), true, `${file} is missing`));
});

test("HTML ids are unique and JavaScript selectors resolve", () => {
    const html = read("index.html");
    const ids = [...html.matchAll(/id="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length);

    const source = ["src/main.js", "src/ui.js", "src/scene.js"].map(read).join("\n");
    const selectors = [...source.matchAll(/\$\("#([^")]+)"\)/g)].map((match) => match[1]);
    selectors.forEach((id) => assert.ok(ids.includes(id), `Missing element #${id}`));
});

test("configuration fields have matching controls", () => {
    const html = read("index.html");
    controlIds.forEach((id) => assert.match(html, new RegExp(`id="${id}"`), `Missing control ${id}`));
    assert.equal(defaults.cameraZoom, 10);
    assert.ok(Object.keys(presets).length >= 6);
    assert.ok(randomOptions.pose.length >= 8);
    assert.ok(randomOptions.magicType.length >= 4);
});

test("legacy share action and monolithic script are removed", () => {
    const html = read("index.html");
    assert.doesNotMatch(html, /shareBtn|Скопировать код|script\.js/);
    assert.equal(fs.existsSync(path.join(root, "script.js")), false);
});

test("weapon grip, camera distance and fast magic cooldown are guarded", () => {
    const scene = read("src/scene.js");
    const ui = read("src/ui.js");
    assert.match(scene, /handAnchor\.position\.set\(0, -1\.82, 0\)/);
    assert.match(scene, /rightArm\.add\(handAnchor\)/);
    assert.match(scene, /camera\.position\.set\(0, 1\.3, 10\)/);
    assert.match(ui, /now - lastCastAt < 500/);
});
