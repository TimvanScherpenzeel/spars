// Constants
import { FRAME_TICK } from '../constants';

// Events
import { eventEmitter } from '../events/EventEmitter';

/**
 * Create a new global requestAnimationFrame ticker
 *
 * It is more efficient to have a single requestAnimationFrame than to have multiple independent ones
 */
class FrameTicker {
  private isPlaying: boolean = false;
  private previousTickId: number = 0;
  private tickId: number = 0;

  /**
   * Fire a frame tick
   */
  public tick = (time: number): void => {
    if (this.isPlaying) {
      this.previousTickId = this.tickId;

      this.tickId = window.requestAnimationFrame(this.tick);

      eventEmitter.emit(FRAME_TICK, {
        delta: this.tickId - this.previousTickId,
        time,
      });
    }
  };

  /**
   * Start the frame ticker
   */
  public on(): void {
    this.isPlaying = true;
    window.requestAnimationFrame(this.tick);
  }

  /**
   * Stop the frame ticker
   */
  public off(): void {
    this.isPlaying = false;
    window.cancelAnimationFrame(this.tickId);
  }
}

export const frameTicker = new FrameTicker();
