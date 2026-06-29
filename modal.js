/**
 * Until We Meet Again ❤️ - Modal Window Architecture Engine
 */
const ModalManager = {
    activeModal: null,

    init() {
        this.bindEvents();
    },

    bindEvents() {
        const dom = APP_STATE.cachedDOM;

        if (dom.btnVideo) {
            dom.btnVideo.addEventListener("click", () => {
                // Switch soundtrack to 60s English Pop!
                MusicManager.switchTrack(CONFIG.music.videoCall);
                this.open(dom.modalVideo);
            });
        }

        document.querySelectorAll("[data-close-modal]").forEach(btn => {
            btn.addEventListener("click", () => this.closeActive());
        });

        document.querySelectorAll(".modal-overlay").forEach(overlay => {
            overlay.addEventListener("click", (e) => {
                if (e.target === overlay) this.closeActive();
            });
        });

        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && this.activeModal) {
                this.closeActive();
            }
        });
    },

    open(modalElement) {
        if (!modalElement) return;

        this.closeActive(); 
        this.activeModal = modalElement;
        
        modalElement.classList.add("active");
        modalElement.setAttribute("aria-hidden", "false");

        const primaryInput = modalElement.querySelector("input");
        if (primaryInput) {
            setTimeout(() => primaryInput.focus(), 150);
        }
    },

    closeActive() {
        if (!this.activeModal) return;

        this.activeModal.classList.remove("active");
        this.activeModal.setAttribute("aria-hidden", "true");
        
        const form = this.activeModal.querySelector("form");
        if (form) form.reset();

        this.activeModal = null;
    }
};