import { GAME_STATE } from './constants.js';
import { AudioManager } from './AudioManager.js';
import { ParticleEffect } from './ParticleEffect.js';
import { BaseGame } from './BaseGame.js';

export class Game extends BaseGame {
    constructor() {
        console.log('Iniciando Game...');
        super(); // Chama o construtor da BaseGame primeiro
        
        console.log('Configurando estado inicial do jogo...');
        this.state = GAME_STATE.MENU;
        this.activeParticleEffects = [];
        
        console.log('Inicializando gerenciador de áudio...');
        try {
            this.audioManager = new AudioManager(this);
            this.loadGameSounds();
        } catch (error) {
            console.error('Erro ao inicializar áudio:', error);
        }
    }

    loadGameSounds() {
        try {
            console.log('Carregando sons do jogo...');
            const soundMap = {
                'menu_theme': 'assets/sounds/menu_theme.mp3',
                'background_music': 'assets/sounds/background_music.mp3',
                'skill_fireball': 'assets/sounds/fireball.mp3',
                'hit_player': 'assets/sounds/hit.mp3'
            };
            
            // Verifica se a pasta assets/sounds existe
            console.log('Sons a serem carregados:', Object.keys(soundMap));
            
            for (const [name, path] of Object.entries(soundMap)) {
                console.log(`Tentando carregar som: ${name} de ${path}`);
                this.audioManager.loadSound(name, path);
            }
        } catch (error) {
            console.error('Erro ao carregar sons:', error);
        }
    }

    createParticleEffect(position, type) {
        if (!this.scene || !this.audioManager) return;
        const effect = new ParticleEffect(this.scene, position, type, this);
        if (effect.isActive) {
            this.activeParticleEffects.push(effect);
        }
        // Reproduzir som associado
        if (this.audioManager) {
            let soundName = type === 'hit_player' ? 'hit_player' : null;
            if (soundName) this.audioManager.playSound(soundName);
        }
    }

    update(dt) {
        // Atualiza lógica do jogo, jogadores, bots, etc.
        for (let i = this.activeParticleEffects.length - 1; i >= 0; i--) {
            const effect = this.activeParticleEffects[i];
            effect.update(dt);
            if (!effect.isActive) {
                this.activeParticleEffects.splice(i, 1);
            }
        }
    }

    setState(state) {
        this.state = state;
        // Alterar música, menus, etc.
        if (state === GAME_STATE.MENU) {
            if (this.audioManager) {
                this.audioManager.stopLoop('background_music');
                this.audioManager.loopSound('menu_theme', 0.5);
            }
        } else if (state === GAME_STATE.PLAYING) {
            if (this.audioManager) {
                this.audioManager.stopLoop('menu_theme');
                this.audioManager.loopSound('background_music', 0.6);
            }
        }
    }
}

// Inicia o jogo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, iniciando Game...');
    try {
        window.game = new Game();
    } catch (error) {
        console.error('Erro ao iniciar o jogo:', error);
    }
});
