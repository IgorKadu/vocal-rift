import { AudioManager } from '../src/AudioManager.js';

describe('AudioManager', () => {
    let audioManager;
    beforeEach(() => {
        audioManager = new AudioManager({});
        // Simula um AudioContext para teste
        audioManager.audioContext = {
            createBufferSource: () => ({
                connect: jest.fn(),
                start: jest.fn(),
                stop: jest.fn()
            }),
            createGain: () => ({
                gain: { value: 1.0 },
                connect: jest.fn()
            }),
            destination: {}
        };
        audioManager.sounds = {
            testSound: {} // Simula um buffer de som
        };
    });

    test('deve tocar um som quando playSound é chamado', () => {
        const source = audioManager.playSound('testSound', 0.8);
        expect(source).toBeDefined();
    });

    test('não deve tocar som se ele não estiver carregado', () => {
        const source = audioManager.playSound('somInexistente');
        expect(source).toBeUndefined();
    });
});
