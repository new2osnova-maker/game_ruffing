// --- Чистый и плотный аудио-модуль для Ruffing Game ---
let audioCtx = null;
let masterGain = null;
let ambGain = null;
let sfxGain = null;

let isAudioInitialized = false;
let ambientNodes = [];

// Инициализация аудио по клику/тапу (требование браузеров)
function initAudio() {
    if (isAudioInitialized) return;
    
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();

        masterGain = audioCtx.createGain();
        ambGain = audioCtx.createGain();
        sfxGain = audioCtx.createGain();

        // Подключаем к общим выходам
        masterGain.connect(audioCtx.destination);
        ambGain.connect(masterGain);
        sfxGain.connect(masterGain);

        updateVolumes();

        // Запускаем фоновые звуки окружения (ветер, город, птицы)
        startAmbientSoundscape();

        isAudioInitialized = true;
        console.log("Audio initialized successfully.");
    } catch (e) {
        console.error("Web Audio API error:", e);
    }
}

// Обновление громкости из глобального объекта настроек S
function updateVolumes() {
    if (!audioCtx) return;
    const vol = typeof S !== 'undefined' && S.vol !== undefined ? S.vol : 0.8;
    const amb = typeof S !== 'undefined' && S.amb !== undefined ? S.amb : 0.6;
    
    masterGain.gain.setValueAtTime(vol, audioCtx.currentTime);
    ambGain.gain.setValueAtTime(amb, audioCtx.currentTime);
}

// --- ФОНОВЫЕ ЗВУКИ (Ветер, машины, люди, птицы) ---
function startAmbientSoundscape() {
    if (!audioCtx) return;

    // 1. Шум ветра и деревьев (розовый/белый шум через фильтр низких частот)
    try {
        const bufferSize = audioCtx.sampleRate * 2;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 280; // Мягкий глухой гул ветра

        const noiseGain = audioCtx.createGain();
        noiseGain.gain.value = 0.15;

        whiteNoise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ambGain);
        whiteNoise.start();
        ambientNodes.push(whiteNoise);

        // 2. Периодическое пение птиц
        const playBird = () => {
            if (!audioCtx || audioCtx.state !== 'running') return;
            const t = audioCtx.currentTime;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sine';
            const baseFreq = 2200 + Math.random() * 1200;
            
            osc.frequency.setValueAtTime(baseFreq, t);
            osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.3, t + 0.08);
            osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, t + 0.15);

            gain.gain.setValueAtTime(0.02, t);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);

            osc.connect(gain);
            gain.connect(ambGain);
            osc.start(t);
            osc.stop(t + 0.2);

            // Следующая птичка через случайное время
            setTimeout(playBird, 3000 + Math.random() * 6000);
        };
        setTimeout(playBird, 2000);

        // 3. Гул машин и далекий шум людей (низкочастотные волны)
        const playCityHum = () => {
            if (!audioCtx || audioCtx.state !== 'running') return;
            const t = audioCtx.currentTime;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(60 + Math.random() * 30, t);

            gain.gain.setValueAtTime(0.0, t);
            gain.gain.linearRampToValueAtTime(0.04, t + 1.5);
            gain.gain.linearRampToValueAtTime(0.0, t + 3.5);

            osc.connect(gain);
            gain.connect(ambGain);
            osc.start(t);
            osc.stop(t + 4.0);

            setTimeout(playCityHum, 5000 + Math.random() * 4000);
        };
        setTimeout(playCityHum, 1000);

    } catch (e) {
        console.log("Ambient generation error:", e);
    }
}

// --- ЗВУКИ ДЕЙСТВИЙ (SFX) ---

// Звук шагов ботинок в подъезде (глухой стук об бетон/ступени)
function playFootstepSound() {
    if (!audioCtx) {
        initAudio();
        return;
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    // Низкий удар с быстрым падением частоты
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.08);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

    osc.connect(gain);
    gain.connect(sfxGain);
    osc.start(t);
    osc.stop(t + 0.1);
}

// Звук открывающейся/скрипящей двери подъезда
function playDoorOpenSound() {
    if (!audioCtx) {
        initAudio();
        return;
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const t = audioCtx.currentTime;
    
    // Скрип (высокочастотный модулированный тон)
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(450, t);
    osc.frequency.linearRampToValueAtTime(650, t + 0.25);
    osc.frequency.linearRampToValueAtTime(500, t + 0.4);

    // Фильтр для придания металлического/деревянного скрипа
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1000;
    filter.Q.value = 3;

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(sfxGain);
    
    osc.start(t);
    osc.stop(t + 0.5);
}

// Экспортируем функции наружу, чтобы игра могла их вызывать
window.GameAudio = {
    init: initAudio,
    updateVolumes: updateVolumes,
    footstep: playFootstepSound,
    doorOpen: playDoorOpenSound
};
