// Events
export { eventEmitter, EventEmitter } from './EventEmitter';
import onConnectionChange from './onConnectionChange';
import onKeyChange from './onKeyChange';
import onOrientationChange from './onOrientationChange';
import onVisibilityChange from './onVisibilityChange';
import onWindowSizeChange from './onWindowSizeChange';

export const registerEvents = {
  onConnectionChange,
  onKeyChange,
  onOrientationChange,
  onVisibilityChange,
  onWindowSizeChange,
};
