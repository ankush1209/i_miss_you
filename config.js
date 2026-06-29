/**
 * Until We Meet Again ❤️ - Production Application Configuration
 */
const CONFIG = {
    // Target: July 2, 2026 at 12:00 AM (Kolkata Arrival)
    countdownTarget: "2026-07-02T00:00:00", 

    // EmailJS Third Party Credentials Packet
    emailjs: {
        publicKey: "tAgbJQ3WSTlwIatq5",
        serviceId: "service_q4ts9vq",
        templateId: "template_lbhnymo"
    },

    toastDuration: 4000, 
    quoteChangeInterval: 30000, 

    heroHeadings: [
        "Counting down every heartbeat...",
        "Every tick of the clock brings you closer...",
        "Waiting for my favorite hello...",
        "The countdown to our best day...",
        "Just a little longer until I hold you...",
        "Patiently waiting for you to land..."
    ],

    gifs: {
        waiting: [
            "https://media.giphy.com/media/eKnCRTGfJsYHXgNXhL/giphy.gif",
            "https://media.giphy.com/media/YlZCtRuanxPV4h0RBU/giphy.gif",
            "https://media.giphy.com/media/aYzH8ZuH97cYWbUR9a/giphy.gif"
        ],
        celebration: [
            "https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif",
            "https://media.giphy.com/media/LmCYGls71WigR87KTS/giphy.gif",
            "https://media.giphy.com/media/142t0S2SOwM6IG/giphy.gif"
        ]
    },

    // Action-based soundtrack mapping
    music: {
        mainTheme: "assets/vienna.mp3",
        airport: "assets/waiting_for_you.mp3",
        videoCall: "assets/gulabi_aankhen_atif.mp3",
        reunionTrack: "assets/whenever_you_call.mp3"
    },

    quotes: [
        "Distance means so little when someone means so much.",
        "Every second away from you is a second spent looking forward to your hug.",
        "The sky looks beautiful today, but never as breathtaking as you.",
        "In a hundred lifetimes, in a hundred worlds, I’d find you and I’d choose you.",
        "Together again isn't a hope; it is an absolute guarantee written in my heart.",
        "True love doesn't measure distance, it measures the strength of anticipation.",
        "I miss your smile, your laugh, and the cozy peace I feel when I'm right next to you.",
        "Every day that passes brings us one sunrise closer to our airport reunion look."
    ],

    reunionPayload: {
        title: "The Wait Is Over! ❤️",
        subtitle: "The stars have aligned, the map has converged, you are finally here.",
        quote: "No more long-distance calls, no more goodbyes. We are home."
    },

    particles: {
        heartMaxCount: 22,
        sparkleMaxCount: 15,
        cloudMaxCount: 4,
        petalMaxCount: 20
    }
};