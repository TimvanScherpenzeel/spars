export const MIN_TIMESTEP = 0.001;
export const MAX_TIMESTEP = 1;

export const isTimestampDeltaValid = (timestampDelta: number): boolean => {
  if (isNaN(timestampDelta)) {
    return false;
  }
  if (timestampDelta <= MIN_TIMESTEP) {
    return false;
  }
  if (timestampDelta > MAX_TIMESTEP) {
    return false;
  }
  return true;
};

export const isR7 = navigator.userAgent.indexOf('R7 Build') !== -1;

export const isLandscapeMode = (): boolean => {
  const rotation = window.orientation === 90 || window.orientation === -90;
  return isR7 ? !rotation : rotation;
};
