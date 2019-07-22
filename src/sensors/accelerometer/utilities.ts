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

export const isLandscapeMode = (): boolean => {
  return window.orientation === 90 || window.orientation === -90;
};
