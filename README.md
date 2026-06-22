# AURA//LAB

Static 3D constructor of Roblox auras running on Three.js

## Running locally

```bash
npm start
```

Open `http://127.0.0.1:8000`.

## Testing

```bash
npm test
```

The project does not require assembly. GitHub Pages publishes files from the root via `.github/workflows/pages.yml`.

## Structure

- `src/config.js` — Settings, presets and randomisation options
- `src/store.js` — Reading and saving the configuration locally
- `src/i18n.js` — Automatic language selection and interface translations
- `src/scene.js` — Three.js scene, a character, weapons, auras, and magic
- `src/ui.js` — Controls and user actions
- `src/main.js` — App entry point
- `tests/` — Static project tests
- `tools/serve.cjs` — Dependency-free local server
