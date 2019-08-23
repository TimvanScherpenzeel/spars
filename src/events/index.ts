// Events
import onConnectionChange from './onConnectionChange';
import onKeyChange from './onKeyChange';
import onOrientationChange from './onOrientationChange';
import onVisibilityChange from './onVisibilityChange';
import onWindowSizeChange from './onWindowSizeChange';

export { eventEmitter, EventEmitter } from './EventEmitter';

export const registerEvents = {
  onConnectionChange,
  onKeyChange,
  onOrientationChange,
  onVisibilityChange,
  onWindowSizeChange,
};
