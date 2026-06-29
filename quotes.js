/**
 * Until We Meet Again ❤️ - Quote Engine Manager
 * Processes rotation, semantic presentation, and non-repetitive tracking of quote data streams.
 */
const QuoteManager = {
    lastQuote: "",

    init() {
        this.renderInitialQuote();
        this.startRotationLoop();
    },

    renderInitialQuote() {
        const textElement = APP_STATE.cachedDOM.quoteText;
        if (!textElement) return;

        const initial = AppController.getRandomItem(CONFIG.quotes);
        textElement.textContent = `"${initial}"`;
        this.lastQuote = initial;

        // Set baseline GIF concurrently
        const gifElement = APP_STATE.cachedDOM.gifDisplay;
        if (gifElement) {
            gifElement.src = AppController.getRandomItem(CONFIG.gifs.waiting);
        }
    },

    startRotationLoop() {
        APP_STATE.activeTimers.quoteInterval = setInterval(() => {
            if (!APP_STATE.isCountdownFinished) {
                this.next();
            }
        }, CONFIG.quoteChangeInterval);
    },

    next() {
        const textElement = APP_STATE.cachedDOM.quoteText;
        const gifElement = APP_STATE.cachedDOM.gifDisplay;
        if (!textElement) return;

        // Filter immediately to secure new variation
        let pool = CONFIG.quotes.filter(q => q !== this.lastQuote);
        if (pool.length === 0) pool = CONFIG.quotes;

        const selection = AppController.getRandomItem(pool);
        this.lastQuote = selection;

        // Execute premium fade transitions via custom helpers
        AnimationManager.fadeOut(textElement, () => {
            textElement.textContent = `"${selection}"`;
            AnimationManager.fadeIn(textElement);
        });

        // Rotate ambient GIFs simultaneously to maintain animation flow
        if (gifElement && !APP_STATE.isCountdownFinished) {
            let gifPool = CONFIG.gifs.waiting.filter(g => g !== gifElement.src);
            if (gifPool.length === 0) gifPool = CONFIG.gifs.waiting;
            
            AnimationManager.fadeOut(gifElement, () => {
                gifElement.src = AppController.getRandomItem(gifPool);
                AnimationManager.fadeIn(gifElement);
            });
        }
    },

    forceCelebrationQuote() {
        const textElement = APP_STATE.cachedDOM.quoteText;
        const gifElement = APP_STATE.cachedDOM.gifDisplay;

        if (textElement) {
            AnimationManager.fadeOut(textElement, () => {
                textElement.textContent = `"${CONFIG.reunionPayload.quote}"`;
                AnimationManager.fadeIn(textElement);
            });
        }

        if (gifElement) {
            AnimationManager.fadeOut(gifElement, () => {
                gifElement.src = AppController.getRandomItem(CONFIG.gifs.celebration);
                AnimationManager.fadeIn(gifElement);
            });
        }
    }
};