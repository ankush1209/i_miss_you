/**
 * Until We Meet Again ❤️ - Animation Engineering Framework Layer
 * Coordinates canvas wrappers, DOM ambient particle structures, and 60fps window transforms.
 */
const AnimationManager = {
    container: null,

    init() {
        this.container = APP_STATE.cachedDOM.ambientContainer;
        this.startAmbientGenerators();
    },

    startAmbientGenerators() {
        // Initialize lightweight staggered rendering loops utilizing structural CSS execution paths
        this.spawnLoop("hearts", () => this.createHeart(), 4000);
        this.spawnLoop("clouds", () => this.createCloud(), 18000);
        this.spawnLoop("sparkles", () => this.createSparkle(), 2500);
        this.spawnLoop("petals", () => this.createPetal(), 5000);
    },

    spawnLoop(key, builderFunc, delay) {
        // Initial cluster populate
        builderFunc();
        APP_STATE.activeTimers[`ambient_${key}`] = setInterval(() => {
            if (document.hidden) return; // Prevent memory leak contexts on hidden tab viewports
            builderFunc();
        }, delay);
    },

    createHeart() {
        if (!this.container || this.container.children.length > CONFIG.particles.heartMaxCount) return;
        const heart = document.createElement("div");
        heart.className = "floating-heart-element";
        heart.innerHTML = AppController.getRandomItem(["❤️", "💖", "💝", "💕"]);
        
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.fontSize = `${Math.random() * 1.2 + 0.8}rem`;
        heart.style.setProperty("--drift-x", `${(Math.random() - 0.5) * 120}px`);
        heart.style.setProperty("--scale", `${Math.random() * 0.4 + 0.9}`);
        
        const duration = Math.random() * 6 + 6;
        heart.style.animationDuration = `${duration}s`;

        this.container.appendChild(heart);
        setTimeout(() => heart.remove(), duration * 1000);
    },

    createCloud() {
        if (!this.container || document.querySelectorAll(".ambient-cloud").length > CONFIG.particles.cloudMaxCount) return;
        const cloud = document.createElement("div");
        cloud.className = "ambient-cloud";
        
        const width = Math.random() * 120 + 80;
        cloud.style.width = `${width}px`;
        cloud.style.height = `${width * 0.4}px`;
        cloud.style.top = `${Math.random() * 40 + 5}%`;
        
        const duration = Math.random() * 35 + 40;
        cloud.style.animationDuration = `${duration}s`;

        this.container.appendChild(cloud);
        setTimeout(() => cloud.remove(), duration * 1000);
    },

    createSparkle() {
        if (!this.container || document.querySelectorAll(".ambient-sparkle").length > CONFIG.particles.sparkleMaxCount) return;
        const sparkle = document.createElement("div");
        sparkle.className = "ambient-sparkle";
        
        const size = Math.random() * 8 + 4;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.left = `${Math.random() * 100}vw`;
        sparkle.style.top = `${Math.random() * 90}vh`;
        
        const duration = Math.random() * 2 + 1.5;
        sparkle.style.animationDuration = `${duration}s`;

        this.container.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), duration * 1000);
    },

    createPetal() {
        if (!this.container || document.querySelectorAll(".ambient-petal").length > CONFIG.particles.petalMaxCount) return;
        const petal = document.createElement("div");
        petal.className = "ambient-petal";
        
        petal.style.left = `${Math.random() * 100}vw`;
        const size = Math.random() * 10 + 8;
        petal.style.width = `${size}px`;
        petal.style.height = `${size * 1.4}px`;
        petal.style.setProperty("--drift-x", `${Math.random() * 180 + 50}px`);
        petal.style.setProperty("--rot", `${Math.random() * 360 + 360}deg`);
        
        const duration = Math.random() * 8 + 8;
        petal.style.animationDuration = `${duration}s`;

        this.container.appendChild(petal);
        setTimeout(() => petal.remove(), duration * 1000);
    },

    fadeOut(element, callback) {
        element.style.opacity = "0";
        element.style.transform = "translateY(4px)";
        setTimeout(() => {
            if (callback) callback();
        }, 500);
    },

    fadeIn(element) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
    },

    triggerPageEntrance() {
        const main = APP_STATE.cachedDOM.mainContent;
        main.style.opacity = "0";
        requestAnimationFrame(() => {
            main.style.transition = "opacity 1.2s ease-out";
            main.style.opacity = "1";
        });
    },

    spawnToast(message, type = "success") {
        const hub = APP_STATE.cachedDOM.toastHub;
        if (!hub) return;

        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
        
        let icon = '<i class="fas fa-check-circle"></i>';
        if (type === "error") icon = '<i class="fas fa-exclamation-circle"></i>';
        if (type === "info") icon = '<i class="fas fa-info-circle"></i>';

        toast.innerHTML = `${icon} <span>${message}</span>`;
        hub.appendChild(toast);

        // Force browser layout repaint pipeline pass to trigger sliding animation cleanly
        requestAnimationFrame(() => {
            toast.classList.add("show");
        });

        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 4000);
        }, CONFIG.toastDuration);
    },

    executeReunionConfettiHub() {
        if (typeof confetti !== "function") return;
        
        const end = Date.now() + (7 * 1000); // Blast continuously for 7 seconds

        (function frame() {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#FF69B4', '#FFB6C1', '#9370DB']
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#FF69B4', '#FFB6C1', '#9370DB']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    },

    triggerHeartShowerBurst() {
        if (typeof confetti !== "function") return;
        
        confetti({
            particleCount: 140,
            spread: 80,
            origin: { y: 0.4 },
            colors: ['#FF69B4', '#FF4500', '#E6E6FA']
        });
    }
};