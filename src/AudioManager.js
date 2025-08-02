import { CONFIG } from './config.js';

export class AudioManager {
    constructor(gameInstance) {
        console.log('Inicializando AudioManager...');
        this.game = gameInstance;
        this.enabled = CONFIG.AUDIO.ENABLED;
        this.sounds = {};
        this.loopingSounds = {};
        
        if (!this.enabled) {
            console.log('Sistema de áudio desabilitado via configuração');
            return;
        }

        try {
            if (!(window.AudioContext || window.webkitAudioContext)) {
                throw new Error('AudioContext não suportado neste navegador');
            }

            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterVolume = this.audioContext.createGain();
            this.masterVolume.connect(this.audioContext.destination);
            this.setMasterVolume(CONFIG.AUDIO.DEFAULT_VOLUME);
            console.log('AudioManager inicializado com sucesso');
        } catch (error) {
            console.error('Erro ao inicializar sistema de áudio:', error);
            this.enabled = false;
        }
    }

    loadSound(name, url) {
        if (!this.audioContext) {
            console.warn(`AudioContext não suportado, não é possível carregar o som: ${name}`);
            return;
        }
        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = () => {
            this.audioContext.decodeAudioData(request.response, (buffer) => {
                this.sounds[name] = buffer;
            }, (error) => {
                console.error(`Erro ao decodificar o som ${name} de ${url}:`, error);
            });
        };
        request.onerror = () => {
            console.error(`Erro de requisição para carregar o som ${name} de ${url}`);
        };
        request.send();
    }

    playSound(name, volume = 1.0) {
        if (!this.audioContext || !this.sounds[name]) return;

        const source = this.audioContext.createBufferSource();
        source.buffer = this.sounds[name];
        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = volume;
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        source.start(0);
        return source;
    }

    loopSound(name, volume = 1.0) {
        if (!this.audioContext || !this.sounds[name]) return;
        if (this.loopingSounds[name]) return;

        const source = this.audioContext.createBufferSource();
        source.buffer = this.sounds[name];
        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = volume;
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        source.loop = true;
        source.start(0);
        this.loopingSounds[name] = { source, gainNode };
    }

    stopLoop(name) {
        if (this.loopingSounds[name]) {
            this.loopingSounds[name].source.stop();
            delete this.loopingSounds[name];
        }
    }

    setVolume(name, volume) {
        if (this.loopingSounds[name]) {
            this.loopingSounds[name].gainNode.gain.value = volume;
        }
    }

    setMasterVolume(volume) {
        if (!this.enabled || !this.masterVolume) return;
        console.log(`Definindo volume master para: ${volume}`);
        this.masterVolume.gain.value = Math.max(0, Math.min(1, volume));
    }

    resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume().then(() => {
                console.log('Contexto de áudio resumido com sucesso');
            }).catch(error => {
                console.error('Erro ao resumir contexto de áudio:', error);
            });
        }
    }
}
