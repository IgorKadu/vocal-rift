// Arquivo principal do jogo modularizado
import { Game } from './src/Game.js';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';

// Inicializa o jogo
const game = new Game();

// Loop principal de atualização
function animate(time) {
    const dt = 0.016; // Aproximação de 60 FPS
    game.update(dt);
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);