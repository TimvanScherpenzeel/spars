// Events
import { eventEmitter } from './EventEmitter';

// function onPointerChange(event: PointerEvent): void {
//   eventEmitter.emit('ALPINE::POINTER_CHANGE', {
//     positionX: 0,
//     positionY: 0,
//   });
// }

function onPointerDown(event: any): void {}

function onPointerUp(event: any): void {}

function onPointerMove(event: any): void {}

/**
 * Start listening to keycode change events
 */
export const listenToPointerChange = (element = window): void => {
  element.addEventListener('touchstart', onPointerDown, false);
  element.addEventListener('touchend', onPointerUp, false);
  element.addEventListener('touchmove', onPointerMove, false);
  element.addEventListener('mousedown', onPointerDown, false);
  element.addEventListener('mouseup', onPointerUp, false);
  element.addEventListener('mousemove', onPointerMove, false);
};

/**
 * Stop listening to keycode change events
 */
export const stopListeningToPointerChange = (element = window): void => {
  element.removeEventListener('touchstart', onPointerDown, false);
  element.removeEventListener('touchend', onPointerUp, false);
  element.removeEventListener('touchmove', onPointerMove, false);
  element.removeEventListener('mousedown', onPointerDown, false);
  element.removeEventListener('mouseup', onPointerUp, false);
  element.removeEventListener('mousemove', onPointerMove, false);
};
