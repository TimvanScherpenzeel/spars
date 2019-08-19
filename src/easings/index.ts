/**
 * https://easings.net/en#easeInQuad
 */
export const easeInQuad = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return changeInValue * (time /= duration) * time + beginValue;
};

/**
 * https://easings.net/en#easeOutQuad
 */
export const easeOutQuad = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return -changeInValue * (time /= duration) * (time - 2) + beginValue;
};

/**
 * https://easings.net/en#easeInOutQuad
 */
export const easeInOutQuad = (
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

/**
 * https://easings.net/en#easeInCubic
 */
export const easeInCubic = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return changeInValue * (time /= duration) * time * time + beginValue;
};

/**
 * https://easings.net/en#easeOutCubic
 */
export const easeOutCubic = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return changeInValue * ((time = time / duration - 1) * time * time + 1) + beginValue;
};

/**
 * https://easings.net/en#easeInOutCubic
 */
export const easeInOutCubic = (
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

/**
 * https://easings.net/en#easeInQuart
 */
export const easeInQuart = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return changeInValue * (time /= duration) * time * time * time + beginValue;
};

/**
 * https://easings.net/en#easeOutQuart
 */
export const easeOutQuart = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return -changeInValue * ((time = time / duration - 1) * time * time * time - 1) + beginValue;
};

/**
 * https://easings.net/en#easeInOutQuart
 */
export const easeInOutQuart = (
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

/**
 * https://easings.net/en#easeInQuint
 */
export const easeInQuint = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return changeInValue * (time /= duration) * time * time * time * time + beginValue;
};

/**
 * https://easings.net/en#easeOutQuint
 */
export const easeOutQuint = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return (
    changeInValue * ((time = time / duration - 1) * time * time * time * time + 1) + beginValue
  );
};

/**
 * https://easings.net/en#easeInOutQuint
 */
export const easeInOutQuint = (
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

/**
 * https://easings.net/en#easeInSine
 */
export const easeInSine = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return -changeInValue * Math.cos((time / duration) * (Math.PI / 2)) + changeInValue + beginValue;
};

/**
 * https://easings.net/en#easeOutSine
 */
export const easeOutSine = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return changeInValue * Math.sin((time / duration) * (Math.PI / 2)) + beginValue;
};

/**
 * https://easings.net/en#easeInOutSine
 */
export const easeInOutSine = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return (-changeInValue / 2) * (Math.cos((Math.PI * time) / duration) - 1) + beginValue;
};

/**
 * https://easings.net/en#easeInExpo
 */
export const easeInExpo = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return time === 0
    ? beginValue
    : changeInValue * Math.pow(2, 10 * (time / duration - 1)) + beginValue;
};

/**
 * https://easings.net/en#easeOutExpo
 */
export const easeOutExpo = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return time === duration
    ? beginValue + changeInValue
    : changeInValue * (-Math.pow(2, (-10 * time) / duration) + 1) + beginValue;
};

/**
 * https://easings.net/en#easeInOutExpo
 */
export const easeInOutExpo = (
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

/**
 * https://easings.net/en#easeInCirc
 */
export const easeInCirc = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return -changeInValue * (Math.sqrt(1 - (time /= duration) * time) - 1) + beginValue;
};

/**
 * https://easings.net/en#easeOutCirc
 */
export const easeOutCirc = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  return changeInValue * Math.sqrt(1 - (time = time / duration - 1) * time) + beginValue;
};

/**
 * https://easings.net/en#easeInOutCirc
 */
export const easeInOutCirc = (
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
