// Enum
import { ENUM } from '../enum';

// Events
import { eventEmitter } from './EventEmitter';

// Features
import getBrowserType from '../features/browserFeatures/getBrowserType';

// Known issues:
// TODO: Chrome Android always return 229 on `.keyCode` (see: https://stackoverflow.com/a/41517115, https://clark.engineering/input-on-android-229-unidentified-1d92105b9a04)
// TODO: Chrome Android returns `Unidentified` keycodes using `.key` (using the stock native keyboard on Samsung / Pixel) - https://live.browserstack.com/dashboard#os=android&os_version=9.0&device=Samsung+Galaxy+S10e&device_browser=chrome&zoom_to_fit=true&full_screen=true&url=http%3A%2F%2Flocalhost%3A1234%2F&speed=1&host_ports=google.com%2C80%2C0

// Normalize key event names for Internet Explorer 11
const normalizeKey = (key: string): string => {
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
      default:
        break;
    }
  }

  return key;
};

/**
 * Monitor keydown changes
 */
function onKeyDownChangeHandler(event: KeyboardEvent): void {
  eventEmitter.emit(ENUM.KEY_DOWN_CHANGE, {
    key: normalizeKey(event.key),
  });
}

/**
 * Monitor keyup changes
 */
function onKeyUpChangeHandler(event: KeyboardEvent): void {
  eventEmitter.emit(ENUM.KEY_UP_CHANGE, {
    key: normalizeKey(event.key),
  });
}

/**
 * Start listening to keydown change events
 */
export default ((element = window): void => {
  element.addEventListener('keydown', onKeyDownChangeHandler, false);
  element.addEventListener('keyup', onKeyUpChangeHandler, false);
})();
