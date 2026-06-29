/**
 * Until We Meet Again ❤️ - Interactive Easter Egg & Shortcut Integration Layer
 * Listens for Konami codes, spatial click spams, and secret shortcut strings to trigger delightful experiences.
 */
const EasterEggManager = {
    konamiCode: ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"],
    konamiPosition: 0,
    keyboardLoveBuffer: "",
    gifClickSpamCounter: 0,

    init() {
        this.registerKeyboardShortcuts();
        this.registerSpatialClickTriggers();
    },

    registerKeyboardShortcuts() {
        window.addEventListener("keydown", (e) => {
            // Track 1: Konami Sequence Tracking Engine Block
            if (e.key === this.konamiCode[this.konamiPosition]) {
                this.konamiPosition++;
                if (this.konamiPosition === this.konamiCode.length) {
                    this.activateSecretKonamiReunion();
                    this.konamiPosition = 0;
                }
            } else {
                this.konamiPosition = 0;
            }

            // Track 2: LOVE Keyboard String Intercept Loop
            this.keyboardLoveBuffer += e.key.toLowerCase();
            if (this.keyboardLoveBuffer.endsWith("love")) {
                this.triggerSecretLoveShower();
                this.keyboardLoveBuffer = ""; // Reset segment safely
            }
            
            // Boundary enforcement to avoid infinite string stack allocation overflows
            if (this.keyboardLoveBuffer.length > 20) {
                this.keyboardLoveBuffer = this.keyboardLoveBuffer.slice(-10);
            }
        });
    },

    registerSpatialClickTriggers() {
        const gifBox = APP_STATE.cachedDOM.gifDisplay;
        if (gifBox) {
            gifBox.addEventListener("click", () => {
                this.gifClickSpamCounter++;
                if (this.gifClickSpamCounter >= 5) {
                    AnimationManager.spawnToast("You peeked at my heart! Extra kisses sent! 💋", "success");
                    AnimationManager.triggerHeartShowerBurst();
                    this.gifClickSpamCounter = 0;
                }
            });
        }

        // Track 3: Double click implementation directly over countdown numbers engine node
        const countdownBox = APP_STATE.cachedDOM.countdownCard;
        if (countdownBox) {
            countdownBox.addEventListener("dblclick", () => {
                AnimationManager.spawnToast("Secret message: I love you more than all the miles combined! ✨", "info");
                AnimationManager.triggerHeartShowerBurst();
            });
        }
    },

    activateSecretKonamiReunion() {
        AnimationManager.spawnToast("Cheat Code Unlocked: Time Travel Activated! ⏳", "success");
        setTimeout(() => {
            CountdownManager.forceInstantReunionMock();
        }, 800);
    },

    triggerSecretLoveShower() {
        AnimationManager.spawnToast("Keyboard Secret Unlocked: Sending endless love sparks! 💕", "success");
        AnimationManager.triggerHeartShowerBurst();
        
        // Cascade structural hearts generation explicitly on demand
        for (let idx = 0; idx < 12; idx++) {
            setTimeout(() => AnimationManager.createHeart(), idx * 120);
        }
    }
};