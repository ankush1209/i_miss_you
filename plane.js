/**
 * Until We Meet Again ❤️ - Flight Path Animation Controller
 * Manages responsive horizontal tracking, sine wave offsets, and physical landing state transforms.
 */
const PlaneManager = {
    plane: null,
    corridor: null,
    positionX: -120,
    speed: 0.8,
    sineAmplitude: 14,
    sineFrequency: 0.008,
    angle: 0,

    init() {
        this.plane = APP_STATE.cachedDOM.plane;
        this.corridor = APP_STATE.cachedDOM.flightCorridor;
        
        if (this.plane && !APP_STATE.isCountdownFinished) {
            this.startFlightEngine();
            this.attachInteractionLayer();
        }
    },

    startFlightEngine() {
        const runEngineLoop = () => {
            if (APP_STATE.isCountdownFinished) return; // Halt loop context when landing execution is triggered
            
            const corridorWidth = this.corridor.clientWidth || window.innerWidth;
            this.positionX += this.speed;
            
            if (this.positionX > corridorWidth + 150) {
                this.positionX = -120; // Recycle flight profile coordinates smoothly
            }

            this.angle += this.sineFrequency;
            const computedY = Math.sin(this.angle) * this.sineAmplitude + 20;

            this.plane.style.transform = `translateX(${this.positionX}px) translateY(${computedY}px) rotate(${Math.sin(this.angle) * 6}deg)`;
            
            requestAnimationFrame(runEngineLoop);
        };

        requestAnimationFrame(runEngineLoop);
    },

    attachInteractionLayer() {
        this.plane.addEventListener("click", () => {
            // Secret configuration activation
            this.speed += 1.2;
            if (this.speed > 6) this.speed = 0.8; // Cycle acceleration parameters safely
            AnimationManager.spawnToast("The plane accelerates! Flying closer to you... ✈️", "info");
            AnimationManager.triggerHeartShowerBurst();
        });
    },

    executeLandingSequence(completionCallback) {
        if (!this.plane) return;

        // Transition plane to central focus node positioning smoothly
        const corridorWidth = this.corridor.clientWidth || window.innerWidth;
        const targetX = (corridorWidth / 2) - 25;

        this.plane.style.transition = "all 2.8s cubic-bezier(0.19, 1, 0.22, 1)";
        this.plane.style.transform = `translateX(${targetX}px) translateY(15px) scale(2.2) rotate(0deg)`;
        this.plane.style.color = CONFIG.accentWarmRed;

        setTimeout(() => {
            // Trigger beautiful landing settling look drop down
            this.plane.style.transform = `translateX(${targetX}px) translateY(40px) scale(2) rotate(2deg)`;
            if (completionCallback) completionCallback();
        }, 2900);
    }
};