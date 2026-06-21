const THREE = window.THREE;

function clearGroup(group) {
    while (group.children.length) {
        const child = group.children[group.children.length - 1];
        group.remove(child);
        child.traverse?.((node) => {
            node.geometry?.dispose();
            if (Array.isArray(node.material)) node.material.forEach((material) => material.dispose());
            else node.material?.dispose();
        });
    }
}

function meshBox(width, height, depth, material) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
    mesh.castShadow = true;
    return mesh;
}

export function createAuraScene(container) {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.035);

    const camera = new THREE.PerspectiveCamera(43, 1, 0.1, 1000);
    camera.position.set(0, 1.3, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.055;
    controls.minDistance = 6;
    controls.maxDistance = 14;
    controls.maxPolarAngle = Math.PI / 2 + 0.08;
    controls.target.set(0, 0.15, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.62);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.1);
    keyLight.position.set(4, 9, 6);
    keyLight.castShadow = true;
    const rimLight = new THREE.PointLight(0x8b5cf6, 1.5, 18);
    rimLight.position.set(-4, 2, -3);
    scene.add(ambientLight, keyLight, rimLight);

    const grid = new THREE.GridHelper(28, 28, 0x6d5dd3, 0x20263a);
    grid.position.y = -2.57;
    scene.add(grid);

    const stageMaterial = new THREE.MeshStandardMaterial({ color: 0x171c2c, roughness: 0.45, metalness: 0.5 });
    const stage = new THREE.Mesh(new THREE.CylinderGeometry(2.35, 2.7, 0.28, 48), stageMaterial);
    stage.position.y = -2.55;
    stage.receiveShadow = true;
    scene.add(stage);

    const stageRing = new THREE.Mesh(
        new THREE.TorusGeometry(2.35, 0.035, 8, 72),
        new THREE.MeshBasicMaterial({ color: 0x8b5cf6 })
    );
    stageRing.rotation.x = Math.PI / 2;
    stageRing.position.y = -2.39;
    scene.add(stageRing);

    const stars = createStars();
    scene.add(stars);

    const character = new THREE.Group();
    const hatGroup = new THREE.Group();
    const weaponGroup = new THREE.Group();
    const petGroup = new THREE.Group();
    const auraGroup = new THREE.Group();
    const auraDecor = new THREE.Group();
    const magicGroup = new THREE.Group();
    scene.add(character, petGroup, auraGroup, auraDecor, magicGroup);

    const skinMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc99, roughness: 0.65 });
    const torsoMaterial = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.5 });
    const pantsMaterial = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 });

    const head = meshBox(1, 1, 1, skinMaterial);
    head.position.y = 1.85;
    const torso = meshBox(2, 2, 1, torsoMaterial);
    torso.position.y = 0.35;
    const face = createFace();
    face.position.set(0, 1.85, 0.506);

    const leftArm = makeLimb(-1.5, 1.35, torsoMaterial);
    const rightArm = makeLimb(1.5, 1.35, torsoMaterial);
    const leftLeg = makeLimb(-0.5, -0.65, pantsMaterial);
    const rightLeg = makeLimb(0.5, -0.65, pantsMaterial);

    const handAnchor = new THREE.Group();
    handAnchor.position.set(0, -1.82, 0);
    weaponGroup.rotation.z = Math.PI;
    handAnchor.add(weaponGroup);
    rightArm.add(handAnchor);
    character.add(head, face, torso, leftArm, rightArm, leftLeg, rightLeg, hatGroup);
    character.position.y = -0.02;

    let config;
    let particles = [];
    let magicUntil = 0;
    let magicKind = "shockwave";

    function createStars() {
        const group = new THREE.Group();
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(900);
        for (let index = 0; index < positions.length; index += 3) {
            const radius = 12 + Math.random() * 20;
            const angle = Math.random() * Math.PI * 2;
            positions[index] = Math.cos(angle) * radius;
            positions[index + 1] = Math.random() * 22 - 7;
            positions[index + 2] = Math.sin(angle) * radius;
        }
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        group.add(new THREE.Points(geometry, new THREE.PointsMaterial({
            color: 0xa5b4fc, size: 0.045, transparent: true, opacity: 0.75
        })));
        return group;
    }

    function createFace() {
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 128;
        const context = canvas.getContext("2d");
        context.fillStyle = "#111827";
        context.fillRect(29, 38, 14, 24);
        context.fillRect(85, 38, 14, 24);
        context.fillRect(43, 82, 42, 9);
        context.fillRect(38, 76, 6, 12);
        context.fillRect(85, 76, 6, 12);
        return new THREE.Mesh(
            new THREE.PlaneGeometry(0.91, 0.91),
            new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true })
        );
    }

    function makeLimb(x, y, material) {
        const pivot = new THREE.Group();
        pivot.position.set(x, y, 0);
        const limb = meshBox(1, 2, 1, material);
        limb.position.y = -1;
        pivot.add(limb);
        return pivot;
    }

    function rebuildAura() {
        clearGroup(auraGroup);
        clearGroup(auraDecor);
        particles = [];

        const size = config.size * 0.026;
        const radius = config.glow * 0.055;
        const geometry = config.shape === "cube" ? new THREE.BoxGeometry(size, size, size)
            : config.shape === "sphere" ? new THREE.SphereGeometry(size * 0.55, 8, 8)
            : config.shape === "fire" ? new THREE.ConeGeometry(size * 0.36, size * 1.6, 5)
            : new THREE.OctahedronGeometry(size * 0.62, 0);
        const material = new THREE.MeshBasicMaterial({
            color: config.color, transparent: true, opacity: 0.78, blending: THREE.AdditiveBlending
        });

        for (let index = 0; index < config.count; index += 1) {
            const particle = new THREE.Mesh(geometry, material);
            const angle = Math.random() * Math.PI * 2;
            const baseRadius = radius * (0.45 + Math.random() * 0.65);
            particle.position.set(Math.cos(angle) * baseRadius, Math.random() * 4.8 - 2.25, Math.sin(angle) * baseRadius);
            particles.push({
                mesh: particle,
                angle,
                radius: baseRadius,
                baseRadius,
                speed: 0.012 + Math.random() * 0.025,
                spin: (Math.random() - 0.5) * 0.06,
                seed: Math.random() * 20
            });
            auraGroup.add(particle);
        }

        if (config.auraType === "rings") addEnergyRings(radius);
        if (config.auraType === "storm") addStormBolts(radius);
        if (config.auraType === "halo") addHalo(radius);
        stageRing.material.color.set(config.color);
        rimLight.color.set(config.color);
    }

    function addEnergyRings(radius) {
        const material = new THREE.MeshBasicMaterial({ color: config.color, transparent: true, opacity: 0.55 });
        [-1.45, 0, 1.45].forEach((y, index) => {
            const ring = new THREE.Mesh(new THREE.TorusGeometry(radius * (0.75 + index * 0.08), 0.025, 6, 64), material);
            ring.position.y = y;
            ring.rotation.x = Math.PI / 2 + (index - 1) * 0.18;
            ring.userData.spin = index % 2 ? -1 : 1;
            auraDecor.add(ring);
        });
    }

    function addStormBolts(radius) {
        const material = new THREE.LineBasicMaterial({ color: config.color, transparent: true, opacity: 0.8 });
        for (let boltIndex = 0; boltIndex < 7; boltIndex += 1) {
            const points = [];
            const angle = Math.random() * Math.PI * 2;
            for (let step = 0; step < 7; step += 1) {
                points.push(new THREE.Vector3(
                    Math.cos(angle) * radius + (Math.random() - 0.5) * 0.35,
                    -2 + step * 0.7,
                    Math.sin(angle) * radius + (Math.random() - 0.5) * 0.35
                ));
            }
            const bolt = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material);
            bolt.userData.phase = Math.random() * 10;
            auraDecor.add(bolt);
        }
    }

    function addHalo(radius) {
        const material = new THREE.MeshBasicMaterial({ color: config.color, transparent: true, opacity: 0.7 });
        const halo = new THREE.Mesh(new THREE.TorusGeometry(Math.max(0.8, radius * 0.55), 0.055, 8, 64), material);
        halo.position.y = 2.85;
        halo.rotation.x = Math.PI / 2;
        halo.userData.halo = true;
        auraDecor.add(halo);
    }

    function updateOutfit() {
        torsoMaterial.wireframe = false;
        [skinMaterial, torsoMaterial, pantsMaterial].forEach((material) => material.emissive.set(0x000000));
        if (config.outfit === "default") {
            skinMaterial.color.set(0xffcc99); torsoMaterial.color.set(0x2563eb); pantsMaterial.color.set(0x1e293b);
        } else if (config.outfit === "noob") {
            skinMaterial.color.set(0xffd21c); torsoMaterial.color.set(0x1677ff); pantsMaterial.color.set(0x16a34a);
        } else if (config.outfit === "knight") {
            skinMaterial.color.set(0xcbd5e1); torsoMaterial.color.set(0x4b5563); pantsMaterial.color.set(0x242b37);
            torsoMaterial.emissive.set(config.color).multiplyScalar(0.15);
        } else {
            skinMaterial.color.set(0x070912); torsoMaterial.color.set(0x070912); pantsMaterial.color.set(0x070912);
            skinMaterial.emissive.set(config.color).multiplyScalar(0.25);
            torsoMaterial.emissive.set(config.color).multiplyScalar(0.58);
            pantsMaterial.emissive.set(config.color).multiplyScalar(0.2);
            torsoMaterial.wireframe = true;
        }
    }

    function rebuildGear() {
        clearGroup(hatGroup);
        clearGroup(weaponGroup);
        const dark = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.7 });

        if (config.hat === "wizardHat") {
            const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 0.88, 0.08, 18), dark);
            const cone = new THREE.Mesh(new THREE.ConeGeometry(0.54, 1.2, 18), dark);
            brim.position.y = 2.43; cone.position.y = 3.02; cone.rotation.z = -0.1;
            hatGroup.add(brim, cone);
        } else if (config.hat === "horns") {
            const hornMaterial = new THREE.MeshBasicMaterial({ color: config.color });
            [-0.42, 0.42].forEach((x) => {
                const horn = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.7, 8), hornMaterial);
                horn.position.set(x, 2.55, 0);
                horn.rotation.z = x < 0 ? 0.38 : -0.38;
                hatGroup.add(horn);
            });
        }

        if (config.weapon === "none") return;
        const metal = new THREE.MeshStandardMaterial({ color: 0x9ca3af, metalness: 0.75, roughness: 0.25 });
        if (config.weapon === "staff") {
            const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 2.9), new THREE.MeshStandardMaterial({ color: 0x4a250d }));
            shaft.position.y = 0.15;
            const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.24), new THREE.MeshBasicMaterial({ color: config.color }));
            crystal.position.y = 1.68;
            weaponGroup.add(shaft, crystal);
        } else {
            const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.48), metal);
            handle.position.y = 0;
            const guard = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.12, 0.12), metal);
            guard.position.y = 0.25;
            weaponGroup.add(handle, guard);
            if (config.weapon === "lightsaber") {
                const blade = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.045, 0.045, 2.1),
                    new THREE.MeshBasicMaterial({ color: config.color })
                );
                blade.position.y = 1.34;
                weaponGroup.add(blade);
            } else {
                const blade = new THREE.Mesh(new THREE.BoxGeometry(0.25, 1.9, 0.07), metal);
                blade.position.y = 1.25;
                weaponGroup.add(blade);
            }
        }
    }

    function rebuildPet() {
        clearGroup(petGroup);
        if (config.pet === "none") return;
        const material = new THREE.MeshBasicMaterial({ color: config.color, wireframe: config.pet === "wisp" });
        const pet = new THREE.Mesh(
            config.pet === "cubeSp" ? new THREE.BoxGeometry(0.52, 0.52, 0.52) : new THREE.OctahedronGeometry(0.34),
            material
        );
        if (config.pet === "cubeSp") {
            [-0.18, 0.18].forEach((x) => {
                const ear = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.25, 4), material);
                ear.position.set(x, 0.36, 0);
                pet.add(ear);
            });
        }
        petGroup.add(pet);
    }

    function updateWorld() {
        stars.visible = config.biome === "space";
        grid.visible = config.biome !== "dark";
        const colors = config.biome === "space"
            ? [0x020617, 0x292454, 0x171c2c]
            : config.biome === "neon"
                ? [0x041015, 0x00bfa5, 0x10282b]
                : [0x020204, 0x111116, 0x111116];
        scene.background = new THREE.Color(colors[0]);
        scene.fog.color.set(colors[0]);
        grid.material.color.set(colors[1]);
        stageMaterial.color.set(colors[2]);
        ambientLight.intensity = 0.25 + config.lightPower * 0.055;
        keyLight.intensity = 0.35 + config.lightPower * 0.11;
        rimLight.intensity = 0.4 + config.lightPower * 0.16;
    }

    function sync(nextConfig, changed = "all") {
        config = nextConfig;
        const auraFields = ["auraType", "color", "count", "size", "glow", "shape"];
        if (changed === "all" || auraFields.includes(changed)) rebuildAura();
        if (changed === "all" || ["outfit", "color"].includes(changed)) updateOutfit();
        if (changed === "all" || ["hat", "weapon", "color"].includes(changed)) rebuildGear();
        if (changed === "all" || ["pet", "color"].includes(changed)) rebuildPet();
        if (changed === "all" || ["biome", "lightPower"].includes(changed)) updateWorld();
        if (changed === "cameraZoom") setCameraDistance(config.cameraZoom);
    }

    function setCameraDistance(distance = config.cameraZoom) {
        const direction = camera.position.clone().sub(controls.target).normalize();
        camera.position.copy(controls.target).add(direction.multiplyScalar(distance));
        controls.update();
    }

    function resetCamera() {
        camera.position.set(0, 1.3, config.cameraZoom);
        controls.target.set(0, 0.15, 0);
        controls.update();
    }

    function castMagic(kind) {
        magicKind = kind;
        magicUntil = performance.now() + 850;
        clearGroup(magicGroup);
        const material = new THREE.MeshBasicMaterial({
            color: config.color, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending
        });
        if (kind === "portal") {
            const portal = new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.12, 10, 72), material);
            portal.position.set(0, 0.25, -1.25);
            magicGroup.add(portal);
        } else if (kind === "meteor") {
            const meteor = new THREE.Mesh(new THREE.IcosahedronGeometry(0.6, 1), material);
            meteor.position.set(3.5, 6, 0);
            magicGroup.add(meteor);
        } else if (kind === "lightning") {
            const points = [];
            for (let index = 0; index < 12; index += 1) {
                points.push(new THREE.Vector3((Math.random() - 0.5) * 0.45, 6 - index * 0.72, (Math.random() - 0.5) * 0.4));
            }
            magicGroup.add(new THREE.Line(
                new THREE.BufferGeometry().setFromPoints(points),
                new THREE.LineBasicMaterial({ color: config.color })
            ));
        } else {
            const wave = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.08, 8, 72), material);
            wave.rotation.x = Math.PI / 2;
            wave.position.y = -2.25;
            magicGroup.add(wave);
        }
    }

    function downloadImage(name) {
        renderer.render(scene, camera);
        const link = document.createElement("a");
        link.download = `${name || "aura-lab"}.png`;
        link.href = renderer.domElement.toDataURL("image/png");
        link.click();
    }

    function resize() {
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (!width || !height) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
    }

    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        if (!config) return;
        const time = clock.getElapsedTime();
        animateCharacter(time);
        animateAura(time);
        animateMagic(time);
        stageRing.rotation.z = time * 0.08;
        stars.rotation.y = time * 0.006;
        controls.update();
        renderer.render(scene, camera);
    }

    function resetBones() {
        character.position.set(0, -0.02, 0);
        character.rotation.set(0, 0, 0);
        leftArm.rotation.set(0, 0, 0); rightArm.rotation.set(0, 0, 0);
        leftLeg.rotation.set(0, 0, 0); rightLeg.rotation.set(0, 0, 0);
    }

    function animateCharacter(time) {
        resetBones();
        const pose = config.pose;
        if (pose === "wizard") {
            character.rotation.y = Math.sin(time * 0.55) * 0.18;
            leftArm.rotation.x = 0.45; rightArm.rotation.set(-0.2, 0, 0.3);
        } else if (pose === "float") {
            character.position.y = 0.35 + Math.sin(time * 2) * 0.14;
            character.rotation.y = time * 0.22;
            leftArm.rotation.z = -0.42; rightArm.rotation.z = 0.42;
        } else if (pose === "combat") {
            character.rotation.y = -0.38;
            rightArm.rotation.set(0.2, 0, -1.65);
            leftArm.rotation.set(0.35, 0, 0.7);
            leftLeg.rotation.x = 0.28; rightLeg.rotation.x = -0.28;
        } else if (pose === "hero") {
            character.rotation.y = -0.18;
            leftArm.rotation.z = -0.18; rightArm.rotation.z = 0.18;
            leftLeg.rotation.x = -0.12; rightLeg.rotation.x = 0.12;
        } else if (pose === "ninja") {
            character.position.y = -0.3;
            character.rotation.y = -0.55;
            leftArm.rotation.set(-0.6, 0, -1.05);
            rightArm.rotation.set(0.7, 0, 1.35);
            leftLeg.rotation.x = 0.85; rightLeg.rotation.x = -0.55;
        } else if (pose === "victory") {
            character.position.y = Math.abs(Math.sin(time * 2.5)) * 0.18;
            leftArm.rotation.z = -2.65; rightArm.rotation.z = 2.65;
        } else if (pose === "meditate") {
            character.position.y = 0.15 + Math.sin(time * 1.7) * 0.08;
            leftArm.rotation.set(0, 0, -1.05); rightArm.rotation.set(0, 0, 1.05);
            leftLeg.rotation.set(1.25, 0, -0.55); rightLeg.rotation.set(1.25, 0, 0.55);
        } else {
            character.position.y = 0.65;
            character.rotation.z = Math.PI;
            character.rotation.y = time * 3.5 * (config.speed * 0.2 + 0.25);
            leftArm.rotation.z = -0.8; rightArm.rotation.z = 0.8;
            leftLeg.rotation.x = Math.sin(time * 9) * 0.4;
            rightLeg.rotation.x = -leftLeg.rotation.x;
        }

        const breath = Math.sin(time * 2) * 0.018;
        head.position.y = 1.85 + breath;
        face.position.y = 1.85 + breath;
        hatGroup.position.y = breath;

        if (petGroup.children[0]) {
            const radius = config.glow * 0.055 + 0.75;
            petGroup.children[0].position.set(
                Math.cos(time * 1.45) * radius,
                0.55 + Math.sin(time * 3) * 0.2,
                Math.sin(time * 1.45) * radius
            );
            petGroup.children[0].rotation.y = -time * 1.5;
        }
    }

    function animateAura(time) {
        const speed = config.speed * 0.2;
        const maxRadius = config.glow * 0.055;
        particles.forEach((particle) => {
            particle.angle += speed * (config.auraType === "storm" ? 0.04 : 0.024);
            if (config.direction === "up") {
                particle.mesh.position.y += particle.speed * (speed + 0.5);
                if (particle.mesh.position.y > 2.55) particle.mesh.position.y = -2.25;
            } else if (config.direction === "down") {
                particle.mesh.position.y -= particle.speed * (speed + 0.5);
                if (particle.mesh.position.y < -2.25) particle.mesh.position.y = 2.55;
            } else {
                particle.radius -= particle.speed * (speed * 0.3 + 0.18);
                if (particle.radius < 0.35) particle.radius = maxRadius * (0.5 + Math.random() * 0.6);
            }
            const pulse = config.fxMode === "pulse" ? 0.8 + Math.sin(time * 4 + particle.seed) * 0.25 : 1;
            const radius = (config.direction === "inward" ? particle.radius : particle.baseRadius) * pulse;
            particle.mesh.position.x = Math.cos(particle.angle) * radius;
            particle.mesh.position.z = Math.sin(particle.angle) * radius;
            const chaos = config.fxMode === "chaos" ? 0.45 + Math.abs(Math.sin(time * 8 + particle.seed)) : 1;
            particle.mesh.scale.setScalar(chaos * (performance.now() < magicUntil ? 1.45 : 1));
            particle.mesh.rotation.x += particle.spin;
            particle.mesh.rotation.y += particle.spin;
        });
        auraDecor.children.forEach((item, index) => {
            if (item.userData.halo) {
                item.rotation.z = time * 0.35;
                item.position.y = 2.85 + Math.sin(time * 2) * 0.08;
            } else if (item.type === "Line") {
                item.visible = Math.sin(time * 13 + item.userData.phase) > -0.2;
            } else {
                item.rotation.z += 0.003 * item.userData.spin * (index + 1);
            }
        });
    }

    function animateMagic(time) {
        if (!magicGroup.children.length) return;
        const active = performance.now() < magicUntil;
        if (!active) {
            clearGroup(magicGroup);
            return;
        }
        const item = magicGroup.children[0];
        if (magicKind === "shockwave") item.scale.multiplyScalar(1.075);
        if (magicKind === "portal") {
            item.rotation.z += 0.16;
            item.scale.setScalar(1 + Math.sin(time * 14) * 0.08);
        }
        if (magicKind === "meteor") {
            item.position.x -= 0.14;
            item.position.y -= 0.22;
            item.rotation.x += 0.16;
        }
        if (magicKind === "lightning") item.visible = Math.sin(time * 40) > -0.45;
    }

    window.addEventListener("resize", resize);
    resize();
    animate();

    return { sync, resetCamera, castMagic, downloadImage, resize };
}
