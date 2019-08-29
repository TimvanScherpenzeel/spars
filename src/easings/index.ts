// Utilities
import { memoize } from '../utilities';

/**
 * https://easings.net/en#easeInQuad
 */
const mEaseInQuad = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return changeInValue * (time /= duration) * time + beginValue;
};

export const easeInQuad = memoize(mEaseInQuad);

/**
 * https://easings.net/en#easeOutQuad
 */
const mEaseOutQuad = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return -changeInValue * (time /= duration) * (time - 2) + beginValue;
};

export const easeOutQuad = memoize(mEaseOutQuad);

/**
 * https://easings.net/en#easeInOutQuad
 */
const mEaseInOutQuad = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  time /= duration / 2;

  if (time < 1) {
    return (changeInValue / 2) * time * time + beginValue;
  }

  return (-changeInValue / 2) * (--time * (time - 2) - 1) + beginValue;
};

export const easeInOutQuad = memoize(mEaseInOutQuad);

/**
 * https://easings.net/en#easeInCubic
 */
const mEaseInCubic = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return changeInValue * (time /= duration) * time * time + beginValue;
};

export const easeInCubic = memoize(mEaseInCubic);

/**
 * https://easings.net/en#easeOutCubic
 */
const mEaseOutCubic = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return changeInValue * ((time = time / duration - 1) * time * time + 1) + beginValue;
};

export const easeOutCubic = memoize(mEaseOutCubic);

/**
 * https://easings.net/en#easeInOutCubic
 */
const mEaseInOutCubic = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  time /= duration / 2;

  if (time < 1) {
    return (changeInValue / 2) * time * time * time + beginValue;
  }

  return (changeInValue / 2) * ((time -= 2) * time * time + 2) + beginValue;
};

export const easeInOutCubic = memoize(mEaseInOutCubic);

/**
 * https://easings.net/en#easeInQuart
 */
const mEaseInQuart = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return changeInValue * (time /= duration) * time * time * time + beginValue;
};

export const easeInQuart = memoize(mEaseInQuart);

/**
 * https://easings.net/en#easeOutQuart
 */
const mEaseOutQuart = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return -changeInValue * ((time = time / duration - 1) * time * time * time - 1) + beginValue;
};

export const easeOutQuart = memoize(mEaseOutQuart);

/**
 * https://easings.net/en#easeInOutQuart
 */
const mEaseInOutQuart = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  time /= duration / 2;

  if (time < 1) {
    return (changeInValue / 2) * time * time * time * time + beginValue;
  }

  return (-changeInValue / 2) * ((time -= 2) * time * time * time - 2) + beginValue;
};

export const easeInOutQuart = memoize(mEaseInOutQuart);

/**
 * https://easings.net/en#easeInQuint
 */
const mEaseInQuint = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return changeInValue * (time /= duration) * time * time * time * time + beginValue;
};

export const easeInQuint = memoize(mEaseInQuint);

/**
 * https://easings.net/en#easeOutQuint
 */
const mEaseOutQuint = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return (
    changeInValue * ((time = time / duration - 1) * time * time * time * time + 1) + beginValue
  );
};

export const easeOutQuint = memoize(mEaseOutQuint);

/**
 * https://easings.net/en#easeInOutQuint
 */
const mEaseInOutQuint = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  time /= duration / 2;

  if (time < 1) {
    return (changeInValue / 2) * time * time * time * time * time + beginValue;
  }

  return (changeInValue / 2) * ((time -= 2) * time * time * time * time + 2) + beginValue;
};

export const easeInOutQuint = memoize(mEaseInOutQuint);

/**
 * https://easings.net/en#easeInSine
 */
const mEaseInSine = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return -changeInValue * Math.cos((time / duration) * (Math.PI / 2)) + changeInValue + beginValue;
};

export const easeInSine = memoize(mEaseInSine);

/**
 * https://easings.net/en#easeOutSine
 */
const mEaseOutSine = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return changeInValue * Math.sin((time / duration) * (Math.PI / 2)) + beginValue;
};

export const easeOutSine = memoize(mEaseOutSine);

/**
 * https://easings.net/en#easeInOutSine
 */
const mEaseInOutSine = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return (-changeInValue / 2) * (Math.cos((Math.PI * time) / duration) - 1) + beginValue;
};

export const easeInOutSine = memoize(mEaseInOutSine);

/**
 * https://easings.net/en#easeInExpo
 */
const mEaseInExpo = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return time === 0
    ? beginValue
    : changeInValue * Math.pow(2, 10 * (time / duration - 1)) + beginValue;
};

export const easeInExpo = memoize(mEaseInExpo);

/**
 * https://easings.net/en#easeOutExpo
 */
const mEaseOutExpo = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return time === duration
    ? beginValue + changeInValue
    : changeInValue * (-Math.pow(2, (-10 * time) / duration) + 1) + beginValue;
};

export const easeOutExpo = memoize(mEaseOutExpo);

/**
 * https://easings.net/en#easeInOutExpo
 */
const mEaseInOutExpo = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  if (time === 0) {
    return beginValue;
  }

  if (time === duration) {
    return beginValue + changeInValue;
  }

  time /= duration / 2;

  if (time < 1) {
    return (changeInValue / 2) * Math.pow(2, 10 * (time - 1)) + beginValue;
  }

  return (changeInValue / 2) * (-Math.pow(2, -10 * --time) + 2) + beginValue;
};

export const easeInOutExpo = memoize(mEaseInOutExpo);

/**
 * https://easings.net/en#easeInCirc
 */
const mEaseInCirc = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return -changeInValue * (Math.sqrt(1 - (time /= duration) * time) - 1) + beginValue;
};

export const easeInCirc = memoize(mEaseInCirc);

/**
 * https://easings.net/en#easeOutCirc
 */
const mEaseOutCirc = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return changeInValue * Math.sqrt(1 - (time = time / duration - 1) * time) + beginValue;
};

export const easeOutCirc = memoize(mEaseOutCirc);

/**
 * https://easings.net/en#easeInOutCirc
 */
const mEaseInOutCirc = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  time /= duration / 2;

  if (time < 1) {
    return (-changeInValue / 2) * (Math.sqrt(1 - time * time) - 1) + beginValue;
  }

  return (changeInValue / 2) * (Math.sqrt(1 - (time -= 2) * time) + 1) + beginValue;
};

export const easeInOutCirc = memoize(mEaseInOutCirc);
