// --- Модуль процедурной генерации реалистичного города (city.js) ---
import * as THREE from 'three';

export function createCity(scene) {
    const cityGroup = new THREE.Group();

    // Материалы для города
    const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1c, roughness: 0.9 });
    const sidewalkMaterial = new THREE.MeshStandardMaterial({ color: 0x6e6e73, roughness: 0.8 });
    const grassMaterial = new THREE.MeshStandardMaterial({ color: 0x2e401b, roughness: 1.0 });
    const trimMaterial = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.5 });

    // Палитра фасадов зданий (реальные цвета панелек и домов)
    const facadeColors = [0x9198a1, 0x7c8590, 0xb0b8c4, 0x68707a, 0x545b63, 0xa38c7d];
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.9 });

    // Земля (подложка)
    const groundGeo = new THREE.PlaneGeometry(800, 800);
    const ground = new THREE.Mesh(groundGeo, grassMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.05;
    ground.receiveShadow = true;
    cityGroup.add(ground);

    // Сетка кварталов
    const blockSize = 70;
    const roadWidth = 16;
    const gridCount = 3;

    for (let x = -gridCount; x <= gridCount; x++) {
        for (let z = -gridCount; z <= gridCount; z++) {
            const posX = x * (blockSize + roadWidth);
            const posZ = z * (blockSize + roadWidth);

            // Дороги
            if (x < gridCount) {
                const roadX = new THREE.Mesh(
                    new THREE.PlaneGeometry(roadWidth, blockSize + roadWidth),
                    roadMaterial
                );
                roadX.rotation.x = -Math.PI / 2;
                roadX.position.set(posX + blockSize / 2 + roadWidth / 2, 0.01, posZ);
                roadX.receiveShadow = true;
                cityGroup.add(roadX);
            }

            if (z < gridCount) {
                const roadZ = new THREE.Mesh(
                    new THREE.PlaneGeometry(blockSize + roadWidth, roadWidth),
                    roadMaterial
                );
                roadZ.rotation.x = -Math.PI / 2;
                roadZ.position.set(posX, 0.01, posZ + blockSize / 2 + roadWidth / 2);
                roadZ.receiveShadow = true;
                cityGroup.add(roadZ);
            }

            // Тротуар вокруг квартала
            const sidewalk = new THREE.Mesh(
                new THREE.BoxGeometry(blockSize, 0.25, blockSize),
                sidewalkMaterial
            );
            sidewalk.position.set(posX, 0.125, posZ);
            sidewalk.receiveShadow = true;
            sidewalk.castShadow = true;
            cityGroup.add(sidewalk);

            // Генерация нормальных детализированных зданий в квартале
            generateBlockBuildings(posX, posZ, blockSize, cityGroup, facadeColors, roofMaterial, trimMaterial);
        }
    }

    scene.add(cityGroup);
    return cityGroup;
}

// Генерация зданий с выступами, крышами и балконами вместо плоских коробок
function generateBlockBuildings(blockX, blockZ, blockSize, group, colors, roofMat, trimMat) {
    const buildingSize = 20;
    
    // Расставляем по 4 здания на квартал с отступами
    const offsets = [
        {-1, -1}, {1, -1},
        {-1, 1}, {1, 1}
    ];

    offsets.forEach(offset => {
        const floors = Math.floor(Math.random() * 8) + 6; // от 6 до 13 этажей
        const floorHeight = 3.5;
        const totalHeight = floors * floorHeight;

        const posX = blockX + offset.x * (blockSize / 4);
        const posZ = blockZ + offset.y * (blockSize / 4);

        // Основной корпус здания
        const color = colors[Math.floor(Math.random() * colors.length)];
        const bodyGeo = new THREE.BoxGeometry(buildingSize, totalHeight, buildingSize);
        const bodyMat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.7 });
        
        const building = new THREE.Mesh(bodyGeo, bodyMat);
        building.position.set(posX, totalHeight / 2, posZ);
        building.castShadow = true;
        building.receiveShadow = true;
        group.add(building);

        // Парапет / крыша здания (делает крышу объемной для руфинга)
        const roofGeo = new THREE.BoxGeometry(buildingSize + 0.6, 0.8, buildingSize + 0.6);
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.set(posX, totalHeight + 0.4, posZ);
        roof.castShadow = true;
        group.add(roof);

        // Добавляем утопленные оконные блоки и балконы рядами
        createDetailedWindowsAndBalconies(posX, totalHeight, posZ, buildingSize, floors, floorHeight, group, trimMat);
    });
}

// Создание аккуратных окон и объемных элементов
function createDetailedWindowsAndBalconies(x, height, z, size, floors, floorHeight, group, trimMat) {
    const windowMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2, metalness: 0.8 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x88ccff, roughness: 0.1, transparent: true, opacity: 0.7 });
    
    const half = size / 2;

    for (let f = 1; f < floors; f++) {
        const y = f * floorHeight - height / 2;

        // Делаем аккуратные оконные рамы по периметру этажа
        for (let i = -1; i <= 1; i += 1) {
            if (i === 0) continue; // Пропускаем центр под подъездную группу на первом

            // Сторона Z+
            const winBlock = createWinBlock(windowMat, glassMat);
            winBlock.position.set(x + i * 5, y, z + half + 0.05);
            group.add(winBlock);

            // Сторона Z-
            const winBlock2 = createWinBlock(windowMat, glassMat);
            winBlock2.position.set(x + i * 5, y, z - half - 0.05);
            winBlock2.rotation.y = Math.PI;
            group.add(winBlock2);

            // Сторона X+
            const winBlock3 = createWinBlock(windowMat, glassMat);
            winBlock3.position.set(x + half + 0.05, y, z + i * 5);
            winBlock3.rotation.y = Math.PI / 2;
            group.add(winBlock3);

            // Сторона X-
            const winBlock4 = createWinBlock(windowMat, glassMat);
            winBlock4.position.set(x - half - 0.05, y, z + i * 5);
            winBlock4.rotation.y = -Math.PI / 2;
            group.add(winBlock4);
        }
    }
}

// Вспомогательный элемент окна
function createWinBlock(frameMat, glassMat) {
    const group = new THREE.Group();
    
    // Рама
    const frame = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.0, 0.1), frameMat);
    group.add(frame);

    // Стекло
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.8), glassMat);
    glass.position.z = 0.06;
    group.add(glass);

    return group;
}
