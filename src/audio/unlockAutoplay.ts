// Audio
import { createAudioContext } from './createAudioContext';

// Enum
import { ENUM } from '../enum';

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

export const isAutoplayAllowed = (): boolean => autoplayAllowed;

/**
 * Unlock the global Web Audio context for autoplay abilities
 *
 * @param element DOM element to attach the unlock listener to
 */
export const unlockAutoplay = (element?: HTMLElement): Promise<boolean> =>
  new Promise((resolve, reject): void => {
    // https://developers.google.com/web/updates/2019/01/nic72#user-activation
    if (isUserActivationSupported && (navigator as any).userActivation.hasBeenActive === true) {
      autoplayAllowed = true;

      resolve(true);
    }

    const context = createAudioContext();

    if (context.state === 'suspended') {
      autoplayAllowed = false;

      eventEmitter.emit(ENUM.AUTOPLAY_UNLOCKED, {
        autoplayAllowed,
      });

      let isOwnedElement = false;

      if (!element) {
        isOwnedElement = true;

        element = document.createElement('div');
        element.style.position = 'fixed';
        element.style.height = '100vh';
        element.style.width = '100vw';
        element.style.zIndex = '99999';

        document.body.insertBefore(element, document.body.firstChild);
      }

      const unlock = (): void => {
        context
          .resume()
          .then(() => {
            if (element) {
              element.removeEventListener('click', unlock);
              element.removeEventListener('touchstart', unlock);
              element.removeEventListener('touchend', unlock);

              if (isOwnedElement) {
                element.remove();
              }
            }

            autoplayAllowed = true;

            eventEmitter.emit(ENUM.AUTOPLAY_UNLOCKED, {
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
