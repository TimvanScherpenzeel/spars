export declare const isAutoplayAllowed: () => boolean;
/**
 * Creates a new iOS safe Web Audio context (https://github.com/Jam3/ios-safe-audio-context/blob/master/index.js)
 *
 * @param desiredSampleRate Desired sample rate of reated audio context
 */
export declare const createAudioContext: (desiredSampleRate?: number) => any;
/**
 * Unlock the global Web Audio context for autoplay abilities
 *
 * @param element DOM element to attach the unlock listener to
 */
export declare const unlockAutoplay: (element: HTMLElement) => Promise<{}>;
