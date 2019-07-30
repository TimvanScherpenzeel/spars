// Events
import { eventEmitter } from '../events/EventEmitter';

class Ticker {
  private isPlaying: boolean = false;
  private tickId: number = 0;

  constructor() {
    this.tick = this.tick.bind(this);
  }

  public tick(time: number): void {
    eventEmitter.emit('SPAR::ANIMATION_FRAME', {
      time,
    });

    if (this.isPlaying) {
      this.tickId = window.requestAnimationFrame(this.tick);
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
