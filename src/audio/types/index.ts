export interface IAudioObjectOptions {
  frequencyDivider?: number;
  loop?: boolean;
  isSuspended?: boolean;
  startAt?: number;
  volume?: number;
  rate?: number;
  autoPlay?: boolean;
  onLoad?: (audioObject: IAudioObject) => void;
}

export interface IAudioObject {
  options: IAudioObjectOptions;
  isPlaying: boolean;
  isStarted: boolean;
  audio: any;

  getFrequency: () => number;
  play: () => void;
  pause: () => void;
  stop: () => void;
  mute: () => void;
  unmute: () => void;
  volume: () => void;
  start: () => void;
  setRate: (rate: number) => void;
}
