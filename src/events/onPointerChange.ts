// Events
import { eventEmitter } from './EventEmitter';

let isPointerDown = false;
let isTouch = false;

let positionX = 0;
let positionY = 0;

const cache = {
  x: -Infinity,
  y: -Infinity,
};

const isTouchEvent = (event: any): boolean => 'TouchEvent' in window && event instanceof TouchEvent;

function onPointerDown(event: any): void {
  if (isTouchEvent(event)) {
    isTouch = true;
  } else {
    isTouch = false;
  }

  isPointerDown = true;
}

function onPointerUp(event: any): void {
  // if (isTouch) {
  // event.preventDefault();
  // }

  isPointerDown = false;
}

function onPointerMove(event: any): void {
  if (isPointerDown) {
    // event.preventDefault();

    positionX = isTouch ? event.touches[0].clientX : event.clientX;
    positionY = isTouch ? event.touches[0].clientY : event.clientY;

    if (cache.x !== positionX || cache.y !== positionY) {
      eventEmitter.emit('ALPINE::POINTER_CHANGE', {
        isTouch,
        positionX,
        positionY,
      });
    }
  }
}

// Ignore context menu events
function onContextMenu(event: any): void {
  event.preventDefault();
}

/**
 * Start listening to pointer change events
 */
export const listenToPointerChange = (element = window): void => {
  element.addEventListener('contextmenu', onContextMenu, false);
  element.addEventListener('touchstart', onPointerDown, false);
  element.addEventListener('touchend', onPointerUp, false);
  element.addEventListener('touchmove', onPointerMove, false);
  element.addEventListener('mousedown', onPointerDown, false);
  element.addEventListener('mouseup', onPointerUp, false);
  element.addEventListener('mousemove', onPointerMove, false);
};

/**
 * Stop listening to pointer change events
 */
export const stopListeningToPointerChange = (element = window): void => {
  element.removeEventListener('contextmenu', onContextMenu, false);
  element.removeEventListener('touchstart', onPointerDown, false);
  element.removeEventListener('touchend', onPointerUp, false);
  element.removeEventListener('touchmove', onPointerMove, false);
  element.removeEventListener('mousedown', onPointerDown, false);
  element.removeEventListener('mouseup', onPointerUp, false);
  element.removeEventListener('mousemove', onPointerMove, false);
};
