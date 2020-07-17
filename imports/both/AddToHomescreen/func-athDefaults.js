/**
 * @summary Default options list.
 *
 * @memberof PWA
 * @function athDefaults
 * @locus Client
 *
 * @param {String} appID
 *
 * @return {Object} - ath defaults
 *
 */

export const defaultPrompt = {
    title: "Install this PWA?",
    src: "/pwa/pwa-logo-50x50.png",
    cancelMsg: "Not Now",
    installMsg: "Install"
};

export const defaultSession = {
    lastDisplayTime: 0, // last time we displayed the message
    returningVisitor: false, // is this the first time you visit
    displayCount: 0, // number of times the message has been shown
    optedout: false, // has the user opted out
    added: false, // has been actually added to the homescreen
    sessions: 0,
    nextSession: 0 //tie this to nextPrime Counter
};


export const athDefaults = {
    appID: "com.love2dev.addtohome", // local storage name (no need to change)
    appName: "Progressive Web App",
    debug: false, // override browser checks
    logging: false, // log reasons for showing or not showing to js console; defaults to true when debug is true
    modal: false, // prevent further actions until the message is closed
    mandatory: false, // you can't proceed if you don't add the app to the homescreen
    autostart: true, // show the message automatically
    skipFirstVisit: false, // show only to returning visitors (ie: skip the first time you visit)
    minSessions: 0, //show only after minimum number of page views
    startDelay: 1, // display the message after that many seconds from page load
    lifespan: 15, // life of the message in seconds
    displayPace: 1440, // minutes before the message is shown again (0: display every time, default 24 hours)
    displayNextPrime: false,
    mustShowCustomPrompt: false,
    maxDisplayCount: 0, // absolute maximum number of times the message will be shown to the user (0: no limit)
    validLocation: [], // list of pages where the message will be shown (array of regexes)
    onInit: null, // executed on instance creation
    onShow: null, // executed when the message is shown
    onAdd: null, // when the application is launched the first time from the homescreen (guesstimate)
    onInstall: null,
    onCancel: null,
    customCriteria: null,
    manualPrompt: null,
    customPrompt: {}, //allow customization of prompt content
    athWrapper: ".ath-container",
    athGuidance: "ath-guidance",
    showClasses: [ "animated", "d-flex" ],
    showClass: "d-flex",
    hideClass: "d-none",
    promptDlg: {
        title: ".ath-banner-title",
        body: ".ath-banner",
        logo: ".ath-prompt-logo",
        cancel: ".btn-cancel-ath",
        install: ".btn-install-ath",
        action: {
            "ok": "Install",
            "cancel": "Not Now"
        }
    },
    prompt: {
        "native": {
            targetUrl: undefined,
            showClasses: [ "fadeInUp", "right-banner" ],
            action: {
                "ok": "Install",
                "cancel": "Not Now"
            }
        },
        "edge": {
            targetUrl: undefined,
            showClasses: [ "edge-wrapper",
                "animated", "fadeIn", "d-block", "right-banner"
            ],
            imgs: [ {
                src: "/pwa/edge-a2hs-icon.png",
                alt: "Tap the Add to Homescreen Icon"
            } ]
        },
        "chromium": {
            targetUrl: "guideance/chrome/android/",
            showClasses: [ "chromium-wrapper",
                "animated", "fadeIn", "d-block", "right-banner"
            ],
            imgs: [ {
                src: "/pwa/chromium-guidance.png",
                alt: "Tap the Add to Homescreen Icon"
            } ]
        },
        "iphone": {
            targetUrl: "guideance/iphone/",
            showClasses: [ "iphone-wrapper", "animated", "fadeIn", "d-block" ],

            imgs: [
                {
                    src: "/pwa/MakeSafariBookmark.jpg",
                    alt: "Tap the Share Icon"
                }]

            /*
            imgs: [
                {
                    src: "/pwa/ios-safari-share-button-highlight.jpg",
                    alt: "Tap the Share Icon"
                },
                {
                    src: "/pwa/iphone-a2hs-swipe-to-right.jpg",
                    classes: [ "animated", "fadeIn", "overlay-1",
                        "delay-2s"
                    ],
                    alt: "Swipe to the right"
                },
                {
                    src: "/pwa/iphone-a2hs-icon-highlight.jpg",
                    classes: [ "animated", "fadeIn", "overlay-2",
                        "delay-4s"
                    ],
                    alt: "Tap the Add to Homescreen Icon"
                }
            ]

             */
        },
        "ipad": {
            targetUrl: undefined,
            showClasses: [ "ipad-wrapper", "animated", "fadeInUp", "d-block" ],
            imgs: [ {
                src: "/pwa/safari-ipad-share-a2hs-right.jpg",
                alt: "Tap the Add to Homescreen Icon"
            } ]
        },
        "firefox": {
            targetUrl: undefined,
            showClasses: [ "firefox-wrapper",
                "animated", "fadeIn", "d-block"
            ],
            imgs: [ {
                src: "/pwa/firefox-a2hs-icon.png",
                alt: "Tap the Add to Homescreen Icon"
            } ]
        },
        "samsung": {
            targetUrl: undefined,
            showClasses: [ "samsung-wrapper",
                "animated", "fadeIn", "d-block"
            ],
            imgs: [ {
                src: "/pwa/samsung-internet-a2hs-icon.png",
                alt: "Tap the Add to Homescreen Icon"
            } ]
        },
        "opera": {
            targetUrl: undefined,
            showClasses: [ "opera-home-screen-wrapper",
                "animated", "fadeIn", "d-block"
            ],
            imgs: [ {
                src: "/pwa/opera-add-to-homescreen.png",
                alt: "Tap the Add to Homescreen Icon"
            } ]
        }
    }
}
