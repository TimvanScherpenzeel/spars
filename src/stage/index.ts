// Constants
import { EVENTS } from '../constants';

// Events
import { eventEmitter } from '../events';

export class Stage {
  public hold = [0, 0];
  public last = [0, 0];
  public delta = [0, 0];
  public move = [0, 0];
  public normalized = [0, 0];
  public distance: number = 0;
  public x: number;
  public y: number;
  public isTouching: boolean;

  private element: HTMLElement;
  private viewport: { width: number; height: number } = { width: 0, height: 0 };

  constructor(element: HTMLElement) {
    this.element = element;

    this.onResize = this.onResize.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  public start(): void {
    eventEmitter.on(EVENTS.WINDOW_SIZE_CHANGE, this.onResize);

    this.element.addEventListener('touchstart', this.onStart, {
      passive: false,
    });
    this.element.addEventListener('touchmove', this.onMove, {
      passive: false,
    });
    this.element.addEventListener('touchend', this.onEnd, {
      passive: false,
    });
    this.element.addEventListener('touchcancel', this.onEnd, {
      passive: false,
    });

    this.element.addEventListener('mousedown', this.onStart);
    this.element.addEventListener('mousemove', this.onMove);
    this.element.addEventListener('mouseup', this.onEnd);
    this.element.addEventListener('contextmenu', this.onEnd);
  }

  public stop(): void {
    eventEmitter.off(EVENTS.WINDOW_SIZE_CHANGE, this.onResize);

    this.element.removeEventListener('touchstart', this.onStart);
    this.element.removeEventListener('touchmove', this.onMove);
    this.element.removeEventListener('touchend', this.onEnd);
    this.element.removeEventListener('touchcancel', this.onEnd);

    this.element.removeEventListener('mousedown', this.onStart);
    this.element.removeEventListener('mousemove', this.onMove);
    this.element.removeEventListener('mouseup', this.onEnd);
    this.element.removeEventListener('contextmenu', this.onEnd);
  }

  private onStart(event): void {
    const pointer = this.convertEvent(event);

    this.isTouching = true;

    this.x = pointer.x;
    this.y = pointer.y;

    this.hold[0] = pointer.x;
    this.hold[1] = pointer.y;

    this.last[0] = pointer.x;
    this.last[1] = pointer.y;

    this.delta[0] = 0;
    this.delta[1] = 0;

    this.move[0] = 0;
    this.move[1] = 0;

    this.normalized[0] = (this.x / this.viewport.width) * 2 - 1;
    this.normalized[1] = -(this.y / this.viewport.height) * 2 + 1;
  }

  private onMove(event): void {
    const pointer = this.convertEvent(event);

    if (this.isTouching) {
      this.move[0] = pointer.x - this.hold[0];
      this.move[1] = pointer.y - this.hold[1];
    }

    this.x = pointer.x;
    this.y = pointer.y;

    this.delta[0] = pointer.x - this.last[0];
    this.delta[1] = pointer.y - this.last[1];

    this.distance += Math.sqrt(this.delta[0] * this.delta[0] + this.delta[1] * this.delta[1]);

    this.normalized[0] = (this.x / this.viewport.width) * 2 - 1;
    this.normalized[1] = -(this.y / this.viewport.height) * 2 + 1;
  }

  private onEnd(event): void {
    this.isTouching = false;
    this.move[0] = 0;
    this.move[1] = 0;
  }

  private onResize(event): void {
    this.viewport.width = event.windowWidth;
    this.viewport.height = event.windowHeight;
  }

  private convertEvent(event): any {
    event.preventDefault();
    event.stopPropagation();

    const pointer = {
      x: 0,
      y: 0,
    };

    if (!event) {
      return pointer;
    }

    if (event.windowsPointer) {
      return event;
    }

    if (event.touches || event.changedTouches) {
      if (event.touches.length) {
        pointer.x = event.touches[0].pageX;
        pointer.y = event.touches[0].pageY;
      } else {
        pointer.x = event.changedTouches[0].pageX;
        pointer.y = event.changedTouches[0].pageY;
      }
    } else {
      pointer.x = event.pageX;
      pointer.y = event.pageY;
    }

    pointer.x = Math.min(this.viewport.width, Math.max(0, pointer.x));
    pointer.y = Math.min(this.viewport.height, Math.max(0, pointer.y));

    return pointer;
  }
}
