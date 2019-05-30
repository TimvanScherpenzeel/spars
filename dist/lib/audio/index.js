"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Events
var EventEmitter_1 = require("../events/EventEmitter");
// Features
var isUserActivationSupported_1 = __importDefault(require("../features/browserFeatures/isUserActivationSupported"));
// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
// Muted autoplay is always allowed.
// Autoplay with sound is allowed if:
// - User has interacted with the domain (click, tap, etc.).
// - On desktop, the user's Media Engagement Index threshold has been crossed, meaning the user has previously play video with sound.
// - On mobile, the user has [added the site to their home screen].
var autoplayAllowed = false;
exports.isAutoplayAllowed = function () { return autoplayAllowed; };
/**
 * Creates a new iOS safe Web Audio context (https://github.com/Jam3/ios-safe-audio-context/blob/master/index.js)
 *
 * @param desiredSampleRate Desired sample rate of reated audio context
 */
exports.createAudioContext = function (desiredSampleRate) {
    if (desiredSampleRate === void 0) { desiredSampleRate = 44100; }
    // @ts-ignore window.AudioContext and window.webkitAudioContext are not available as types
    var context = new (window.AudioContext || window.webkitAudioContext)();
    // https://stackoverflow.com/questions/17892345/webkit-audio-distorts-on-ios-6-iphone-5-first-time-after-power-cycling
    // Only occurs in iOS6+ devices and only when you first boot the iPhone, or play a audio/video with a different sample rate
    if (/(iPhone|iPad)/i.test(navigator.userAgent) && context.sampleRate !== desiredSampleRate) {
        var buffer = context.createBuffer(1, 1, desiredSampleRate);
        var dummy = context.createBufferSource();
        dummy.buffer = buffer;
        dummy.connect(context.destination);
        dummy.start(0);
        dummy.disconnect();
        // Dispose old context
        context.close();
        // @ts-ignore window.AudioContext and window.webkitAudioContext are not available as types
        context = new (window.AudioContext || window.webkitAudioContext)();
    }
    return context;
};
/**
 * Unlock the global Web Audio context for autoplay abilities
 *
 * @param element DOM element to attach the unlock listener to
 */
exports.unlockAutoplay = function (element) {
    return new Promise(function (resolve, reject) {
        // https://developers.google.com/web/updates/2019/01/nic72#user-activation
        // @ts-ignore navigator.userActivation does not yet exist as type
        if (isUserActivationSupported_1.default && navigator.userActivation.hasBeenActive === true) {
            autoplayAllowed = true;
            resolve(true);
        }
        var context = exports.createAudioContext();
        if (context.state === 'suspended') {
            autoplayAllowed = false;
            EventEmitter_1.eventEmitter.emit('ALPINE::AUTOPLAY_CHANGE', {
                autoplayAllowed: autoplayAllowed,
            });
            var unlock_1 = function () {
                context
                    .resume()
                    .then(function () {
                    element.removeEventListener('click', unlock_1);
                    element.removeEventListener('touchstart', unlock_1);
                    element.removeEventListener('touchend', unlock_1);
                    autoplayAllowed = true;
                    EventEmitter_1.eventEmitter.emit('ALPINE::AUTOPLAY_CHANGE', {
                        autoplayAllowed: autoplayAllowed,
                    });
                    resolve(true);
                })
                    .catch(function (err) {
                    reject(err);
                });
            };
            element.addEventListener('click', unlock_1, false);
            element.addEventListener('touchstart', unlock_1, false);
            element.addEventListener('touchend', unlock_1, false);
        }
        else {
            autoplayAllowed = true;
            resolve(true);
        }
    });
};
//# sourceMappingURL=index.js.map