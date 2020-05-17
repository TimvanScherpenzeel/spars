/**
 * https://easings.net/en#easeInQuad
 *
 * @param time Current time
 * @param beginValue Begin value
 * @param changeInValue Change of value over time
 * @param duration Duration of the ease
 */
export const easeInQuad = (time: number, beginValue: number, changeInValue: number, duration: number): number => {
  return changeInValue * (time /= duration) * time + beginValue;
};

/**
 * https://easings.net/en#easeOutQuad
 *
 * @param time Current time
 * @param beginValue Begin value
 * @param changeInValue Change of value over time
 * @param duration Duration of the ease
 */
export const easeOutQuad = (time: number, beginValue: number, changeInValue: number, duration: number): number => {
  return -changeInValue * (time /= duration) * (time - 2) + beginValue;
};

/**
 * https://easings.net/en#easeInOutQuad
 *
 * @param time Current time
 * @param beginValue Begin value
 * @param changeInValue Change of value over time
 * @param duration Duration of the ease
 */
export const easeInOutQuad = (time: number, beginValue: number, changeInValue: number, duration: number): number => {
  time /= duration / 2;

  if (time < 1) {
    return (changeInValue / 2) * time * time + beginValue;
  }

  return (-changeInValue / 2) * (--time * (time - 2) - 1) + beginValue;
};

/**
 * https://easings.net/en#easeInCubic
 *
 * @param time Current time
 * @param beginValue Begin value
 * @param changeInValue Change of value over time
 * @param duration Duration of the ease
 */
export const easeInCubic = (time: number, beginValue: number, changeInValue: number, duration: number): number => {
  return changeInValue * (time /= duration) * time * time + beginValue;
};

/**
 * https://easings.net/en#easeOutCubic
 *
 * @param time Current time
 * @param beginValue Begin value
 * @param changeInValue Change of value over time
 * @param duration Duration of the ease
 */
export const easeOutCubic = (time: number, beginValue: number, changeInValue: number, duration: number): number => {
  return changeInValue * ((time = time / duration - 1) * time * time + 1) + beginValue;
};

/**
 * https://easings.net/en#easeInOutCubic
 *
 * @param time Current time
 * @param beginValue Begin value
 * @param changeInValue Change of value over time
 * @param duration Duration of the ease
 */
export const easeInOutCubic = (time: number, beginValue: number, changeInValue: number, duration: number): number => {
  time /= duration / 2;

  if (time < 1) {
    return (changeInValue / 2) * time * time * time + beginValue;
  }

  return (changeInValue / 2) * ((time -= 2) * time * time + 2) + beginValue;
};

/**
 * https://easings.net/en#easeInQuart
 *
 * @param time Current time
 * @param beginValue Begin value
 * @param changeInValue Change of value over time
 * @param duration Duration of the ease
 */
export const easeInQuart = (time: number, beginValue: number, changeInValue: number, duration: number): number => {
  return changeInValue * (time /= duration) * time * time * time + beginValue;
};

/**
 * https://easings.net/en#easeOutQuart
 *
 * @param time Current time
 * @param beginValue Begin value
 * @param changeInValue Change of value over time
 * @param duration Duration of the ease
 */
export const easeOutQuart = (time: number, beginValue: number, changeInValue: number, duration: number): number => {
  return -changeInValue * ((time = time / duration - 1) * time * time * time - 1) + beginValue;
};

/**
 * https://easings.net/en#easeInOutQuart
 *
 * @param time Current time
 * @param beginValue Begin value
 * @param changeInValue Change of value over time
 * @param duration Duration of the ease
 */
export const easeInOutQuart = (time: number, beginValue: number, changeInValue: number, duration: number): number => {
  time /= duration / 2;

  if (time < 1) {
    return (changeInValue / 2) * time * time * time * time + beginValue;
  }

  return (-changeInValue / 2) * ((time -= 2) * time * time * time - 2) + beginValue;
};

/**
 * https://easings.net/en#easeInQuint
 *
 * @param time Current time
 * @param beginValue Begin value
 * @param changeInValue Change of value over time
 * @param duration Duration of the ease
 */
export const easeInQuint = (time: number, beginValue: number, changeInValue: number, duration: number): number => {
  return changeInValue * (time /= duration) * time * time * time * time + beginValue;
};

/**
 * https://easings.net/en#easeOutQuint
 *
 * @param time Current time
 * @param beginValue Begin value
 * @param changeInValue Change of value over time
 * @param duration Duration of the ease
 */
export const easeOutQuint = (time: number, beginValue: number, changeInValue: number, duration: number): number => {
  return changeInValue * ((time = time / duration - 1) * time * time * time * time + 1) + beginValue;
};

/**
 * https://easings.net/en#easeInOutQuint
 *
 * @param time Current time
 * @param beginValue Begin value
 * @param changeInValue Change of value over time
 * @param duration Duration of the ease
 */
export const easeInOutQuint = (time: number, beginValue: number, changeInValue: number, duration: number): number => {
  time /= duration / 2;

  if (time < 1) {
    return (changeInValue / 2) * time * time * time * time * time + beginValue;
  }

  return (changeInValue / 2) * ((time -= 2) * time * time * time * time + 2) + beginValue;
};

/**
 * https://easings.net/en#easeInSine
 *
 * @param time Current time
 * @param beginValue Begin value
 * @param changeInValue Change of value over time
 * @param duration Duration of the ease
 */
export const easeInSine = (time: number, beginValue: number, changeInValue: number, duration: number): number => {
  return -changeInValue * Math.cos((time / duration) * (Math.PI / 2)) + changeInValue + beginValue;
};

/**
 * https://easings.net/en#easeOutSine
 *
 * @param time Current time
 * @param beginValue Begin value
 * @param changeInValue Change of value over time
 * @param duration Duration of the ease
 */
export const easeOutSine = (time: number, beginValue: number, changeInValue: number, duration: number): number => {
  return changeInValue * Math.sin((time / duration) * (Math.PI / 2)) + beginValue;
};

/**
 * https://easings.net/en#easeInOutSine
 *
 * @param time Current time
 * @param beginValue Begin value
 * @param changeInValue Change of value over time
 * @param duration Duration of the ease
 */
export const easeInOutSine = (time: number, beginValue: number, changeInValue: number, duration: number): number => {
  return (-changeInValue / 2) * (Math.cos((Math.PI * time) / duration) - 1) + beginValue;
};

/**
 * https://easings.net/en#easeInExpo
 *
 * @param time Current time
 * @param beginValue Begin value
 * @param changeInValue Change of value over time
 * @param duration Duration of the ease
 */
export const easeInExpo = (time: number, beginValue: number, changeInValue: number, duration: number): number => {
  return time === 0 ? beginValue : changeInValue * Math.pow(2, 10 * (time / duration - 1)) + beginValue;
};

/**
 * https://easings.net/en#easeOutExpo
 *
 * @param time Current time
 * @param beginValue Begin value
 * @param changeInValue Change of value over time
 * @param duration Duration of the ease
 */
export const easeOutExpo = (time: number, beginValue: number, changeInValue: number, duration: number): number => {
  return time === duration
    ? beginValue + changeInValue
    : changeInValue * (-Math.pow(2, (-10 * time) / duration) + 1) + beginValue;
};

/**
 * https://easings.net/en#easeInOutExpo
 *
 * @param time Current time
 * @param beginValue Begin value
 * @param changeInValue Change of value over time
 * @param duration Duration of the ease
 */
export const easeInOutExpo = (time: number, beginValue: number, changeInValue: number, duration: number): number => {
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
 *
 * @param time Current time
 * @param beginValue Begin value
 * @param changeInValue Change of value over time
 * @param duration Duration of the ease
 */
export const easeInCirc = (time: number, beginValue: number, changeInValue: number, duration: number): number => {
  return -changeInValue * (Math.sqrt(1 - (time /= duration) * time) - 1) + beginValue;
};

/**
 * https://easings.net/en#easeOutCirc
 *
 * @param time Current time
 * @param beginValue Begin value
 * @param changeInValue Change of value over time
 * @param duration Duration of the ease
 */
export const easeOutCirc = (time: number, beginValue: number, changeInValue: number, duration: number): number => {
  return changeInValue * Math.sqrt(1 - (time = time / duration - 1) * time) + beginValue;
};

/**
 * https://easings.net/en#easeInOutCirc
 *
 * @param time Current time
 * @param beginValue Begin value
 * @param changeInValue Change of value over time
 * @param duration Duration of the ease
 */
export const easeInOutCirc = (time: number, beginValue: number, changeInValue: number, duration: number): number => {
  time /= duration / 2;

  if (time < 1) {
    return (-changeInValue / 2) * (Math.sqrt(1 - time * time) - 1) + beginValue;
  }

  return (changeInValue / 2) * (Math.sqrt(1 - (time -= 2) * time) + 1) + beginValue;
};
