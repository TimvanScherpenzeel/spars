// Cookie
import { setCookie } from '../cookie';

// Global audio manager
// Asset loader is responsible for loading the audio files, audio manager should just read them
// Being able to globally mute the audio (store preference in cookie)
// Track the memory load (buffer.duration of each buffered sound)

// https://github.com/Wizcorp/AudioManager

// Sound groups (scene)

export class AudioManager {
  constructor() {}

  public mute(): void {
    setCookie('muteAudio', 'true');
  }

  public unmute(): void {
    setCookie('muteAudio', 'false');
  }

  public fadeIn(): void {}

  public fadeOut(): void {}

  public pause(): void {}

  public resume(): void {}

  public dispose(): void {}
}

const audioManager = new AudioManager();
