// Audio
import { checkAutoplay } from './checkAutoplay';
import { createAudioContext } from './createAudioContext';

// TODO: add load, play, pause, stop, mute, muteAll, unmute, unmuteAll, fadeIn, fadeOut, fadeInAll, fadeOutAll

class AudioManager {
  private audioSources: any = {};
  private context: AudioContext = createAudioContext();

  public load = (
    source: string,
    arrayBuffer: ArrayBuffer,
    options: {
      loop?: boolean;
    }
  ): Promise<any> => {
    return new Promise((resolve): any => {
      this.context.decodeAudioData(arrayBuffer, buffer => {
        this.audioSources[source] = {};

        const audioObject: any = {};

        audioObject.options = options;

        audioObject.audio = this.context.createBufferSource();
        audioObject.audio.buffer = buffer;
        audioObject.audio.loop = options.loop || false;
        audioObject.audio.gainNode = this.context.createGain();
        audioObject.audio.gainNode.connect(this.context.destination);

        audioObject.play = (): void => this.play(source);
        audioObject.pause = (): void => this.pause(source);
        audioObject.stop = (): void => this.stop(source);
        audioObject.mute = (): void => this.mute(source);
        audioObject.unmute = (): void => this.unmute(source);
        audioObject.setVolume = (volume: number): void => this.setVolume(source, volume);

        resolve(audioObject);
      });
    });
  };

  public muteAll = (): void => {
    Object.keys(this.audioSources).forEach(source => this.setVolume(source, 0));
  };

  public unmuteAll = (): void => {
    Object.keys(this.audioSources).forEach(source => this.setVolume(source, 1));
  };

  private play = (source: string): void => {
    checkAutoplay().then(() => {
      // Audio clip is allowed to be played
    });
  };

  private pause = (source: string): void => {};

  private stop = (source: string): void => {};

  private mute = (source: string): void => {
    this.audioSources[source].setVolume(0);
  };

  private unmute = (source: string): void => {
    this.audioSources[source].setVolume(1);
  };

  private setVolume = (source: string, volume: number): void => {
    this.audioSources[source].audio.gainNode.gain.value = volume;
  };
}

export const audioManager = new AudioManager();
