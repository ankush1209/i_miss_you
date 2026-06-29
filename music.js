/**
 * Until We Meet Again ❤️ - Audio Engineering Ecosystem Component
 * Resolves browser security constraints, tracks volume profiles, and switches ambient score tracks.
 */
const MusicManager = {
    init() {
        this.setupAudioElement();
        this.attachControlListeners();
    },

    setupAudioElement() {
        const player = APP_STATE.cachedDOM.audioPlayer;
        if (!player) return;

        // Load entry track seed pointer (Chura Liya)
        player.src = CONFIG.music.mainTheme;
        player.volume = parseFloat(APP_STATE.cachedDOM.volumeSlider.value) || 0.5;
        player.loop = true; // Keep the active theme looping
    },

    attachControlListeners() {
        const toggleBtn = APP_STATE.cachedDOM.musicToggle;
        const volumeSlider = APP_STATE.cachedDOM.volumeSlider;
        const player = APP_STATE.cachedDOM.audioPlayer;

        if (toggleBtn) {
            toggleBtn.addEventListener("click", () => this.togglePlayback());
        }

        if (volumeSlider) {
            volumeSlider.addEventListener("input", (e) => {
                if (player) player.volume = e.target.value;
            });
        }
    },

    togglePlayback() {
        const player = APP_STATE.cachedDOM.audioPlayer;
        if (!player) return;

        if (APP_STATE.isAudioPlaying) {
            this.pause();
        } else {
            this.play();
        }
    },

    play() {
        const player = APP_STATE.cachedDOM.audioPlayer;
        const icon = APP_STATE.cachedDOM.musicIcon;
        if (!player) return;

        player.play().then(() => {
            APP_STATE.isAudioPlaying = true;
            if (icon) {
                icon.className = "fas fa-pause";
                icon.parentElement.classList.add("playing-pulse");
            }
        }).catch(err => {
            console.warn("User engagement block intercepted audio start:", err);
            AnimationManager.spawnToast("Tap anywhere to activate music score! 🎵", "info");
        });
    },

    pause() {
        const player = APP_STATE.cachedDOM.audioPlayer;
        const icon = APP_STATE.cachedDOM.musicIcon;
        if (!player) return;

        player.pause();
        APP_STATE.isAudioPlaying = false;
        if (icon) {
            icon.className = "fas fa-music";
            icon.parentElement.classList.remove("playing-pulse");
        }
    },

    switchTrack(trackUrl) {
        const player = APP_STATE.cachedDOM.audioPlayer;
        if (!player) return;

        // Only switch if it's a different track
        if (!player.src.endsWith(trackUrl)) {
            player.src = trackUrl;
            this.play(); // Force play when a button action triggers a new song
            AnimationManager.spawnToast("Vibe check: Changing the music! 🎵", "info");
        }
    },

    injectReunionScore() {
        this.switchTrack(CONFIG.music.reunionTrack);
    }
};