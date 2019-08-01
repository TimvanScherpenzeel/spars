// Audio
import { createAudioContext } from './createAudioContext';
import { checkAutoplay } from './checkAutoplay';

// TODO: add load, play, pause, stop, mute, muteAll, unmute, unmuteAll, fadeIn, fadeOut, fadeInAll, fadeOutAll

interface IAudioManagerLoadOptions {
  autoPlay?: boolean;
  loop?: boolean;
}

class AudioManager {
  private audioSources: any = {};
  private context: AudioContext = createAudioContext();

  public load = (
    source: string,
    arrayBuffer: ArrayBuffer,
    options: IAudioManagerLoadOptions
  ): Promise<any> => {
    return new Promise((resolve): any => {
      this.context.decodeAudioData(arrayBuffer, buffer => {
        this.audioSources[source] = {};

        const audioObject: any = {};

        audioObject.options = options;
        audioObject.startedAt = 0;
        audioObject.pausedAt = 0;
        audioObject.isPlaying = false;
        audioObject.audio = this.context.createBufferSource();
        audioObject.audio.buffer = buffer;
        audioObject.audio.loop = options.loop || false;
        audioObject.audio.gainNode = this.context.createGain();
        audioObject.audio.gainNode.connect(this.context.destination);

        audioObject.play = (): void => this.play(source);
        audioObject.pause = (): void => this.pause(source);
        audioObject.stop = (): void => this.stop(source);
        audioObject.mute = (): void => this.setVolume(source, 0);
        audioObject.unmute = (): void => this.setVolume(source, 1);
        audioObject.setVolume = (volume: number): void => this.setVolume(source, volume);

        resolve(audioObject);
      });
    });
  };

  public play = (source: string): void => {
    checkAutoplay().then(() => {});
  };

  public pause = (source: string): void => {};

  public stop = (source: string): void => {};

  public setVolume = (source: string, volume: number): void => {
    this.audioSources[source].audio.gainNode.gain.value = volume;
  };

  public muteAll = (): void => {
    Object.keys(this.audioSources).forEach(source => this.setVolume(source, 0));
  };

  public unmuteAll = (): void => {
    Object.keys(this.audioSources).forEach(source => this.setVolume(source, 1));
  };
}

export const audioManager = new AudioManager();
