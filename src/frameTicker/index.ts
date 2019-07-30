// Enum
import { ENUM } from '../enum';

// Events
import { eventEmitter } from '../events/EventEmitter';

class FrameTicker {
  private isPlaying: boolean = false;
  private previousTickId: number = 0;
  private tickId: number = 0;

  constructor() {
    this.tick = this.tick.bind(this);
  }

  public tick(time: number): void {
    if (this.isPlaying) {
      this.previousTickId = this.tickId;

      this.tickId = window.requestAnimationFrame(this.tick);

      eventEmitter.emit(ENUM.FRAME_TICK, {
        delta: this.tickId - this.previousTickId,
        time,
      });
    }
  }

  public on(): void {
    this.isPlaying = true;
    window.requestAnimationFrame(this.tick);
  }

  public off(): void {
    this.isPlaying = false;
    window.cancelAnimationFrame(this.tickId);
  }
}

export const frameTicker = new FrameTicker();
