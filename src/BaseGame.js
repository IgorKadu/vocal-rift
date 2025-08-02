import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';

export class BaseGame {
    constructor() {
        console.log('Iniciando BaseGame...');
        this.setupRenderer();
        this.setupScene();
        this.setupCamera();
        this.setupLights();
        this.setupDebugObjects();
        this.setupEventListeners();
        this.startGameLoop();
    }

    setupRenderer() {
        console.log('Configurando renderer...');
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000);
        
        const container = document.getElementById('game-container');
        if (!container) {
            throw new Error('Elemento game-container não encontrado!');
        }
        container.appendChild(this.renderer.domElement);
        console.log('Renderer configurado com sucesso.');

    }

    setupScene() {
        console.log('Configurando cena...');
        this.scene = new THREE.Scene();
        console.log('Cena configurada com sucesso.');
    }

    setupCamera() {
        console.log('Configurando câmera...');
        this.camera = new THREE.PerspectiveCamera(
            75, // FOV
            window.innerWidth / window.innerHeight, // Aspect ratio
            0.1, // Near plane
            1000 // Far plane
        );
        this.camera.position.z = 5;
        console.log('Câmera configurada com sucesso.');
    }

    setupLights() {
        console.log('Configurando luzes...');
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 1, 0);
        this.scene.add(directionalLight);
        console.log('Luzes configuradas com sucesso.');

    }

    setupDebugObjects() {
        console.log('Configurando objetos de debug...');
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0x00ff00,
            metalness: 0.3,
            roughness: 0.4
        });
        this.debugCube = new THREE.Mesh(geometry, material);
        this.scene.add(this.debugCube);
        console.log('Objetos de debug configurados com sucesso.');
    }

    setupEventListeners() {
        console.log('Configurando event listeners...');
        window.addEventListener('resize', () => this.onWindowResize());
        console.log('Event listeners configurados com sucesso.');
    }

    updateDebugInfo() {
        const debugInfo = document.getElementById('debug-info');
        if (debugInfo) {
            debugInfo.textContent = `Objects: ${this.scene.children.length}`;
        }
    }

    startGameLoop() {
        console.log('Iniciando loop do jogo...');
        this.animate();
    }

    onWindowResize() {
        console.log('Redimensionando janela...');
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        console.log('Janela redimensionada com sucesso.');
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Rotaciona o cubo de debug
        if (this.debugCube) {
            this.debugCube.rotation.x += 0.01;
            this.debugCube.rotation.y += 0.01;
        }

        this.updateDebugInfo();
        this.renderer.render(this.scene, this.camera);
    }
}
