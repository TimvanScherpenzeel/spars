// Enum
import { ENUM_AUTOPLAY_UNLOCKED } from '../enum';

// Events
import { eventEmitter } from '../events/EventEmitter';

// Features
import getBrowserType from '../features/browserFeatures/getBrowserType';
import isUserActivationSupported from '../features/browserFeatures/isUserActivationSupported';

// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes

// Muted autoplay is always allowed.

// Autoplay with sound is allowed if:
// - User has interacted with the domain (click, tap, etc.).
// - On desktop, the user's Media Engagement Index threshold has been crossed, meaning the user has previously play video with sound.
// - On mobile, the user has [added the site to their home screen].

let autoplayAllowed = false;

export const isAutoplayAllowed = (): boolean => autoplayAllowed;

/**
 * Creates a new iOS safe Web Audio context (https://github.com/Jam3/ios-safe-audio-context/blob/master/index.js)
 *
 * @param desiredSampleRate Desired sample rate of reated audio context
 */
export const createAudioContext = (desiredSampleRate = 44100): AudioContext => {
  let context = new ((window as any).AudioContext || (window as any).webkitAudioContext)();

  // https://stackoverflow.com/questions/17892345/webkit-audio-distorts-on-ios-6-iphone-5-first-time-after-power-cycling
  // Only occurs in iOS6+ devices and only when you first boot the iPhone, or play a audio/video with a different sample rate
  if (getBrowserType.isiOS && context.sampleRate !== desiredSampleRate) {
    const buffer = context.createBuffer(1, 1, desiredSampleRate);
    const dummy = context.createBufferSource();

    dummy.buffer = buffer;
    dummy.connect(context.destination);
    dummy.start(0);
    dummy.disconnect();

    // Dispose old context
    context.close();

    context = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
  }

  return context;
};

/**
 * Unlock the global Web Audio context for autoplay abilities
 *
 * @param element DOM element to attach the unlock listener to
 */
export const unlockAutoplay = (element: HTMLElement): Promise<boolean> =>
  new Promise((resolve, reject): void => {
    // https://developers.google.com/web/updates/2019/01/nic72#user-activation
    if (isUserActivationSupported && (navigator as any).userActivation.hasBeenActive === true) {
      autoplayAllowed = true;

      resolve(true);
    }

    const context = createAudioContext();

    if (context.state === 'suspended') {
      autoplayAllowed = false;

      eventEmitter.emit(ENUM_AUTOPLAY_UNLOCKED, {
        autoplayAllowed,
      });

      const unlock = (): void => {
        context
          .resume()
          .then(() => {
            element.removeEventListener('click', unlock);
            element.removeEventListener('touchstart', unlock);
            element.removeEventListener('touchend', unlock);

            autoplayAllowed = true;

            eventEmitter.emit(ENUM_AUTOPLAY_UNLOCKED, {
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
