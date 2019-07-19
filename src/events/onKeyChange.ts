// Features
import getBrowserType from '../features/browserFeatures/getBrowserType';

// Events
import { eventEmitter } from './EventEmitter';

// Known issues:
// TODO: Chrome Android always return 229 on `.keyCode` (see: https://stackoverflow.com/a/41517115, https://clark.engineering/input-on-android-229-unidentified-1d92105b9a04)
// TODO: Chrome Android returns `Unidentified` keycodes using `.key` (using the stock native keyboard on Samsung / Pixel) - https://live.browserstack.com/dashboard#os=android&os_version=9.0&device=Samsung+Galaxy+S10e&device_browser=chrome&zoom_to_fit=true&full_screen=true&url=http%3A%2F%2Flocalhost%3A1234%2F&speed=1&host_ports=google.com%2C80%2C0

/**
 * Monitor key changes
 */
function onKeyChange(event: KeyboardEvent): void {
  let { key } = event;

  // Normalize key event names for Internet Explorer 11
  if (getBrowserType.isInternetExplorer) {
    switch (key) {
      case 'Up':
        key = 'ArrowUp';
        break;
      case 'Left':
        key = 'ArrowLeft';
        break;
      case 'Right':
        key = 'ArrowRight';
        break;
      case 'Down':
        key = 'ArrowDown';
        break;
      case 'Esc':
        key = 'Escape';
        break;
      case 'Del':
        key = 'Delete';
        break;
      case 'Spacebar':
        key = ' ';
        break;
    }
  }

  eventEmitter.emit('ALPINE::KEY_CHANGE', {
    key,
  });
}
/**
 * Start listening to keycode change events
 */
export const listenToKeyChange = (): void => {
  window.addEventListener('keydown', onKeyChange, false);
};

/**
 * Stop listening to keycode change events
 */
export const stopListeningToKeyChange = (): void => {
  window.removeEventListener('keydown', onKeyChange, false);
};
