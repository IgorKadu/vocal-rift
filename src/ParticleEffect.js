import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
export class ParticleEffect {
    constructor(scene, position, type, gameInstance) {
        this.scene = scene;
        this.game = gameInstance;
        this.position = position.clone();
        this.type = type;
        this.particles = [];
        this.lifetime = 0;
        this.isActive = false;
        this.config = this.getEffectConfig(type);

        if (!this.config) {
            console.warn(`Configuração de efeito não encontrada para o tipo: ${type}`);
            return;
        }

        this.lifetime = this.config.lifetime || 1.0;
        this.createParticles();
        this.isActive = true;
    }

    getEffectConfig(type) {
        const configs = {
            hit_player: { count: 15, color: 0xff4444, velocity: { spread: 0.6, initial: 12, gravity: 0.3 }, lifetime: 0.6, size: 0.1, material: 'basic', opacity: 1.0, fade: true },
            // Outras configurações de efeito...
        };
        return configs[type];
    }

    createParticles() {
        if (!this.config) return;
        for (let i = 0; i < this.config.count; i++) {
            const particleGeo = new THREE.SphereGeometry(this.config.size, 8, 8);
            const material = new THREE.MeshBasicMaterial({
                color: this.config.color,
                transparent: true,
                opacity: this.config.opacity
            });
            const particle = new THREE.Mesh(particleGeo, material);
            particle.position.copy(this.position);

            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * (this.config.velocity.spread || 0.5) + (this.config.velocity.initial || 5);
            particle.velocity = new THREE.Vector3(Math.cos(angle) * speed, Math.random() * (this.config.velocity.gravity || 0) + 0, Math.sin(angle) * speed);

            this.scene.add(particle);
            this.particles.push(particle);
        }
    }

    update(dt) {
        if (!this.isActive) return;
        this.lifetime -= dt;
        if (this.lifetime <= 0) {
            this.dispose();
            return;
        }
        for (const particle of this.particles) {
            particle.velocity.y += (this.config.velocity.gravity || 0) * dt;
            particle.position.addScaledVector(particle.velocity, dt);
            if (this.config.fade) {
                particle.material.opacity = Math.max(0, particle.material.opacity - dt * (this.config.opacity / this.config.lifetime));
            }
        }
        this.particles = this.particles.filter(p => p.material.opacity > 0);
    }

    dispose() {
        for (const particle of this.particles) {
            if (particle.geometry) particle.geometry.dispose();
            if (particle.material) particle.material.dispose();
            this.scene.remove(particle);
        }
        this.particles = [];
        this.isActive = false;
    }
}
