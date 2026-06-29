/**
 * Until We Meet Again ❤️ - High Fidelity Countdown Core Engine
 */
const CountdownManager = {
    targetTimestamp: null,

    init() {
        this.parseTargetDate();
        this.startEngineLoop();
    },

    parseTargetDate() {
        this.targetTimestamp = new Date(CONFIG.countdownTarget).getTime();
        
        if (isNaN(this.targetTimestamp)) {
            console.error("Critical error: Invalid date configuration payload within config.js.");
            this.targetTimestamp = Date.now() + (2 * 86400 * 1000);
        }
    },

    startEngineLoop() {
        const executeCycle = () => {
            const now = Date.now();
            const distance = this.targetTimestamp - now;

            if (distance <= 0) {
                this.renderZeroedDisplay();
                this.triggerReunionProtocol();
            } else {
                this.calculateAndRenderMetrics(distance);
                requestAnimationFrame(executeCycle);
            }
        };
        
        requestAnimationFrame(executeCycle);
    },

    calculateAndRenderMetrics(distance) {
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        const dom = APP_STATE.cachedDOM;
        if (dom.daysText) dom.daysText.textContent = AppController.padZero(d);
        if (dom.hoursText) dom.hoursText.textContent = AppController.padZero(h);
        if (dom.minutesText) dom.minutesText.textContent = AppController.padZero(m);
        if (dom.secondsText) dom.secondsText.textContent = AppController.padZero(s);

        document.title = `${d}d ${h}h ${m}m - Until We Meet Again ❤️`;
    },

    renderZeroedDisplay() {
        const dom = APP_STATE.cachedDOM;
        if (dom.daysText) dom.daysText.textContent = "00";
        if (dom.hoursText) dom.hoursText.textContent = "00";
        if (dom.minutesText) dom.minutesText.textContent = "00";
        if (dom.secondsText) dom.secondsText.textContent = "00";
    },

    triggerReunionProtocol() {
        if (APP_STATE.isCountdownFinished) return; 
        APP_STATE.isCountdownFinished = true;

        document.title = "I Am Finally With You! ❤️";
        
        // FIXED: Added quotation marks around the CSS variable
        document.body.style.background = "var(--bg-reunion-gradient)";

        PlaneManager.executeLandingSequence(() => {
            AnimationManager.executeReunionConfettiHub();
            AnimationManager.triggerHeartShowerBurst();
            MusicManager.injectReunionScore();

            const dom = APP_STATE.cachedDOM;
            if (dom.heroTitle) dom.heroTitle.textContent = CONFIG.reunionPayload.title;
            if (dom.heroSubtitle) dom.heroSubtitle.textContent = CONFIG.reunionPayload.subtitle;

            QuoteManager.forceCelebrationQuote();

            if (dom.countdownCard) {
                dom.countdownCard.style.border = "2px solid #FF69B4";
                dom.countdownCard.style.boxShadow = "0 20px 40px rgba(255, 105, 180, 0.4)";
            }

            AnimationManager.spawnToast("Welcome home! The countdown has reached zero! ❤️", "success");
        });
    },

    forceInstantReunionMock() {
        this.targetTimestamp = Date.now() - 1000;
    }
};