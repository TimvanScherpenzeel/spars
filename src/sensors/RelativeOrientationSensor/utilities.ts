export const MIN_TIMESTEP = 0.001;
export const MAX_TIMESTEP = 1;

let orientation: { angle?: number } = {};

export const getOrientation = (): any => {
  if (screen.orientation) {
    orientation = screen.orientation;
  } else {
    orientation.angle = Number(window.orientation) || 0;
  }

  return orientation;
};

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
  const angle = getOrientation().angle;
  const isLandscape = angle === 90 || angle === -90;

  // R7 device appearantly has the direction switched
  return navigator.userAgent.indexOf('R7 Build') !== -1 ? !isLandscape : isLandscape;
};
