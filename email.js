/**
 * Until We Meet Again ❤️ - EmailJS API Infrastructure Dispatcher
 */
const EmailManager = {
    isSubmitting: false,

    init() {
        this.verifyAndInitializeSDK();
        this.bindEvents();
    },

    verifyAndInitializeSDK() {
        if (typeof emailjs !== "undefined") {
            emailjs.init({
                publicKey: CONFIG.emailjs.publicKey,
            });
        } else {
            console.error("Critical Dependency Failure: EmailJS network asset script could not be resolved.");
        }
    },

    bindEvents() {
        const formVideo = document.getElementById("form-video-call");
        const btnAirport = document.getElementById("btn-airport-pickup");

        if (formVideo) {
            formVideo.addEventListener("submit", (e) => this.handleFormSubmit(e, formVideo));
        }

        if (btnAirport) {
            btnAirport.addEventListener("click", () => this.triggerDirectAirportMail(btnAirport));
        }
    },

    triggerDirectAirportMail(btnElement) {
        if (this.isSubmitting) return;
        this.isSubmitting = true;

        // Switch soundtrack to Vienna Calling!
        MusicManager.switchTrack(CONFIG.music.airport);

        const originalHtml = btnElement.innerHTML;
        btnElement.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending Alert...`;
        btnElement.style.pointerEvents = "none";

        const payload = {
            booking_type: "✈️ Airport Pickup Notification",
            date: "Arrival Day (Target Countdown)",
            time: "TBD",
            submitted_at: new Date().toLocaleString()
        };

        emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.templateId, payload)
            .then(() => {
                AnimationManager.spawnToast(`Airport alert dispatched! I'll be waiting! ✈️❤️`, "success");
                AnimationManager.triggerHeartShowerBurst();
            })
            .catch(() => {
                AnimationManager.spawnToast("System connection failure. Please retry.", "error");
            })
            .finally(() => {
                this.isSubmitting = false;
                btnElement.innerHTML = originalHtml;
                btnElement.style.pointerEvents = "auto";
            });
    },

    handleFormSubmit(event, formElement) {
        event.preventDefault();
        if (this.isSubmitting) return;

        const formData = new FormData(formElement);
        const datetimeRaw = formData.get("datetime");
        const bookingType = formData.get("booking_type");

        if (!datetimeRaw) {
            AnimationManager.spawnToast("Please select a valid date and time.", "error");
            return;
        }

        const dateObj = new Date(datetimeRaw);
        const payload = {
            booking_type: bookingType,
            date: dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
            time: dateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
            submitted_at: new Date().toLocaleString()
        };

        this.setLoadingState(formElement, true);

        emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.templateId, payload)
            .then(() => {
                AnimationManager.spawnToast(`Virtual Date locked in! 💌`, "success");
                ModalManager.closeActive();
                AnimationManager.triggerHeartShowerBurst();
            })
            .catch(() => {
                AnimationManager.spawnToast("Failed to schedule. Try again.", "error");
            })
            .finally(() => {
                this.setLoadingState(formElement, false);
            });
    },

    setLoadingState(formElement, isLoading) {
        this.isSubmitting = isLoading;
        const submitBtn = formElement.querySelector(".btn-submit");
        if (!submitBtn) return;

        const textSpan = submitBtn.querySelector(".btn-text");
        const loaderSpan = submitBtn.querySelector(".btn-loader");

        if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.78";
            if (textSpan) textSpan.classList.add("hidden");
            if (loaderSpan) loaderSpan.classList.remove("hidden");
        } else {
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
            if (textSpan) textSpan.classList.remove("hidden");
            if (loaderSpan) loaderSpan.classList.add("hidden");
        }
    }
};