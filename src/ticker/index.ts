// Events
import { eventEmitter } from '../events/EventEmitter';

class Ticker {
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

      eventEmitter.emit('SPAR::ANIMATION_FRAME', {
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

export const ticker = new Ticker();
