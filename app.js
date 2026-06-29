/**
 * Until We Meet Again ❤️ - Core Architecture Application Controller
 * Orchestrates cross-functional lifecycle dependencies and global state tracking.
 */
const APP_STATE = {
    isLoaderComplete: false,
    isCountdownFinished: false,
    activeMusicTrackIndex: 0,
    isAudioPlaying: false,
    cachedDOM: {},
    activeTimers: {}
};

document.addEventListener("DOMContentLoaded", () => {
    AppController.init();
});

const AppController = {
    init() {
        try {
            this.buildDOMCache();
            this.setDynamicHeading(); // Sets a random heading on load
            this.executeLoaderSystem();
            this.initializeSubModules();
        } catch (error) {
            console.error("Critical architecture initialization failure:", error);
        }
    },

    buildDOMCache() {
        APP_STATE.cachedDOM = {
            loader: document.getElementById("loader"),
            loaderProgress: document.querySelector(".loader-progress"),
            mainContent: document.getElementById("main-content"),
            heroTitle: document.getElementById("main-heading"),
            heroSubtitle: document.getElementById("sub-heading"),
            countdownCard: document.getElementById("countdown-display"),
            daysText: document.getElementById("days"),
            hoursText: document.getElementById("hours"),
            minutesText: document.getElementById("minutes"),
            secondsText: document.getElementById("seconds"),
            gifDisplay: document.getElementById("dynamic-gif"),
            quoteText: document.getElementById("romantic-quote"),
            btnAirport: document.getElementById("btn-airport-pickup"),
            btnVideo: document.getElementById("btn-video-call"),
            musicToggle: document.getElementById("music-toggle"),
            musicIcon: document.getElementById("music-icon"),
            volumeSlider: document.getElementById("volume-slider"),
            audioPlayer: document.getElementById("hidden-audio-player"),
            toastHub: document.getElementById("toast-hub"),
            ambientContainer: document.getElementById("ambient-container"),
            flightCorridor: document.getElementById("flight-corridor"),
            plane: document.getElementById("romantic-plane"),
            modalVideo: document.getElementById("modal-video")
        };
    },

    setDynamicHeading() {
        const titleElement = APP_STATE.cachedDOM.heroTitle;
        if (titleElement) {
            titleElement.textContent = this.getRandomItem(CONFIG.heroHeadings);
        }
    },

    executeLoaderSystem() {
        let width = 0;
        const progressElement = APP_STATE.cachedDOM.loaderProgress;
        
        const loaderInterval = setInterval(() => {
            if (width >= 100) {
                clearInterval(loaderInterval);
                this.revealWebsite();
            } else {
                width += Math.floor(Math.random() * 12) + 4;
                if (width > 100) width = 100;
                if (progressElement) progressElement.style.width = `${width}%`;
            }
        }, 120);
    },

    revealWebsite() {
        const loader = APP_STATE.cachedDOM.loader;
        const mainContent = APP_STATE.cachedDOM.mainContent;

        if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.classList.add("hidden");
                APP_STATE.isLoaderComplete = true;
                if (mainContent) {
                    mainContent.classList.remove("hidden");
                    AnimationManager.triggerPageEntrance();
                }
            }, 800);
        }
    },

    initializeSubModules() {
        QuoteManager.init();
        MusicManager.init();
        AnimationManager.init();
        PlaneManager.init();
        CountdownManager.init();
        ModalManager.init();
        EmailManager.init();
        EasterEggManager.init();
    },

    padZero(number) {
        return String(number).padStart(2, "0");
    },

    getRandomItem(array) {
        if (!array || array.length === 0) return null;
        return array[Math.floor(Math.random() * array.length)];
    }
};