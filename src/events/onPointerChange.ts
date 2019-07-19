// Events
import { eventEmitter } from './eventEmitter';

function onPointerChange(event: PointerEvent): void {
  eventEmitter.emit('ALPINE::POINTER_CHANGE', {
    positionX: 0,
    positionY: 0,
  });
}

/**
 * Start listening to keycode change events
 */
export const listenToPointerChange = (): void => {
  window.addEventListener('pointerdown', onPointerChange, false);
};

/**
 * Stop listening to keycode change events
 */
export const stopListeningToPointerChange = (): void => {
  window.removeEventListener('pointerdown', onPointerChange, false);
};
