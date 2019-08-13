// Events
import onConnectionChange from './onConnectionChange';
import onOrientationChange from './onOrientationChange';
import onVisibilityChange from './onVisibilityChange';
import onWindowSizeChange from './onWindowSizeChange';

export { eventEmitter, EventEmitter } from './EventEmitter';

export const registerEvents = {
  onConnectionChange,
  onOrientationChange,
  onVisibilityChange,
  onWindowSizeChange,
};
