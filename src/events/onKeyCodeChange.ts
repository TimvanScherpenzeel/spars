// Events
import { eventEmitter } from './EventEmitter';

// Add polyfill for keycode

// Issues:
// Chrome Android always return 229 on `.keyCode` (see: https://stackoverflow.com/a/41517115, https://clark.engineering/input-on-android-229-unidentified-1d92105b9a04)
// Chrome Android returns `Unidentified` keycodes using `.key` (using the stock native keyboard on Samsung / Pixel) - https://live.browserstack.com/dashboard#os=android&os_version=9.0&device=Samsung+Galaxy+S10e&device_browser=chrome&zoom_to_fit=true&full_screen=true&url=http%3A%2F%2Flocalhost%3A1234%2F&speed=1&host_ports=google.com%2C80%2C0
// Internet Explorer 11 uses `Up`, `Left`, `Down`, `Right` instead of `ArrowUp`, ArrowLeft`, `ArrowDown`, `ArrowRight` (Chrome, Safari, Edge, Firefox)
// Internet Explorer 11 uses `Spacebar` instead of ` ` (empty)

/**
 * Monitor keycode changes
 */
function onKeyCodeChange(event: KeyboardEvent): void {
  eventEmitter.emit('ALPINE::KEYCODE_CHANGE', {
    key: event.key,
    keyCode: event.keyCode,
  });
}

/**
 * Start listening to keycode change events
 */
export const listenToKeyCodeChange = (): void => {
  window.addEventListener('keydown', (event: KeyboardEvent) => onKeyCodeChange(event), false);
};

/**
 * Stop listening to keycode change events
 */
export const stopListeningToKeyCodeChange = (): void => {
  window.removeEventListener('keydown', (event: KeyboardEvent) => onKeyCodeChange(event), false);
};
