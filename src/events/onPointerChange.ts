// Events
import { eventEmitter } from './EventEmitter';

let isPointerDown = false;
let isTouch = false;

function onPointerDown(event: any): void {
  if (event.clientX !== undefined) {
    isTouch = false;
  } else {
    isTouch = true;
  }

  isPointerDown = true;
}

function onPointerUp(event: any): void {
  isPointerDown = false;
}

function onPointerMove(event: any): void {
  if (isPointerDown) {
    eventEmitter.emit('ALPINE::POINTER_CHANGE', {
      isTouch,
      positionX: isTouch ? event.touches[0].clientX : event.clientX,
      positionY: isTouch ? event.touches[0].clientY : event.clientY,
    });
  }
}

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
