// Features
import getBrowserType from '../features/browserFeatures/getBrowserType';

/**
 * Creates a new iOS safe Web Audio context (https://github.com/Jam3/ios-safe-audio-context/blob/master/index.js)
 *
 * @param desiredSampleRate Desired sample rate of reated audio context
 */
export const createAudioContext = (desiredSampleRate = 44100): AudioContext => {
  let context = new ((window as any).AudioContext || (window as any).webkitAudioContext)();

  // SEE: https://stackoverflow.com/questions/17892345/webkit-audio-distorts-on-ios-6-iphone-5-first-time-after-power-cycling
  // Only occurs in iOS6+ devices and only when you first boot the iPhone, or play a audio/video with a different sample rate
  if (getBrowserType.isiOS && context.sampleRate !== desiredSampleRate) {
    const buffer = context.createBuffer(1, 1, desiredSampleRate);
    const dummy = context.createBufferSource();

    dummy.buffer = buffer;
    dummy.connect(context.destination);
    dummy.start(0);
    dummy.stop(0);
    dummy.disconnect();

    // Dispose old context
    context.close();

    context = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
  }

  return context;
};
