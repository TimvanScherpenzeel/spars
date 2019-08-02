// Audio
import { checkAutoplay } from './checkAutoplay';
import { createAudioContext } from './createAudioContext';

// Cookie
import { getCookie, setCookie } from '../cookie';

// Enum
import { ENUM } from '../enum';

// Events
import { eventEmitter, onVisibilityChange } from '../events';

// TODO: add cookie support for keeping track of audio preference upon refresh
// TODO: add support for adjusted volume (right now unmute resets to 1 instead of original volume)

class AudioManager {
  private static easeInCubic = (
    time: number,
    beginValue: number,
    changeInValue: number,
    duration: number
  ): number => {
    return changeInValue * (time /= duration) * time * time + beginValue;
  };

  private static easeOutCubic = (
    time: number,
    beginValue: number,
    changeInValue: number,
    duration: number
  ): number => {
    return changeInValue * ((time = time / duration - 1) * time * time + 1) + beginValue;
  };

  private audioSources: any = {};
  private context: AudioContext = createAudioContext();

  constructor() {
    onVisibilityChange();

    eventEmitter.on(ENUM.VISIBILITY_CHANGE, this.onVisibilityChangeHandler);
  }

  public load = (
    source: string,
    arrayBuffer: ArrayBuffer,
    options: {
      loop?: boolean;
      effects?: boolean;
    }
  ): Promise<any> => {
    return new Promise((resolve): any => {
      this.context.decodeAudioData(arrayBuffer, buffer => {
        const audioObject: any = {};

        audioObject.startedAt = 0;
        audioObject.pausedAt = 0;
        audioObject.isPlaying = false;

        audioObject.options = options;

        audioObject.context = this.context;

        audioObject.buffer = buffer;

        audioObject.audio = this.context.createBufferSource();
        audioObject.audio.buffer = buffer;
        audioObject.audio.loop = options.loop || false;
        audioObject.audio.gainNode = this.context.createGain();

        // If there are no effects connect the input node directly to the gain node
        if (!options.effects) {
          audioObject.audio.connect(audioObject.audio.gainNode);
        }

        audioObject.audio.gainNode.connect(this.context.destination);

        audioObject.play = (): void => this.play(source);
        audioObject.pause = (): void => this.pause(source);
        audioObject.stop = (): void => this.stop(source);
        audioObject.dispose = (): void => this.dispose(source);
        audioObject.mute = (): void => this.mute(source);
        audioObject.unmute = (): void => this.unmute(source);
        audioObject.setVolume = (volume: number): void => this.setVolume(source, volume);
        audioObject.isPlaying = (): boolean => this.isPlaying(source);
        audioObject.getCurrentTime = (): number => this.getCurrentTime(source);
        audioObject.getDuration = (): number => this.getDuration(source);

        this.audioSources[source] = audioObject;

        resolve(audioObject);
      });
    });
  };

  public muteAll = (fadeDuration = 2000): void => {
    this.fadeVolume(1, 0, fadeDuration);
  };

  public unmuteAll = (fadeDuration = 2000): void => {
    this.fadeVolume(0, 1, fadeDuration);
  };

  private onVisibilityChangeHandler = (event: { isVisible: boolean }): void => {
    if (event.isVisible) {
      this.unmuteAll(750);
    } else {
      this.muteAll(750);
    }
  };

  private fadeVolume = (from: number, to: number, duration: number, source?: string): void => {
    const start = performance.now();

    const tmpFrom = from;
    const tmpTo = to;

    const timer = setInterval(() => {
      const time = performance.now() - start;
      const volume =
        tmpFrom > tmpTo
          ? AudioManager.easeOutCubic(time, from, to - from, duration)
          : AudioManager.easeInCubic(time, from, to - from, duration);

      if (!source) {
        Object.keys(this.audioSources).forEach((audioSource: string) =>
          this.setVolume(audioSource, volume)
        );
      } else {
        this.audioSources[source].setVolume(volume);
      }

      if (time >= duration) {
        clearInterval(timer);
      }
    }, 1000 / 60);
  };

  private play = (source: string): void => {
    checkAutoplay().then(() => {
      if (this.audioSources[source].isPlaying === false) {
        this.audioSources[source].audio = this.context.createBufferSource();
        this.audioSources[source].audio.buffer = this.audioSources[source].buffer;
        this.audioSources[source].audio.loop = this.audioSources[source].options.loop;

        this.audioSources[source].audio.gainNode = this.context.createGain();

        // If there are no effects connect the input node directly to the gain node
        if (!this.audioSources[source].options.effects) {
          this.audioSources[source].audio.connect(this.audioSources[source].audio.gainNode);
        }

        this.audioSources[source].audio.gainNode.connect(this.context.destination);
      }

      const offset = this.audioSources[source].pausedAt;

      this.audioSources[source].audio.start(0, offset);
      this.audioSources[source].startedAt = this.context.currentTime - offset;
      this.audioSources[source].pausedAt = 0;
      this.audioSources[source].isPlaying = true;
    });
  };

  private pause = (source: string): void => {
    const elapsed = this.context.currentTime - this.audioSources[source].startedAt;

    this.stop(source);

    this.audioSources[source].pausedAt = elapsed;
  };

  private stop = (source: string): void => {
    this.audioSources[source].audio.disconnect();
    this.audioSources[source].audio.stop();
    this.audioSources[source].pausedAt = 0;
    this.audioSources[source].startedAt = 0;
    this.audioSources[source].isPlaying = false;
  };

  private dispose = (source: string): void => {
    if (this.audioSources[source].isPlaying) {
      this.stop(source);
    }

    this.audioSources[source].audio = undefined;
    this.audioSources[source].context = undefined;
    this.audioSources[source].buffer = undefined;

    delete this.audioSources[source];
  };

  private mute = (source: string, fadeDuration = 2000): void => {
    this.fadeVolume(1, 0, fadeDuration, source);
  };

  private unmute = (source: string, fadeDuration = 2000): void => {
    this.fadeVolume(0, 1, fadeDuration, source);
  };

  private setVolume = (source: string, volume: number): void => {
    this.audioSources[source].audio.gainNode.gain.value = volume;
  };

  private isPlaying = (source: string): boolean => {
    return this.audioSources[source].isPlaying;
  };

  private getCurrentTime = (source: string): number => {
    if (this.audioSources[source].pausedAt) {
      return this.audioSources[source].pausedAt;
    }

    if (this.audioSources[source].startedAt) {
      return this.context.currentTime - this.audioSources[source].startedAt;
    }

    return 0;
  };

  private getDuration = (source: string): number => {
    return this.audioSources[source].buffer.duration;
  };
}

export const audioManager = new AudioManager();