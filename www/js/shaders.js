// --- Шейдеры и атмосферные эффекты для Ruffing Game ---
const Shaders = {
    // Шейдер неба с градиентом закатного/ночного неба (высокая производительность)
    sky: {
        uniforms: {
            topColor: { value: new THREE.Color(0x1a1a2e) },
            bottomColor: { value: new THREE.Color(0xf67280) },
            offset: { value: 33 },
            exponent: { value: 0.6 }
        },
        vertexShader: `
            varying vec3 vWorldPosition;
            void main() {
                vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                vWorldPosition = worldPosition.xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 topColor;
            uniform vec3 bottomColor;
            uniform float offset;
            uniform float exponent;
            varying vec3 vWorldPosition;
            void main() {
                float h = normalize(vWorldPosition + offset).y;
                float t = max(pow(max(h, 0.0), exponent), 0.0);
                gl_FragColor = vec4(mix(bottomColor, topColor, t), 1.0);
            }
        `
    },

    // Настройка тумана для оптимизации дальности прорисовки на мобилках
    setupFog(scene, qualityLevel) {
        // Качество графики: 1 - картошка, 2 - низкая, 3 - средняя, 4 - высокая
        if (qualityLevel === 1) {
            // Без тумана или жесткий туман для максимального FPS
            scene.fog = new THREE.FogExp2(0x0f0f1a, 0.015);
        } else if (qualityLevel >= 3) {
            // Красивый мягкий туман для высоких настроек
            scene.fog = new THREE.FogExp2(0x1a1a2e, 0.008);
        } else {
            scene.fog = new THREE.FogExp2(0x151522, 0.01);
        }
    }
};

export { Shaders };

