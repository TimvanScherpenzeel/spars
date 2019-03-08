// Analytics
export { registerAnalytics, recordAnalyticsEvent } from './analytics';

// // Audio
export { createAudioContext, isAutoplayAllowed, unlockAutoplay } from './audio';

// Cache
// NOTE: Currently not included because I have not found a way yet to include Workers like worker-loader in Rollup
// export { PersistentCache } from './cache';

// Config
export { config, getConfigEntry, setConfigEntry } from './config';

// Cookie
export { deleteCookie, getCookie, setCookie } from './cookie';

// Events
export {
  eventEmitter,
  EventEmitter,
  listenToConnectionChange,
  listenToVisibilityChange,
  stopListeningToConnectionChange,
  stopListeningToVisibilityChange,
} from './events';

// Features
import features from './features';
export { features };

// Loaders
export { assetLoader } from './loaders';

// Logger
export { error, log, warn } from './logger';

// Utilities
export { assert, getQueryParameters } from './utilities';
