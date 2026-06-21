import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { controlIds, defaults, presets, randomOptions } from "../src/config.js";
import { SUPPORTED, translations } from "../src/i18n.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

test("entry point uses ES modules and required local files exist", () => {
    const html = read("index.html");
    assert.match(html, /<script type="module" src="src\/main\.js"><\/script>/);
    ["src/main.js", "src/ui.js", "src/scene.js", "src/config.js", "src/store.js", "src/i18n.js", "style.css"]
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

test("localization supports all requested languages and automatic detection", () => {
    const i18n = read("src/i18n.js");
    ["en", "tr", "it", "es", "pt", "ar", "ru", "pl", "id"].forEach((language) => {
        assert.match(i18n, new RegExp(`\\b${language}: \\{`), `Missing ${language} locale`);
    });
    assert.match(i18n, /navigator\.languages/);
    assert.match(i18n, /document\.documentElement\.dir = current === "ar" \? "rtl" : "ltr"/);
    assert.deepEqual(SUPPORTED, ["en", "tr", "it", "es", "pt", "ar", "ru", "pl", "id"]);
    SUPPORTED.forEach((language) => {
        const locale = translations[language];
        assert.equal(locale.tabs.length, 4);
        assert.equal(locale.labels.length, 17);
        assert.equal(locale.outfits.length, 8);
        assert.equal(locale.poses.length, 8);
        assert.equal(locale.magic.length, 4);
    });
});

test("outfits, combat pose and magic duration are expanded", () => {
    const scene = read("src/scene.js");
    const config = read("src/config.js");
    assert.match(config, /"cyber", "royal", "ninja", "casual"/);
    assert.match(scene, /rightArm\.rotation\.set\(-0\.35, 0\.25, -0\.78\)/);
    assert.match(scene, /magicUntil = performance\.now\(\) \+ 1450/);
});
