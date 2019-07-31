// Audio
import { createAudioContext } from './createAudioContext';

// Types
import { IAudioObject, IAudioObjectOptions } from './types';

// TODO: add fadeIn, fadeOut, fadeInAll, fadeOutAll

class AudioManager {
  private context: AudioContext = createAudioContext();
  private sources: any = {};

  public muteAll = (): void => {
    Object.keys(this.sources).forEach(source => this.setVolume(source, 0));
  };

  public unmuteAll = (volume: number = 1): void => {
    Object.keys(this.sources).forEach(source => this.setVolume(source, volume));
  };

  public load = (
    source: string,
    arrayBuffer: ArrayBuffer,
    options: IAudioObjectOptions
  ): Promise<IAudioObject> =>
    new Promise((resolve): any => {
      this.context.decodeAudioData(arrayBuffer, buffer => {
        resolve(this.createBufferSource(source, buffer, options));
      });
    });

  public play = (source: string): void => {
    this.possiblyResume().then(() => {
      this.sources[source].isPlaying = true;

      if (this.sources[source].isStarted === false) {
        this.startAudio(source);
      }

      this.updateRate({ source, rate: this.sources[source].options.rate || 1 }, true);
    });
  };

  public pause = (source: string): void => {
    this.sources[source].isPlaying = false;

    this.updateRate({ source, rate: 0 }, false);
  };

  public setRate = (source: string, rate: number): void => {
    this.updateRate({ source, rate }, false);
  };

  public start = (source: string): void => {
    if (this.sources[source].isStarted === false) {
      this.possiblyResume().then(() => this.startAudio(source));
    }

    this.updateRate({ source, rate: this.sources[source].options.rate || 1 }, true);
    this.sources[source].isStarted = true;
    this.sources[source].isPlaying = true;
  };

  public stop = (source: string): void => {
    this.sources[source].isPlaying = false;
    this.sources[source].isStarted = false;
    this.sources[source].audio.stop();

    const options = this.sources[source].options;
    options.autoPlay = false;

    const buffer = this.sources[source].audio.buffer;

    this.createBufferSource(source, buffer, options);
  };

  public mute = (source: string): void => {
    this.setVolume(source, 0);
  };

  public unmute = (source: string, volume: number = 1): void => {
    this.setVolume(source, volume);
  };

  public setVolume = (source: string, volume: number): void => {
    this.sources[source].audio.gainNode.gain.value = volume;
  };

  public getFrequency = (source: string): number => {
    const audioObject = this.sources[source];

    audioObject.audio.analyzer.node.getByteFrequencyData(audioObject.audio.analyzer.dataArray);

    return (
      audioObject.audio.analyzer.dataArray.reduce(
        (accumulator: number, currentValue: number) => accumulator + currentValue
      ) / (audioObject.options.frequencyDivider || 128)
    );
  };

  private updateRate(options: { source: string; rate: number }, updateOptions = false): void {
    if (updateOptions) {
      this.sources[options.source].options.rate = options.rate;
    }

    this.sources[options.source].audio.playbackRate.value = options.rate;
  }

  private createBufferSource = (
    source: string,
    buffer: AudioBuffer,
    options: IAudioObjectOptions = {}
  ): IAudioObject => {
    this.sources[source] = {};

    const audioObject: IAudioObject = this.sources[source];

    audioObject.options = options;
    audioObject.isPlaying = false;
    audioObject.isStarted = false;
    audioObject.audio = this.context.createBufferSource();
    audioObject.audio.buffer = buffer;
    audioObject.audio.analyzer = {
      bufferLength: null,
      dataArray: null,
      node: this.context.createAnalyser(),
    };
    audioObject.audio.loop = options.loop || false;
    audioObject.audio.gainNode = this.context.createGain();
    audioObject.audio.connect(audioObject.audio.analyzer.node);
    audioObject.audio.analyzer.node.connect(audioObject.audio.gainNode);
    audioObject.audio.gainNode.connect(this.context.destination);
    audioObject.audio.playbackRate.value = 0;
    audioObject.audio.analyzer.bufferLength = this.sources[
      source
    ].audio.analyzer.node.frequencyBinCount;
    audioObject.audio.analyzer.dataArray = this.sources[
      source
    ].audio.analyzer.dataArray = new Uint8Array(audioObject.audio.analyzer.bufferLength);

    const isSuspended = options.isSuspended || false;

    if (isSuspended === false) {
      audioObject.isStarted = true;
      audioObject.audio.start(0, options.startAt || 0);
    }

    audioObject.audio.gainNode.gain.value = options.volume || 1;

    if (options.autoPlay) {
      this.play(source);
    }

    audioObject.getFrequency = (): number => this.getFrequency(source);
    audioObject.play = (): void => this.play(source);
    audioObject.pause = (): void => this.pause(source);
    audioObject.stop = (): void => this.stop(source);
    audioObject.mute = (): void => this.setVolume(source, 0);
    audioObject.unmute = (volume: number = 1): void => this.setVolume(source, volume);
    audioObject.volume = (volume: number = 1): void => this.setVolume(source, volume);
    audioObject.start = (): void => this.start(source);
    audioObject.setRate = (rate: number): void => this.updateRate({ source, rate }, true);

    if (options.onLoad) {
      options.onLoad(audioObject);
    }

    return audioObject;
  };

  private startAudio = (source: string): void =>
    this.sources[source].audio.start(0, this.sources[source].options.startAt || 0);

  private possiblyResume = (): Promise<void> => {
    return new Promise((resolve): void => {
      if (this.context.state === 'suspended') {
        return resolve(this.context.resume());
      }

      resolve();
    });
  };
}

export const audioManager = new AudioManager();
