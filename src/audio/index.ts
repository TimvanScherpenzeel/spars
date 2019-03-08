// Events
import { eventEmitter } from '../events/EventEmitter';

// Features
import isUserActivationSupported from '../features/browserFeatures/isUserActivationSupported';

// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes

// Muted autoplay is always allowed.

// Autoplay with sound is allowed if:
// - User has interacted with the domain (click, tap, etc.).
// - On desktop, the user's Media Engagement Index threshold has been crossed, meaning the user has previously play video with sound.
// - On mobile, the user has [added the site to their home screen].

let autoplayAllowed = false;
export const isAutoplayAllowed = () => autoplayAllowed;

/**
 * Creates a new iOS safe Web Audio context (https://github.com/Jam3/ios-safe-audio-context/blob/master/index.js)
 *
 * @param desiredSampleRate Desired sample rate of reated audio context
 */
export const createAudioContext = (desiredSampleRate = 44100) => {
  // @ts-ignore window.AudioContext and window.webkitAudioContext are not available as types
  let context = new (window.AudioContext || window.webkitAudioContext)();

  // https://stackoverflow.com/questions/17892345/webkit-audio-distorts-on-ios-6-iphone-5-first-time-after-power-cycling
  // Only occurs in iOS6+ devices and only when you first boot the iPhone, or play a audio/video with a different sample rate
  if (/(iPhone|iPad)/i.test(navigator.userAgent) && context.sampleRate !== desiredSampleRate) {
    const buffer = context.createBuffer(1, 1, desiredSampleRate);
    const dummy = context.createBufferSource();

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
export const unlockAutoplay = (element: HTMLElement) =>
  new Promise((resolve, reject) => {
    // https://developers.google.com/web/updates/2019/01/nic72#user-activation
    // @ts-ignore navigator.userActivation does not yet exist as type
    if (isUserActivationSupported && navigator.userActivation.hasBeenActive === true) {
      autoplayAllowed = true;

      resolve(true);
    }

    const context = createAudioContext();

    if (context.state === 'suspended') {
      autoplayAllowed = false;

      eventEmitter.emit('RIDGE::AUTOPLAY_CHANGE', {
        autoplayAllowed,
      });

      const unlock = () => {
        context
          .resume()
          .then(() => {
            element.removeEventListener('click', unlock);
            element.removeEventListener('touchstart', unlock);
            element.removeEventListener('touchend', unlock);

            autoplayAllowed = true;

            eventEmitter.emit('RIDGE::AUTOPLAY_CHANGE', {
              autoplayAllowed,
            });

            resolve(true);
          })
          .catch((err: Error) => {
            reject(err);
          });
      };

      element.addEventListener('click', unlock, false);
      element.addEventListener('touchstart', unlock, false);
      element.addEventListener('touchend', unlock, false);
    } else {
      autoplayAllowed = true;

      resolve(true);
    }
  });
