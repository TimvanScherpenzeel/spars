// Audio
import { checkAutoplay } from './checkAutoplay';
import { createAudioContext } from './createAudioContext';

// Constants
import { AUDIO_MUTED, VISIBILITY_CHANGE } from '../constants';

// Cookies
import { deleteCookie, getCookie, setCookie } from '../cookies';

// Easings
import { easeInCubic, easeOutCubic } from '../easings';

// Events
import { eventEmitter } from '../events';

class AudioManager {
  private audioSources: any = {};
  private context: AudioContext = createAudioContext();

  /**
   * Upon initial load check the cookies for the audio manager configuration
   */
  constructor() {
    eventEmitter.on(VISIBILITY_CHANGE, this.onVisibilityChangeHandler);

    if (getCookie(AUDIO_MUTED)) {
      Object.keys(this.audioSources).forEach((audioSource: string) => {
        this.setVolume(audioSource, 0);
      });
    }
  }

  /**
   * Create a new audio object
   *
   * @param source Audio object source
   * @param arrayBuffer Audio object buffer
   * @param options Options
   */
  public load = (
    source: string,
    arrayBuffer: ArrayBuffer,
    options: {
      loop?: boolean;
      effects?: boolean;
      volume?: number;
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

        audioObject.volume = options.volume || 1;

        audioObject.audio = this.context.createBufferSource();
        audioObject.audio.buffer = buffer;
        audioObject.audio.loop = options.loop || false;
        audioObject.audio.gainNode = this.context.createGain();

        // If there are no effects connect the input node directly to the gain node
        // This allows us to control the volume of the track
        if (!options.effects) {
          audioObject.audio.connect(audioObject.audio.gainNode);
        }

        audioObject.audio.gainNode.connect(this.context.destination);

        audioObject.play = (): void => this.play(source);
        audioObject.pause = (): void => this.pause(source);
        audioObject.stop = (): void => this.stop(source);
        audioObject.dispose = (): void => this.dispose(source);
        audioObject.mute = (fadeDuration?: number): void => this.mute(source, fadeDuration);
        audioObject.unmute = (fadeDuration?: number): void => this.unmute(source, fadeDuration);
        audioObject.setVolume = (volume: number): void => this.setVolume(source, volume);
        audioObject.isPlaying = (): boolean => this.isPlaying(source);
        audioObject.getCurrentTime = (): number => this.getCurrentTime(source);
        audioObject.getDuration = (): number => this.getDuration(source);

        this.audioSources[source] = audioObject;

        resolve(audioObject);
      });
    });
  };

  /**
   * Mute all audio objects
   *
   * @param fadeDuration Time to fade when muting
   */
  public muteAll = (fadeDuration = 750): void => {
    setCookie(AUDIO_MUTED, 'true');

    Object.keys(this.audioSources).forEach((audioSource: string) => {
      this.fadeVolume(this.audioSources[audioSource].volume, 0, fadeDuration, audioSource);
    });
  };

  /**
   * Unmute all audio objects
   *
   * @param fadeDuration Time to fade when unmuting
   */
  public unmuteAll = (fadeDuration = 750): void => {
    deleteCookie(AUDIO_MUTED);

    Object.keys(this.audioSources).forEach((audioSource: string) => {
      this.fadeVolume(0, this.audioSources[audioSource].volume, fadeDuration, audioSource);
    });
  };

  /**
   * Keep track of the document visibility, mute if hidden
   *
   * @param event Visibility change event
   */
  private onVisibilityChangeHandler = (event: { isVisible: boolean }): void => {
    if (getCookie(AUDIO_MUTED)) {
      // Avoid fading back in if the user has purposely set the audio to be muted
      return undefined;
    }

    if (event.isVisible) {
      Object.keys(this.audioSources).forEach((audioSource: string) => {
        this.fadeVolume(0, this.audioSources[audioSource].volume, 750, audioSource);
      });
    } else {
      Object.keys(this.audioSources).forEach((audioSource: string) => {
        this.fadeVolume(this.audioSources[audioSource].volume, 0, 750, audioSource);
      });
    }
  };

  /**
   * Fade this audio object volume in or out
   *
   * @param from Starting volume
   * @param to Ending volume
   * @param duration Time it should take to fade
   * @param source Source of the audio object to fade
   */
  private fadeVolume = (from: number, to: number, duration: number, source: string): void => {
    const start = performance.now();

    const timer = setInterval(() => {
      const time = performance.now() - start;
      const volume =
        from > to
          ? easeOutCubic(time, from, to - from, duration)
          : easeInCubic(time, from, to - from, duration);

      this.audioSources[source].audio.gainNode.gain.value = volume;

      if (time >= duration) {
        clearInterval(timer);
      }
    }, 1000 / 60);
  };

  /**
   * Play this audio object
   *
   * @param source Audio object source
   */
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

  /**
   * Pause this audio object
   *
   * @param source Audio object source
   */
  private pause = (source: string): void => {
    const elapsed = this.context.currentTime - this.audioSources[source].startedAt;

    this.stop(source);

    this.audioSources[source].pausedAt = elapsed;
  };

  /**
   * Stop this audio object
   *
   * @param source Audio object source
   */
  private stop = (source: string): void => {
    this.audioSources[source].audio.disconnect();
    this.audioSources[source].audio.stop();
    this.audioSources[source].pausedAt = 0;
    this.audioSources[source].startedAt = 0;
    this.audioSources[source].isPlaying = false;
  };

  /**
   * Dispose this audio object
   *
   * @param source Audio object source
   */
  private dispose = (source: string): void => {
    if (this.audioSources[source].isPlaying) {
      this.stop(source);
    }

    this.audioSources[source].audio = null;
    this.audioSources[source].context = null;
    this.audioSources[source].buffer = null;

    delete this.audioSources[source];
  };

  /**
   * Mute this audio object
   *
   * @param source Audio object source
   * @param fadeDuration Time to fade when muting
   */
  private mute = (source: string, fadeDuration = 750): void => {
    this.fadeVolume(this.audioSources[source].volume, 0, fadeDuration, source);
  };

  /**
   * Unmute this audio object
   *
   * @param source Audio object source
   * @param fadeDuration Time to fade when unmuting
   */
  private unmute = (source: string, fadeDuration = 750): void => {
    this.fadeVolume(0, this.audioSources[source].volume, fadeDuration, source);
  };

  /**
   * Set the volume of this audio object
   *
   * @param source Audio object source
   * @param volume Volume of the audio object to be
   */
  private setVolume = (source: string, volume: number): void => {
    this.audioSources[source].volume = volume;
    this.audioSources[source].audio.gainNode.gain.value = volume;
  };

  /**
   * Check if this audio object is playing
   *
   * @param source Audio object source
   */
  private isPlaying = (source: string): boolean => {
    return this.audioSources[source].isPlaying;
  };

  /**
   * Get the current playtime of this audio object
   *
   * @param source Audio object source
   */
  private getCurrentTime = (source: string): number => {
    if (this.audioSources[source].pausedAt) {
      return this.audioSources[source].pausedAt;
    }

    if (this.audioSources[source].startedAt) {
      return this.context.currentTime - this.audioSources[source].startedAt;
    }

    return 0;
  };

  /**
   * Get the duration of this audio object
   *
   * @param source Audio object source
   */
  private getDuration = (source: string): number => {
    return this.audioSources[source].buffer.duration;
  };
}

export const audioManager = new AudioManager();
