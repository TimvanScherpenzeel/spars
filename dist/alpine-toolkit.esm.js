/**
 * Tests for requestIdleCallback support
 */
// @ts-ignore missing type definition
var isRequestIdleCallbackSupported = (function () { return !!window.requestIdleCallback || false; })();

/**
 * Checks if the user has DoNotTrack enabled
 * This is useful for adhering to user wishes regarding analytics tracking
 */
var isDoNotTrackEnabled = (function () {
    var doNotTrack = navigator.doNotTrack || false;
    if (!!doNotTrack && doNotTrack !== 'unspecified') {
        return true;
    }
    return false;
})();

/**
 * Acts like a global configuration object but avoids attaching itself to the window object
 */
var config = {
    LOG_VERBOSITY: 0,
};
/**
 * Gets a config entry
 *
 * @param key Key of config entry to get
 */
// @ts-ignore implicit any, has no index structure
var getConfigEntry = function (key) { return config[key]; };
/**
 * Sets a config entry
 *
 * @param key Key of config entry to set
 * @param value Value of config entry to set
 */
var setConfigEntry = function (key, value) {
    // @ts-ignore implicit any, has no index structure
    return (config[key] = value);
};

// Config
/**
 * console.error() a message to the console in a prefixed format
 * Only logs when the low, medium or highest verbosity level is set
 * Gets disabled if verbosity is set to 0 (usually the case in production)
 *
 * @param message Message to error in the console
 */
var error = function (message) {
    return getConfigEntry('LOG_VERBOSITY') >= 1 && console.error("Alpine :: [ERROR] -> " + message);
};

// Config
/**
 * console.log() a message to the console in a prefixed format
 * Only logs when the highest verbosity level is set
 *
 * @param message Message to log in the console
 */
var log = function (message) {
    return getConfigEntry('LOG_VERBOSITY') >= 3 && console.log("Alpine :: [LOG] -> " + message);
};

// Config
/**
 * console.warn() a message to the console in a prefixed format
 * Only logs when the medium or highest verbosity level is set
 *
 * @param message Message to warn in the console
 */
var warn = function (message) {
    return getConfigEntry('LOG_VERBOSITY') >= 2 && console.warn("Alpine :: [WARN] -> " + message);
};

// Logger

// Features
/**
 * Registers Google Analytics tracking snippet
 *
 * @param trackingIdentifier Tracking identifier in format: UA-XXXX-YY
 */
var registerAnalytics = function (trackingIdentifier) {
    if (trackingIdentifier === undefined ||
        !/^ua-\d{4,9}-\d{1,4}$/i.test(trackingIdentifier.toString())) {
        // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#trackingId
        warn('Analytics -> TrackingIdentifier expected to be of format "UA-XXXX-YY"');
    }
    if (!isDoNotTrackEnabled) {
        // Default async GA snippet as provided by Google
        // tslint:disable-next-line:only-arrow-functions
        (function (i, s, o, g, r, a, m) {
            // @ts-ignore Google Analytics snippet
            i.GoogleAnalyticsObject = r;
            // @ts-ignore Google Analytics snippet
            (i[r] =
                // @ts-ignore Google Analytics snippet
                i[r] ||
                    // tslint:disable-next-line:only-arrow-functions
                    function () {
                        // @ts-ignore Google Analytics snippet
                        (i[r].q = i[r].q || []).push(arguments);
                    }),
                // @ts-ignore Google Analytics snippet
                (i[r].l = 1 * new Date());
            // @ts-ignore Google Analytics snippet
            (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
            // @ts-ignore Google Analytics snippet
            a.async = 1;
            // @ts-ignore Google Analytics snippet
            a.src = g;
            // @ts-ignore Google Analytics snippet
            m.parentNode.insertBefore(a, m);
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
        // @ts-ignore Google Analytics snippet
        ga('create', "" + trackingIdentifier, 'auto');
        // @ts-ignore Google Analytics snippet
        ga('send', 'pageview');
    }
    else {
        warn('Analytics -> "DoNotTrack" setting is enabled, avoided installing the analytics snippet');
    }
};
/**
 * Record a Google event
 *
 * @param record A valid analytics record object
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/events
 * {
 *   hitType: 'event',
 *   eventCategory: 'string',
 *   eventAction: 'play',
 *   eventLabel: 'Fall Campaign',
 * }
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/pages
 * {
 *   hitType: 'pageview',
 *   page: location.pathname,
 * }
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/social-interactions
 * {
 *   hitType: 'social',
 *   socialNetwork: 'Facebook',
 *   socialAction: 'like',
 *   socialTarget: window.location.hostname,
 * }
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings
 * {
 *   hitType: 'timing',
 *   timingCategory: 'JS Dependencies',
 *   timingVar: 'load',
 *   timingValue: Math.round(performance.now());
 * }
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions
 * {
 *   hitType: 'exception',
 *   exDescription: err.message,
 *   exFatal: false,
 * }
 */
var recordAnalyticsEvent = function (record) {
    if (record === void 0) { record = {}; }
    // @ts-ignore Google Analytics snippet
    if (window.ga !== undefined && typeof window.ga === 'function') {
        if (Object.keys(record).length <= 0) {
            warn('Analytics -> Record cannot be empty');
            return;
        }
        var callback = function () {
            // @ts-ignore Google Analytics snippet
            window.ga('send', record);
        };
        if (isRequestIdleCallbackSupported) {
            // @ts-ignore missing type definition
            window.requestIdleCallback(callback);
        }
        else {
            callback();
        }
    }
};

//      
// An event handler can take an optional event argument
// and should not return a value
                                          
                                                               

// An array of all currently registered event handlers for a type
                                            
                                                            
// A map of event types and their corresponding event handlers.
                        
                                 
                                   
  

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
function mitt(all                 ) {
	all = all || Object.create(null);

	return {
		/**
		 * Register an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to listen for, or `"*"` for all events
		 * @param  {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		on: function on(type        , handler              ) {
			(all[type] || (all[type] = [])).push(handler);
		},

		/**
		 * Remove an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
		 * @param  {Function} handler Handler function to remove
		 * @memberOf mitt
		 */
		off: function off(type        , handler              ) {
			if (all[type]) {
				all[type].splice(all[type].indexOf(handler) >>> 0, 1);
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, `"*"` handlers are invoked after type-matched handlers.
		 *
		 * @param {String} type  The event type to invoke
		 * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
		 * @memberOf mitt
		 */
		emit: function emit(type        , evt     ) {
			(all[type] || []).slice().map(function (handler) { handler(evt); });
			(all['*'] || []).slice().map(function (handler) { handler(type, evt); });
		}
	};
}

// Vendor
/**
 * Inspired by https://github.com/developit/mitt
 */
var eventEmitter = new mitt();

/**
 * Tests for UserActivation support
 */
var isUserActivationSupported = (function () {
    try {
        // @ts-ignore missing type definition
        return !!navigator.userActivation;
    }
    catch (err) {
        return false;
    }
})();

// Events
// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
// Muted autoplay is always allowed.
// Autoplay with sound is allowed if:
// - User has interacted with the domain (click, tap, etc.).
// - On desktop, the user's Media Engagement Index threshold has been crossed, meaning the user has previously play video with sound.
// - On mobile, the user has [added the site to their home screen].
var autoplayAllowed = false;
var isAutoplayAllowed = function () { return autoplayAllowed; };
/**
 * Creates a new iOS safe Web Audio context (https://github.com/Jam3/ios-safe-audio-context/blob/master/index.js)
 *
 * @param desiredSampleRate Desired sample rate of reated audio context
 */
var createAudioContext = function (desiredSampleRate) {
    if (desiredSampleRate === void 0) { desiredSampleRate = 44100; }
    // @ts-ignore window.AudioContext and window.webkitAudioContext are not available as types
    var context = new (window.AudioContext || window.webkitAudioContext)();
    // https://stackoverflow.com/questions/17892345/webkit-audio-distorts-on-ios-6-iphone-5-first-time-after-power-cycling
    // Only occurs in iOS6+ devices and only when you first boot the iPhone, or play a audio/video with a different sample rate
    if (/(iPhone|iPad)/i.test(navigator.userAgent) && context.sampleRate !== desiredSampleRate) {
        var buffer = context.createBuffer(1, 1, desiredSampleRate);
        var dummy = context.createBufferSource();
        dummy.buffer = buffer;
        dummy.connect(context.destination);
        dummy.start(0);
        dummy.disconnect();
        // Dispose old context
        context.close();
        // @ts-ignore window.AudioContext and window.webkitAudioContext are not available as types
        context = new (window.AudioContext || window.webkitAudioContext)();
    }
    return context;
};
/**
 * Unlock the global Web Audio context for autoplay abilities
 *
 * @param element DOM element to attach the unlock listener to
 */
var unlockAutoplay = function (element) {
    return new Promise(function (resolve, reject) {
        // https://developers.google.com/web/updates/2019/01/nic72#user-activation
        // @ts-ignore navigator.userActivation does not yet exist as type
        if (isUserActivationSupported && navigator.userActivation.hasBeenActive === true) {
            autoplayAllowed = true;
            resolve(true);
        }
        var context = createAudioContext();
        if (context.state === 'suspended') {
            autoplayAllowed = false;
            eventEmitter.emit('ALPINE::AUTOPLAY_CHANGE', {
                autoplayAllowed: autoplayAllowed,
            });
            var unlock_1 = function () {
                context
                    .resume()
                    .then(function () {
                    element.removeEventListener('click', unlock_1);
                    element.removeEventListener('touchstart', unlock_1);
                    element.removeEventListener('touchend', unlock_1);
                    autoplayAllowed = true;
                    eventEmitter.emit('ALPINE::AUTOPLAY_CHANGE', {
                        autoplayAllowed: autoplayAllowed,
                    });
                    resolve(true);
                })
                    .catch(function (err) {
                    reject(err);
                });
            };
            element.addEventListener('click', unlock_1, false);
            element.addEventListener('touchstart', unlock_1, false);
            element.addEventListener('touchend', unlock_1, false);
        }
        else {
            autoplayAllowed = true;
            resolve(true);
        }
    });
};

class Store {
    constructor(dbName = 'keyval-store', storeName = 'keyval') {
        this.storeName = storeName;
        this._dbp = new Promise((resolve, reject) => {
            const openreq = indexedDB.open(dbName, 1);
            openreq.onerror = () => reject(openreq.error);
            openreq.onsuccess = () => resolve(openreq.result);
            // First time setup: create an empty object store
            openreq.onupgradeneeded = () => {
                openreq.result.createObjectStore(storeName);
            };
        });
    }
    _withIDBStore(type, callback) {
        return this._dbp.then(db => new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, type);
            transaction.oncomplete = () => resolve();
            transaction.onabort = transaction.onerror = () => reject(transaction.error);
            callback(transaction.objectStore(this.storeName));
        }));
    }
}
let store;
function getDefaultStore() {
    if (!store)
        store = new Store();
    return store;
}
function get(key, store = getDefaultStore()) {
    let req;
    return store._withIDBStore('readonly', store => {
        req = store.get(key);
    }).then(() => req.result);
}
function set(key, value, store = getDefaultStore()) {
    return store._withIDBStore('readwrite', store => {
        store.put(value, key);
    });
}
function del(key, store = getDefaultStore()) {
    return store._withIDBStore('readwrite', store => {
        store.delete(key);
    });
}
function clear(store = getDefaultStore()) {
    return store._withIDBStore('readwrite', store => {
        store.clear();
    });
}
function keys(store = getDefaultStore()) {
    const keys = [];
    return store._withIDBStore('readonly', store => {
        // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
        // And openKeyCursor isn't supported by Safari.
        (store.openKeyCursor || store.openCursor).call(store).onsuccess = function () {
            if (!this.result)
                return;
            keys.push(this.result.key);
            this.result.continue();
        };
    }).then(() => keys);
}

/**
 * Test an assertion for its truthiness
 *
 * @param condition Assertion condition
 * @param message Error message if the assertion has failed
 */
var assert = function (condition, message) {
    if (!condition) {
        throw new Error("Assert -> Assertion failed" + (message ? ": " + message : ''));
    }
};

// Vendor
/**
 * Check if key is allowed to be stored in IndexedDB
 *
 * @param key Key to validate
 */
var isAllowedAsKey = function (key) {
    if (typeof key === 'number' || typeof key === 'string') {
        return true;
    }
    if (key === 'object' && key) {
        if (Array.isArray(key) ||
            'setUTCFullYear' in key ||
            (typeof ArrayBuffer === 'function' && ArrayBuffer.isView(key)) ||
            ('byteLength' in key && 'length' in key)) {
            return true;
        }
    }
    return false;
};
/**
 * PersistentCache is a simple { key: value } cache that is made persistent using IndexedDB.
 *
 * IndexedDB is promisified by `idb-keyval`, a small abstraction around the IndexedDB API.
 */
var PersistentCache = /** @class */ (function () {
    /**
     * Sets various configuration options
     *
     * @param databaseName Name of the persistent cache database
     * @param storeName Name of the persistent cache store
     */
    function PersistentCache(databaseName, storeName) {
        if (databaseName === void 0) { databaseName = 'persistent-cache-db'; }
        if (storeName === void 0) { storeName = 'persistent-cache-store'; }
        // Back persistent cache with in-memory cache in order to maintain functionality
        // in case IndexedDB is not available (private browsing mode)
        this.memoryCache = new Map();
        this.store = new Store(databaseName, storeName);
    }
    /**
     * Sets a { key: value } pair in the persistent cache
     *
     * NOTE: In order to store ArrayBuffers in IndexedDB you will need to convert them to Blobs
     * See `utilities/convertArrayBufferToBlob.ts` and `utilities/convertBlobToArrayBuffer.ts`
     *
     * @param key Key to set cache entry with
     * @param value Value to set cache entry with
     */
    PersistentCache.prototype.set = function (key, value) {
        var _this = this;
        assert(isAllowedAsKey(key), 'PersistentCache -> The given type of key is not allowed');
        set(key, value, this.store).catch(function (err) {
            warn("PersistentCache -> Set: { key: " + key + ", value: " + value + " } has failed with error: " + err);
            _this.memoryCache.set(key, value);
        });
    };
    /**
     * Gets a { key: value } pair by key in the persistent cache
     *
     * @param key Key of cache entry to get
     */
    PersistentCache.prototype.get = function (key) {
        var _this = this;
        assert(isAllowedAsKey(key), 'PersistentCache -> The given type of key is not allowed');
        return new Promise(function (resolve) {
            get(key, _this.store)
                .then(function (value) {
                resolve(value);
            })
                .catch(function (err) {
                warn("PersistentCache -> Get: { key: " + key + " } has failed with error: " + err);
                _this.memoryCache.get(key);
            });
        });
    };
    /**
     * Gets all { key: value } pairs in the persistent cache
     */
    PersistentCache.prototype.getKeys = function () {
        var _this = this;
        return new Promise(function (resolve) {
            keys(_this.store)
                .then(function (storeKeys) {
                resolve(storeKeys);
            })
                .catch(function (err) {
                warn("PersistentCache -> Keys: { key: " + keys + " } has failed with error: " + err);
                _this.memoryCache.keys();
            });
        });
    };
    /**
     * Delete a { key: value } pair by key in the persistent cache
     *
     * @param key Key of cache entry to delete
     */
    PersistentCache.prototype.delete = function (key) {
        var _this = this;
        assert(isAllowedAsKey(key), 'PersistentCache -> The given type of key is not allowed');
        del(key, this.store).catch(function (err) {
            warn("PersistentCache -> Delete: { key: " + key + " } has failed with error: " + err);
            _this.memoryCache.delete(key);
        });
    };
    /**
     * Clear the entire persistent cache from { key: value } pairs
     */
    PersistentCache.prototype.clear = function () {
        var _this = this;
        clear(this.store).catch(function (err) {
            warn("PersistentCache -> Clear: Store clearing has failed with error: " + err);
            _this.memoryCache.clear();
        });
    };
    return PersistentCache;
}());

/**
 * For any in-memory caching please refer to the documentation of WeakMap and Map
 *
 * WeakMap: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
 * Map: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 */

/**
 * Checks if the user has cookies enabled
 * This is useful for adhering to user wishes regarding analytics tracking
 */
var isCookieEnabled = (function () { return !!navigator.cookieEnabled || false; })();

// Features
// NOTE: When blocking cookies Firefox throws a security error for localStorage and indexedDB blocking further execution.
/**
 * Set a cookie
 *
 * @param key Key of cookie
 * @param value Value of cookie
 * @param expiryDays After how many days the cookie expires
 */
var setCookie = function (key, value, expiryDays) {
    if (expiryDays === void 0) { expiryDays = 365; }
    if (isCookieEnabled) {
        var date = new Date();
        date.setTime(date.getTime() + expiryDays * 86400000); // 24 * 60 * 60 * 1000 = 1 day
        var expires = "expires=" + date.toUTCString();
        document.cookie = key + "=" + value + "; " + expires + "; path=/; domain=" + window.location.hostname.replace('www.', '') + ";";
    }
    else {
        warn('Cookie -> Cookies are disabled, no cookie was set');
    }
};
/**
 * Get a cookie by key
 *
 * @param key Key of cookie to get
 */
var getCookie = function (key) {
    if (isCookieEnabled) {
        var result = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return result ? result.pop() : '';
    }
    warn('Cookie -> Cookies are disabled, no cookie was retrieved');
    return false;
};
/**
 * Delete a cookie by key
 *
 * @param key Key of cookie to delete
 */
var deleteCookie = function (key) {
    if (isCookieEnabled) {
        document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=" + window.location.hostname.replace('www.', '');
    }
    else {
        warn('Cookie -> Cookies are disabled, no cookie was deleted');
    }
};

// Events
/**
 * Monitor connection changes and speed
 */
function onConnectionChange() {
    // ECT          RTT         Kbps    Explanation
    // slow-2g      2000	      50	    The network is suited for small transfers only such as text-only pages.
    // 2g	          1400	      70	    The network is suited for transfers of small images.
    // 3g	          270	        700	    The network is suited for transfers of large assets such as high resolution images, audio, and SD video.
    // 4g	          0	          ∞	      The network is suited for HD video, real-time video, etc.
    var connectionIsOnline = navigator.onLine || false;
    var connectionEffectiveType = 
    // @ts-ignore navigator.connection does not exist yet as a type but is valid in the browser
    (navigator.connection && navigator.connection.effectiveType) || '4g';
    // @ts-ignore navigator.connection does not exist yet as a type but is valid in the browser
    var connectionSaveData = (navigator.connection && navigator.connection.saveData) || false;
    var connectionSpeed;
    if (!connectionIsOnline) {
        connectionSpeed = 'CONNECTION_SPEED_0';
    }
    else {
        switch (connectionEffectiveType) {
            case 'slow-2g':
            case '2g':
                connectionSpeed = 'CONNECTION_SPEED_1';
                break;
            case '3g':
                connectionSpeed = 'CONNECTION_SPEED_2';
                break;
            case '4g':
            default:
                connectionSpeed = 'CONNECTION_SPEED_3';
        }
    }
    eventEmitter.emit('ALPINE::CONNECTION_CHANGE', {
        connectionIsOnline: connectionIsOnline,
        connectionSaveData: connectionSaveData,
        connectionSpeed: connectionSpeed,
    });
}
/**
 * Start listening to connection change events
 */
var listenToConnectionChange = function () {
    // https://caniuse.com/#feat=netinfo (Chrome only for now)
    // @ts-ignore navigator.connection does not exist yet as a type but is valid in the browser
    if (navigator.connection) {
        // @ts-ignore navigator.connection does not exist yet as a type but is valid in the browser
        navigator.connection.addEventListener('change', onConnectionChange, false);
    }
    window.addEventListener('offline', onConnectionChange);
    window.addEventListener('online', onConnectionChange);
};
/**
 * Stop listening to connection change events
 */
var stopListeningToConnectionChange = function () {
    window.removeEventListener('offline', onConnectionChange);
    window.removeEventListener('online', onConnectionChange);
};

/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered.
 * The function will be called after it stops being called for n milliseconds
 *
 * @param func Function to execute
 * @param wait Amount of milliseconds to wait
 * @param immediate Trigger function on the leader edge instead of the trailing
 */
var debounce = function (func, wait, immediate) {
    if (immediate === void 0) { immediate = false; }
    var timeout;
    return function executedFunction() {
        // @ts-ignore
        var context = this;
        var args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
};

// Events
/**
 * Store reference allowing debounced function to be removed again
 */
var debouncedOnOrientationChange = debounce(onOrientationChange, 100);
/**
 * Monitor orientation changes
 */
function onOrientationChange() {
    var isLandscape = window.innerWidth > window.innerHeight;
    var isPortrait = !isLandscape;
    eventEmitter.emit('ALPINE::ORIENTATION_CHANGE', {
        isLandscape: isLandscape,
        isPortrait: isPortrait,
    });
}
/**
 * Start listening to orientation change events
 */
var listenToOrientationChange = function () {
    window.addEventListener('orientationchange', debouncedOnOrientationChange, false);
};
/**
 * Stop listening to orientation change events
 */
var stopListeningToOrientationChange = function () {
    window.removeEventListener('orientationchange', debouncedOnOrientationChange, false);
};

// Events
// Create vendor agnostic API (inspired by https://github.com/rafrex/fscreen)
var key = {
    hidden: 0,
    visibilitychange: 1,
};
var webkit = ['webkitHidden', 'webkitvisibilitychange'];
var ms = ['msHidden', 'msvisibilitychange'];
var prefix = ('hidden' in document && Object.keys(key)) ||
    (webkit[0] in document && webkit) ||
    (ms[0] in document && ms) ||
    [];
/**
 * Re-exposes the document visibility API without the need for vendor-specific prefixes
 */
var visibility = {
    // True is page is not visible, false if page is visible
    get hidden() {
        // @ts-ignore implicit any, has no index structure
        return Boolean(document[prefix[key.hidden]]);
    },
    // Vendor prefixed listeners
    addEventListener: function (type, handler, options) {
        // @ts-ignore implicit any, has no index structure
        return document.addEventListener(prefix[key[type]], handler, options);
    },
    removeEventListener: function (type, handler, options) {
        // @ts-ignore implicit any, has no index structure
        return document.removeEventListener(prefix[key[type]], handler, options);
    },
    // Visibility change listener
    get onvisibilitychange() {
        // @ts-ignore implicit any, has no index structure
        return document[("on" + prefix[key.visibilitychange]).toLowerCase()];
    },
    set onvisibilitychange(handler) {
        // @ts-ignore implicit any, has no index structure
        document[("on" + prefix[key.visibilitychange]).toLowerCase()] = handler;
    },
};
/**
 * Monitor visibility changes
 */
function onVisibilityChange() {
    eventEmitter.emit('ALPINE::VISIBILITY_CHANGE', {
        isVisible: !visibility.hidden,
    });
}
/**
 * Start listening to visibility change events
 */
var listenToVisibilityChange = function () {
    visibility.addEventListener('visibilitychange', onVisibilityChange, false);
};
/**
 * Stop listening to visibility change events
 */
var stopListeningToVisibilityChange = function () {
    visibility.removeEventListener('visibilitychange', onVisibilityChange);
};

// Events
/**
 * Store reference allowing debounced function to be removed again
 */
var debouncedOnWindowSizeChange = debounce(onWindowSizeChange, 100);
/**
 * Monitor window size changes
 */
function onWindowSizeChange() {
    eventEmitter.emit('ALPINE::WINDOW_SIZE_CHANGE', {
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
    });
}
/**
 * Start listening to window size change events
 */
var listenToWindowSizeChange = function () {
    window.addEventListener('resize', debouncedOnWindowSizeChange, false);
    window.addEventListener('orientationchange', debouncedOnWindowSizeChange, false);
};
/**
 * Stop listening to window size change events
 */
var stopListeningToWindowSizeChange = function () {
    window.removeEventListener('resize', debouncedOnWindowSizeChange, false);
    window.removeEventListener('orientationchange', debouncedOnWindowSizeChange, false);
};

// Events

var DetectUA = /** @class */ (function () {
    /**
     * Detect a users browser, browser version and wheter it is a mobile-, tablet- or desktop device.
     *
     * @param forceUserAgent Force a user agent string (useful for testing)
     */
    function DetectUA(forceUserAgent) {
        // Internal cache, prevents from doing the same computations twice
        this.cache = new Map();
        this.userAgent = forceUserAgent
            ? forceUserAgent
            : window && window.navigator
                ? window.navigator.userAgent
                : '';
        this.android = !/like android/i.test(this.userAgent) && /android/i.test(this.userAgent);
        this.iOS = this.match(1, /(iphone|ipod|ipad)/i).toLowerCase();
    }
    /**
     * Match entry based on position found in the user-agent string
     *
     * @param pattern regular expression pattern
     */
    DetectUA.prototype.match = function (position, pattern) {
        var match = this.userAgent.match(pattern);
        return (match && match.length > 1 && match[position]) || '';
    };
    Object.defineProperty(DetectUA.prototype, "isMobile", {
        /**
         * Returns if the device is a mobile device
         */
        get: function () {
            var cached = this.cache.get('isMobile');
            if (cached) {
                return cached;
            }
            else {
                if (
                // Default mobile
                !this.isTablet &&
                    (/[^-]mobi/i.test(this.userAgent) ||
                        // iPhone / iPod
                        (this.iOS === 'iphone' || this.iOS === 'ipod') ||
                        // Android
                        this.android ||
                        // Nexus mobile
                        /nexus\s*[0-6]\s*/i.test(this.userAgent))) {
                    this.cache.set('isMobile', true);
                    return true;
                }
                this.cache.set('isMobile', false);
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DetectUA.prototype, "isTablet", {
        /**
         * Returns if the device is a tablet device
         */
        get: function () {
            var cached = this.cache.get('isTablet');
            if (cached) {
                return cached;
            }
            else {
                if (
                // Default tablet
                (/tablet/i.test(this.userAgent) && !/tablet pc/i.test(this.userAgent)) ||
                    // iPad
                    this.iOS === 'ipad' ||
                    // Android
                    (this.android && !/[^-]mobi/i.test(this.userAgent)) ||
                    // Nexus tablet
                    (!/nexus\s*[0-6]\s*/i.test(this.userAgent) && /nexus\s*[0-9]+/i.test(this.userAgent))) {
                    this.cache.set('isTablet', true);
                    return true;
                }
                this.cache.set('isTablet', false);
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DetectUA.prototype, "isDesktop", {
        /**
         * Returns if the device is a desktop device
         */
        get: function () {
            var cached = this.cache.get('isDesktop');
            if (cached) {
                return cached;
            }
            else {
                var result = !this.isMobile && !this.isTablet;
                this.cache.set('isDesktop', result);
                return result;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DetectUA.prototype, "isiOS", {
        /**
         * Returns if the device is an iOS device
         */
        get: function () {
            var cached = this.cache.get('isiOS');
            if (cached) {
                return cached;
            }
            else {
                if (this.iOS) {
                    return {
                        name: 'iOS',
                        version: this.match(1, /os (\d+([_\s]\d+)*) like mac os x/i).replace(/[_\s]/g, '.'),
                    };
                }
                else {
                    return false;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DetectUA.prototype, "isAndroid", {
        /**
         * Returns if the device is an Android device
         */
        get: function () {
            var cached = this.cache.get('isAndroid');
            if (cached) {
                return cached;
            }
            else {
                if (this.android) {
                    return {
                        name: 'Android',
                        version: this.match(1, /android[ \/-](\d+(\.\d+)*)/i),
                    };
                }
                else {
                    return false;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DetectUA.prototype, "browser", {
        /**
         * Returns the browser name and version
         */
        get: function () {
            var cached = this.cache.get('browser');
            if (cached) {
                return cached;
            }
            else {
                var versionIdentifier = this.match(1, /version\/(\d+(\.\d+)?)/i);
                var result = void 0;
                if (/opera/i.test(this.userAgent)) {
                    // Opera
                    result = {
                        name: 'Opera',
                        version: versionIdentifier || this.match(1, /(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i),
                    };
                }
                else if (/opr\/|opios/i.test(this.userAgent)) {
                    // Opera
                    result = {
                        name: 'Opera',
                        version: this.match(1, /(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier,
                    };
                }
                else if (/SamsungBrowser/i.test(this.userAgent)) {
                    // Samsung Browser
                    result = {
                        name: 'Samsung Internet for Android',
                        version: versionIdentifier || this.match(1, /(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i),
                    };
                }
                else if (/yabrowser/i.test(this.userAgent)) {
                    // Yandex Browser
                    result = {
                        name: 'Yandex Browser',
                        version: versionIdentifier || this.match(1, /(?:yabrowser)[\s\/](\d+(\.\d+)?)/i),
                    };
                }
                else if (/ucbrowser/i.test(this.userAgent)) {
                    // UC Browser
                    result = {
                        name: 'UC Browser',
                        version: this.match(1, /(?:ucbrowser)[\s\/](\d+(\.\d+)?)/i),
                    };
                }
                else if (/msie|trident/i.test(this.userAgent)) {
                    // Internet Explorer
                    result = {
                        name: 'Internet Explorer',
                        version: this.match(1, /(?:msie |rv:)(\d+(\.\d+)?)/i),
                    };
                }
                else if (/edg([ea]|ios)/i.test(this.userAgent)) {
                    // Edge
                    result = {
                        name: 'Microsoft Edge',
                        version: this.match(2, /edg([ea]|ios)\/(\d+(\.\d+)?)/i),
                    };
                }
                else if (/firefox|iceweasel|fxios/i.test(this.userAgent)) {
                    // Firefox
                    result = {
                        name: 'Firefox',
                        version: this.match(1, /(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i),
                    };
                }
                else if (/chromium/i.test(this.userAgent)) {
                    // Chromium
                    result = {
                        name: 'Chromium',
                        version: this.match(1, /(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier,
                    };
                }
                else if (/chrome|crios|crmo/i.test(this.userAgent)) {
                    // Chrome
                    result = {
                        name: 'Chrome',
                        version: this.match(1, /(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i),
                    };
                }
                else if (/safari|applewebkit/i.test(this.userAgent)) {
                    // Safari
                    result = {
                        name: 'Safari',
                        version: versionIdentifier,
                    };
                }
                else {
                    // Everything else
                    result = {
                        name: this.match(1, /^(.*)\/(.*) /),
                        version: this.match(2, /^(.*)\/(.*) /),
                    };
                }
                this.cache.set('browser', result);
                return result;
            }
        },
        enumerable: true,
        configurable: true
    });
    return DetectUA;
}());

// Vendor
var device = new DetectUA();
var isMobile = device.isMobile, isTablet = device.isTablet, isDesktop = device.isDesktop, isiOS = device.isiOS, isAndroid = device.isAndroid, browser = device.browser;
var isChrome = typeof browser === 'object' && browser.name === 'Chrome';
var isFirefox = typeof browser === 'object' && browser.name === 'Firefox';
var isSafari = typeof browser === 'object' && browser.name === 'Safari';
var isEdge = typeof browser === 'object' && browser.name === 'Microsoft Edge';
var isInternetExplorer = typeof browser === 'object' && browser.name === 'Internet Explorer';
var isOpera = typeof browser === 'object' && browser.name === 'Opera';
var isSamsungBrowser = typeof browser === 'object' && browser.name === 'Samsung Internet for Android';
var isYandexBrowser = typeof browser === 'object' && browser.name === 'Yandex Browser';
var isUCBrowser = typeof browser === 'object' && browser.name === 'UC Browser';
var isChromium = typeof browser === 'object' && browser.name === 'Chromium';
/**
 * Device and browser detection
 */
var getBrowserType = {
    isDesktop: isDesktop,
    isMobile: isMobile,
    isTablet: isTablet,
    isAndroid: isAndroid,
    isiOS: isiOS,
    isChrome: isChrome,
    isChromium: isChromium,
    isEdge: isEdge,
    isFirefox: isFirefox,
    isInternetExplorer: isInternetExplorer,
    isOpera: isOpera,
    isSafari: isSafari,
    isSamsungBrowser: isSamsungBrowser,
    isUCBrowser: isUCBrowser,
    isYandexBrowser: isYandexBrowser,
    browserName: (typeof browser === 'object' && browser.name) || '',
    browserVersion: (typeof browser === 'object' && browser.version) || '',
};

/**
 * Get supported media formats (audio & video)
 */
var getMediaFeatures = (function () {
    var audio = new Audio();
    var video = document.createElement('video');
    function canPlay(type, mimeType) {
        var support = type.canPlayType(mimeType);
        return !!(support === 'probably' || support === 'maybe');
    }
    return {
        audio: {
            MP3: canPlay(audio, 'audio/mpeg'),
            Ogg: canPlay(audio, 'audio/ogg'),
            WAV: canPlay(audio, 'audio/wav'),
        },
        video: {
            HLS: canPlay(video, 'application/vnd.apple.mpegURL') || canPlay(video, 'application/x-mpegurl'),
            MP4: canPlay(video, 'video/mp4'),
            Ogg: canPlay(video, 'video/ogg'),
            WebM: canPlay(video, 'video/webm'),
        },
    };
})();

/**
 * The following defined constants and descriptions are directly ported from https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
 *
 * Any copyright is dedicated to the Public Domain. http://creativecommons.org/publicdomain/zero/1.0/
 *
 * Contributors
 *
 * See: https://developer.mozilla.org/en-US/profiles/Sheppy
 * See: https://developer.mozilla.org/en-US/profiles/fscholz
 * See: https://developer.mozilla.org/en-US/profiles/AtiX
 * See: https://developer.mozilla.org/en-US/profiles/Sebastianz
 *
 * These constants are defined on the WebGLRenderingContext / WebGL2RenderingContext interface
 */
/**
 * Passed to getParameter to get the current size of a point drawn with gl.POINTS
 * @constant {number}
 */
const GL_ALIASED_POINT_SIZE_RANGE = 0x846d;
/**
 * Passed to getParameter to get the range of available widths for a line. Returns a length-2 array with the lo value at 0, and hight at 1
 * @constant {number}
 */
const GL_ALIASED_LINE_WIDTH_RANGE = 0x846e;
/**
 * @constant {number}
 */
const GL_MAX_TEXTURE_SIZE = 0x0d33;
/**
 * @constant {number}
 */
const GL_MAX_VIEWPORT_DIMS = 0x0d3a;
/**
 * @constant {number}
 */
const GL_SUBPIXEL_BITS = 0x0d50;
/**
 * @constant {number}
 */
const GL_RED_BITS = 0x0d52;
/**
 * @constant {number}
 */
const GL_GREEN_BITS = 0x0d53;
/**
 * @constant {number}
 */
const GL_BLUE_BITS = 0x0d54;
/**
 * @constant {number}
 */
const GL_ALPHA_BITS = 0x0d55;
/**
 * @constant {number}
 */
const GL_DEPTH_BITS = 0x0d56;
/**
 * @constant {number}
 */
const GL_STENCIL_BITS = 0x0d57;
/**
 * @constant {number}
 */
const GL_VENDOR = 0x1f00;
/**
 * @constant {number}
 */
const GL_RENDERER = 0x1f01;
/**
 * @constant {number}
 */
const GL_VERSION = 0x1f02;
/**
 * Passed to enable/disable to turn on/off the stencil test. Can also be used with getParameter to query the stencil test
 * @constant {number}
 */
const GL_STENCIL_TEST = 0x0b90;
// Shaders
// Constants passed to WebGLRenderingContext.getShaderParameter()
/**
 * Passed to createShader to define a fragment shader
 * @constant {number}
 */
const GL_FRAGMENT_SHADER = 0x8b30;
/**
 * Passed to createShader to define a vertex shader
 * @constant {number}
 */
const GL_VERTEX_SHADER = 0x8b31;
/**
 * The maximum number of entries possible in the vertex attribute list
 * @constant {number}
 */
const GL_MAX_VERTEX_ATTRIBS = 0x8869;
/**
 * @constant {number}
 */
const GL_MAX_VERTEX_UNIFORM_VECTORS = 0x8dfb;
/**
 * @constant {number}
 */
const GL_MAX_VARYING_VECTORS = 0x8dfc;
/**
 * @constant {number}
 */
const GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS = 0x8b4d;
/**
 * @constant {number}
 */
const GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS = 0x8b4c;
/**
 * Implementation dependent number of maximum texture units. At least 8
 * @constant {number}
 */
const GL_MAX_TEXTURE_IMAGE_UNITS = 0x8872;
/**
 * @constant {number}
 */
const GL_MAX_FRAGMENT_UNIFORM_VECTORS = 0x8dfd;
/**
 * @constant {number}
 */
const GL_SHADING_LANGUAGE_VERSION = 0x8b8c;
/**
 * @constant {number}
 */
const GL_MAX_CUBE_MAP_TEXTURE_SIZE = 0x851c;
// Shader precision-specified types
/**
 * @constant {number}
 */
const GL_LOW_FLOAT = 0x8df0;
/**
 * @constant {number}
 */
const GL_MEDIUM_FLOAT = 0x8df1;
/**
 * @constant {number}
 */
const GL_HIGH_FLOAT = 0x8df2;
/**
 * @constant {number}
 */
const GL_MAX_RENDERBUFFER_SIZE = 0x84e8;
/**
 * @constant {number}
 */
const GL_MAX_3D_TEXTURE_SIZE = 0x8073;
/**
 * @constant {number}
 */
const GL_MAX_ELEMENTS_VERTICES = 0x80e8;
/**
 * @constant {number}
 */
const GL_MAX_ELEMENTS_INDICES = 0x80e9;
/**
 * @constant {number}
 */
const GL_MAX_TEXTURE_LOD_BIAS = 0x84fd;
/**
 * @constant {number}
 */
const GL_MAX_FRAGMENT_UNIFORM_COMPONENTS = 0x8b49;
/**
 * @constant {number}
 */
const GL_MAX_VERTEX_UNIFORM_COMPONENTS = 0x8b4a;
/**
 * @constant {number}
 */
const GL_MAX_ARRAY_TEXTURE_LAYERS = 0x88ff;
/**
 * @constant {number}
 */
const GL_MIN_PROGRAM_TEXEL_OFFSET = 0x8904;
/**
 * @constant {number}
 */
const GL_MAX_PROGRAM_TEXEL_OFFSET = 0x8905;
/**
 * @constant {number}
 */
const GL_MAX_VARYING_COMPONENTS = 0x8b4b;
/**
 * @constant {number}
 */
const GL_MAX_VERTEX_OUTPUT_COMPONENTS = 0x9122;
/**
 * @constant {number}
 */
const GL_MAX_FRAGMENT_INPUT_COMPONENTS = 0x9125;
/**
 * @constant {number}
 */
const GL_MAX_SERVER_WAIT_TIMEOUT = 0x9111;
/**
 * @constant {number}
 */
const GL_MAX_ELEMENT_INDEX = 0x8d6b;
// Draw buffers
/**
 * @constant {number}
 */
const GL_MAX_DRAW_BUFFERS = 0x8824;
/**
 * @constant {number}
 */
const GL_MAX_COLOR_ATTACHMENTS = 0x8cdf;
/**
 * @constant {number}
 */
const GL_MAX_SAMPLES = 0x8d57;
/**
 * @constant {number}
 */
const GL_MAX_VERTEX_UNIFORM_BLOCKS = 0x8a2b;
/**
 * @constant {number}
 */
const GL_MAX_FRAGMENT_UNIFORM_BLOCKS = 0x8a2d;
/**
 * @constant {number}
 */
const GL_MAX_COMBINED_UNIFORM_BLOCKS = 0x8a2e;
/**
 * @constant {number}
 */
const GL_MAX_UNIFORM_BUFFER_BINDINGS = 0x8a2f;
/**
 * @constant {number}
 */
const GL_MAX_UNIFORM_BLOCK_SIZE = 0x8a30;
/**
 * @constant {number}
 */
const GL_UNIFORM_BUFFER_OFFSET_ALIGNMENT = 0x8a34;
/**
 * @constant {number}
 */
const GL_MAX_CLIENT_WAIT_TIMEOUT_WEBGL = 0x9247;

// Vendor
/**
 * Collect and structure all major device and browser specific WebGL2 features
 */
var getWebGL2Features = (function () {
    var attributes = {
        stencil: true,
    };
    var canvas = document.createElement('canvas');
    var gl = canvas.getContext('webgl2', attributes);
    // @ts-ignore
    if (!gl || !(gl instanceof WebGL2RenderingContext)) {
        return false;
    }
    // @ts-ignore
    var glExtensionDebugRendererInfo = gl.getExtension('WEBGL_debug_renderer_info');
    // Enable features
    // @ts-ignore
    gl.enable(GL_STENCIL_TEST);
    // Enable extensions
    // @ts-ignore
    var glAnisotropicExtension = 
    // @ts-ignore
    gl.getExtension('EXT_texture_filter_anisotropic') ||
        // @ts-ignore
        gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') ||
        // @ts-ignore
        gl.getExtension('MOZ_EXT_texture_filter_anisotropic');
    var features = {
        // Base
        base: {
            // @ts-ignore
            // @ts-ignore
            renderer: gl.getParameter(GL_RENDERER),
            rendererUnmasked: glExtensionDebugRendererInfo &&
                // @ts-ignore
                gl.getParameter(glExtensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL),
            // @ts-ignore
            shaderVersion: gl.getParameter(GL_SHADING_LANGUAGE_VERSION),
            // @ts-ignore
            vendor: gl.getParameter(GL_VENDOR),
            vendorUnmasked: glExtensionDebugRendererInfo &&
                // @ts-ignore
                gl.getParameter(glExtensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL),
            // @ts-ignore
            version: gl.getParameter(GL_VERSION),
        },
        // General
        general: {
            // @ts-ignore
            aliasedLineWidthRange: gl.getParameter(GL_ALIASED_LINE_WIDTH_RANGE).toString(),
            // @ts-ignore
            aliasedPointSizeRange: gl.getParameter(GL_ALIASED_POINT_SIZE_RANGE).toString(),
            // @ts-ignore
            alphaBits: gl.getParameter(GL_ALPHA_BITS),
            // @ts-ignore
            antialias: !!gl.getContextAttributes().antialias,
            // @ts-ignore
            blueBits: gl.getParameter(GL_BLUE_BITS),
            // @ts-ignore
            depthBits: gl.getParameter(GL_DEPTH_BITS),
            // @ts-ignore
            greenBits: gl.getParameter(GL_GREEN_BITS),
            // @ts-ignore
            maxCombinedTextureImageUnits: gl.getParameter(GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS),
            // @ts-ignore
            maxCubeMapTextureSize: gl.getParameter(GL_MAX_CUBE_MAP_TEXTURE_SIZE),
            // @ts-ignore
            maxFragmentUniformVectors: gl.getParameter(GL_MAX_FRAGMENT_UNIFORM_VECTORS),
            // @ts-ignore
            maxRenderBufferSize: gl.getParameter(GL_MAX_RENDERBUFFER_SIZE),
            // @ts-ignore
            maxTextureImageUnits: gl.getParameter(GL_MAX_TEXTURE_IMAGE_UNITS),
            // @ts-ignore
            maxTextureSize: gl.getParameter(GL_MAX_TEXTURE_SIZE),
            // @ts-ignore
            maxVaryingVectors: gl.getParameter(GL_MAX_VARYING_VECTORS),
            // @ts-ignore
            maxVertexAttributes: gl.getParameter(GL_MAX_VERTEX_ATTRIBS),
            // @ts-ignore
            maxVertexTextureImageUnits: gl.getParameter(GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS),
            // @ts-ignore
            maxVertexUniformVectors: gl.getParameter(GL_MAX_VERTEX_UNIFORM_VECTORS),
            // @ts-ignore
            maxViewportDimensions: gl.getParameter(GL_MAX_VIEWPORT_DIMS).toString(),
            precision: {
                fragmentShaderHighPrecision: [
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_HIGH_FLOAT).rangeMin,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_HIGH_FLOAT).rangeMax,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_HIGH_FLOAT).precision,
                ].toString(),
                fragmentShaderLowPrecision: [
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_LOW_FLOAT).rangeMin,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_LOW_FLOAT).rangeMax,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_LOW_FLOAT).precision,
                ].toString(),
                fragmentShaderMediumPrecision: [
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_MEDIUM_FLOAT).rangeMin,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_MEDIUM_FLOAT).rangeMax,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_MEDIUM_FLOAT).precision,
                ].toString(),
                vertexShaderHighPrecision: [
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_HIGH_FLOAT).rangeMin,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_HIGH_FLOAT).rangeMax,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_HIGH_FLOAT).precision,
                ].toString(),
                vertexShaderLowPrecision: [
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_LOW_FLOAT).rangeMin,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_LOW_FLOAT).rangeMax,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_LOW_FLOAT).precision,
                ].toString(),
                vertexShaderMediumPrecision: [
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_MEDIUM_FLOAT).rangeMin,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_MEDIUM_FLOAT).rangeMax,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_MEDIUM_FLOAT).precision,
                ].toString(),
            },
            // @ts-ignore
            redBits: gl.getParameter(GL_RED_BITS),
            // @ts-ignore
            stencilBits: gl.getParameter(GL_STENCIL_BITS),
            // @ts-ignore
            subPixelBits: gl.getParameter(GL_SUBPIXEL_BITS),
        },
        // Extensions
        extensions: {
            // prettier-ignore
            maxAnisotropy: glAnisotropicExtension
                // @ts-ignore
                ? gl.getParameter(glAnisotropicExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
                : 0,
            // @ts-ignore
            supportedExtensions: gl.getSupportedExtensions(),
            // Compressed texture extensions
            // @ts-ignore
            compressedTextureASTCExtension: gl.getExtension('WEBGL_compressed_texture_astc') || null,
            // @ts-ignore
            compressedTextureATCExtension: gl.getExtension('WEBGL_compressed_texture_atc') || null,
            // @ts-ignore
            compressedTextureETC1Extension: gl.getExtension('WEBGL_compressed_texture_etc1') || null,
            // @ts-ignore
            compressedTextureETCExtension: gl.getExtension('WEBGL_compressed_texture_etc') || null,
            compressedTexturePVRTCExtension: 
            // @ts-ignore
            gl.getExtension('WEBGL_compressed_texture_pvrtc') ||
                // @ts-ignore
                gl.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc') ||
                null,
            // @ts-ignore
            compressedTextureS3TCExtension: gl.getExtension('WEBGL_compressed_texture_s3tc') || null,
            compressedTextureS3TCSRGBExtension: 
            // @ts-ignore
            gl.getExtension('WEBGL_compressed_texture_s3tc_srgb') || null,
        },
        // WebGL2 specific
        specific: {
            // @ts-ignore
            max3DTextureSize: gl.getParameter(GL_MAX_3D_TEXTURE_SIZE),
            // @ts-ignore
            maxArrayTextureLayers: gl.getParameter(GL_MAX_ARRAY_TEXTURE_LAYERS),
            // @ts-ignore
            maxClientWaitTimeout: gl.getParameter(GL_MAX_CLIENT_WAIT_TIMEOUT_WEBGL),
            // @ts-ignore
            maxColorAttachments: gl.getParameter(GL_MAX_COLOR_ATTACHMENTS),
            // @ts-ignore
            maxCombinedFragmentUniformComponents: gl.getParameter(
            // @ts-ignore
            gl.MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS),
            // @ts-ignore
            maxCombinedUniformBlocks: gl.getParameter(GL_MAX_COMBINED_UNIFORM_BLOCKS),
            // @ts-ignore
            maxCombinedVertexUniformComponents: gl.getParameter(
            // @ts-ignore
            gl.MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS),
            // @ts-ignore
            maxDrawBuffers: gl.getParameter(GL_MAX_DRAW_BUFFERS),
            // @ts-ignore
            maxElementIndex: gl.getParameter(GL_MAX_ELEMENT_INDEX),
            // @ts-ignore
            maxElementsIndices: gl.getParameter(GL_MAX_ELEMENTS_INDICES),
            // @ts-ignore
            maxElementsVertices: gl.getParameter(GL_MAX_ELEMENTS_VERTICES),
            // @ts-ignore
            maxFragmentInputComponents: gl.getParameter(GL_MAX_FRAGMENT_INPUT_COMPONENTS),
            // @ts-ignore
            maxFragmentUniformBlocks: gl.getParameter(GL_MAX_FRAGMENT_UNIFORM_BLOCKS),
            // @ts-ignore
            maxFragmentUniformComponents: gl.getParameter(GL_MAX_FRAGMENT_UNIFORM_COMPONENTS),
            // @ts-ignore
            maxProgramTexelOffset: gl.getParameter(GL_MAX_PROGRAM_TEXEL_OFFSET),
            // @ts-ignore
            maxSamples: gl.getParameter(GL_MAX_SAMPLES),
            // @ts-ignore
            maxServerWaitTimeout: gl.getParameter(GL_MAX_SERVER_WAIT_TIMEOUT),
            // @ts-ignore
            maxTextureLODBias: gl.getParameter(GL_MAX_TEXTURE_LOD_BIAS),
            // @ts-ignore
            maxTransformFeedbackInterleavedComponents: gl.getParameter(
            // @ts-ignore
            gl.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS),
            // @ts-ignore
            maxTransformFeedbackSeparateAttribs: gl.getParameter(
            // @ts-ignore
            gl.MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS),
            // @ts-ignore
            maxTransformFeedbackSeparateComponents: gl.getParameter(
            // @ts-ignore
            gl.MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS),
            // @ts-ignore
            maxUniformBlockSize: gl.getParameter(GL_MAX_UNIFORM_BLOCK_SIZE),
            // @ts-ignore
            maxUniformBufferBindings: gl.getParameter(GL_MAX_UNIFORM_BUFFER_BINDINGS),
            // @ts-ignore
            maxVaryingComponents: gl.getParameter(GL_MAX_VARYING_COMPONENTS),
            // @ts-ignore
            maxVertexOutputComponents: gl.getParameter(GL_MAX_VERTEX_OUTPUT_COMPONENTS),
            // @ts-ignore
            maxVertexUniformBlocks: gl.getParameter(GL_MAX_VERTEX_UNIFORM_BLOCKS),
            // @ts-ignore
            maxVertexUniformComponents: gl.getParameter(GL_MAX_VERTEX_UNIFORM_COMPONENTS),
            // @ts-ignore
            minProgramTexelOffset: gl.getParameter(GL_MIN_PROGRAM_TEXEL_OFFSET),
            // @ts-ignore
            uniformBufferOffsetAlignment: gl.getParameter(GL_UNIFORM_BUFFER_OFFSET_ALIGNMENT),
        },
    };
    return features;
});

// Vendor
/**
 * Collect and structure all major device and browser specific WebGL features
 */
var getWebGLFeatures = (function () {
    var attributes = {
        stencil: true,
    };
    var canvas = document.createElement('canvas');
    var gl = canvas.getContext('webgl', attributes) || canvas.getContext('experimental-webgl', attributes);
    if (!gl || !(gl instanceof WebGLRenderingContext)) {
        return false;
    }
    var glExtensionDebugRendererInfo = gl.getExtension('WEBGL_debug_renderer_info');
    // Enable features
    gl.enable(GL_STENCIL_TEST);
    // Enable extensions
    var glAnisotropicExtension = gl.getExtension('EXT_texture_filter_anisotropic') ||
        gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') ||
        gl.getExtension('MOZ_EXT_texture_filter_anisotropic');
    var glDrawBufferExtension = gl.getExtension('WEBGL_draw_buffers');
    var features = {
        // Base
        base: {
            renderer: gl.getParameter(GL_RENDERER),
            rendererUnmasked: glExtensionDebugRendererInfo &&
                gl.getParameter(glExtensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL),
            shaderVersion: gl.getParameter(GL_SHADING_LANGUAGE_VERSION),
            vendor: gl.getParameter(GL_VENDOR),
            vendorUnmasked: glExtensionDebugRendererInfo &&
                gl.getParameter(glExtensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL),
            version: gl.getParameter(GL_VERSION),
        },
        // General
        general: {
            aliasedLineWidthRange: gl.getParameter(GL_ALIASED_LINE_WIDTH_RANGE).toString(),
            aliasedPointSizeRange: gl.getParameter(GL_ALIASED_POINT_SIZE_RANGE).toString(),
            alphaBits: gl.getParameter(GL_ALPHA_BITS),
            // @ts-ignore
            antialias: !!gl.getContextAttributes().antialias,
            blueBits: gl.getParameter(GL_BLUE_BITS),
            depthBits: gl.getParameter(GL_DEPTH_BITS),
            greenBits: gl.getParameter(GL_GREEN_BITS),
            maxCombinedTextureImageUnits: gl.getParameter(GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS),
            maxCubeMapTextureSize: gl.getParameter(GL_MAX_CUBE_MAP_TEXTURE_SIZE),
            maxFragmentUniformVectors: gl.getParameter(GL_MAX_FRAGMENT_UNIFORM_VECTORS),
            maxRenderBufferSize: gl.getParameter(GL_MAX_RENDERBUFFER_SIZE),
            maxTextureImageUnits: gl.getParameter(GL_MAX_TEXTURE_IMAGE_UNITS),
            maxTextureSize: gl.getParameter(GL_MAX_TEXTURE_SIZE),
            maxVaryingVectors: gl.getParameter(GL_MAX_VARYING_VECTORS),
            maxVertexAttributes: gl.getParameter(GL_MAX_VERTEX_ATTRIBS),
            maxVertexTextureImageUnits: gl.getParameter(GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS),
            maxVertexUniformVectors: gl.getParameter(GL_MAX_VERTEX_UNIFORM_VECTORS),
            maxViewportDimensions: gl.getParameter(GL_MAX_VIEWPORT_DIMS).toString(),
            precision: {
                fragmentShaderHighPrecision: [
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_HIGH_FLOAT).rangeMin,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_HIGH_FLOAT).rangeMax,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_HIGH_FLOAT).precision,
                ].toString(),
                fragmentShaderLowPrecision: [
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_LOW_FLOAT).rangeMin,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_LOW_FLOAT).rangeMax,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_LOW_FLOAT).precision,
                ].toString(),
                fragmentShaderMediumPrecision: [
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_MEDIUM_FLOAT).rangeMin,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_MEDIUM_FLOAT).rangeMax,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_MEDIUM_FLOAT).precision,
                ].toString(),
                vertexShaderHighPrecision: [
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_HIGH_FLOAT).rangeMin,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_HIGH_FLOAT).rangeMax,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_HIGH_FLOAT).precision,
                ].toString(),
                vertexShaderLowPrecision: [
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_LOW_FLOAT).rangeMin,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_LOW_FLOAT).rangeMax,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_LOW_FLOAT).precision,
                ].toString(),
                vertexShaderMediumPrecision: [
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_MEDIUM_FLOAT).rangeMin,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_MEDIUM_FLOAT).rangeMax,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_MEDIUM_FLOAT).precision,
                ].toString(),
            },
            redBits: gl.getParameter(GL_RED_BITS),
            stencilBits: gl.getParameter(GL_STENCIL_BITS),
            subPixelBits: gl.getParameter(GL_SUBPIXEL_BITS),
        },
        // Extensions
        extensions: {
            maxAnisotropy: glAnisotropicExtension
                ? gl.getParameter(glAnisotropicExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
                : 0,
            maxDrawBuffers: glDrawBufferExtension
                ? gl.getParameter(glDrawBufferExtension.MAX_DRAW_BUFFERS_WEBGL)
                : 0,
            supportedExtensions: gl.getSupportedExtensions(),
            // Compressed texture extensions
            compressedTextureASTCExtension: gl.getExtension('WEBGL_compressed_texture_astc') || null,
            compressedTextureATCExtension: gl.getExtension('WEBGL_compressed_texture_atc') || null,
            compressedTextureETC1Extension: gl.getExtension('WEBGL_compressed_texture_etc1') || null,
            compressedTextureETCExtension: gl.getExtension('WEBGL_compressed_texture_etc') || null,
            compressedTexturePVRTCExtension: gl.getExtension('WEBGL_compressed_texture_pvrtc') ||
                gl.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc') ||
                null,
            compressedTextureS3TCExtension: gl.getExtension('WEBGL_compressed_texture_s3tc') || null,
            compressedTextureS3TCSRGBExtension: gl.getExtension('WEBGL_compressed_texture_s3tc_srgb') || null,
        },
    };
    return features;
})();

/**
 * Tests for Animation Worklet support
 */
// @ts-ignore missing type definition
var isAnimationWorkletSupported = (function () { return (!!window.CSS && !!window.CSS.animationWorklet) || false; })();

/**
 * Tests for Audio Worklet support
 */
// @ts-ignore missing type definition
var isAudioWorkletSupported = (function () { return !!window.AudioWorklet || false; })();

/**
 * Tests for BroadcastChannel support
 */
// @ts-ignore missing type definition
var isBroadcastChannelSupported = (function () { return !!window.BroadcastChannel || false; })();

/**
 * Tests for fetch support
 */
var isFetchSupported = (function () { return !!window.fetch || false; })();

/**
 * Tests for gamepad support
 */
// @ts-ignore missing type definition
var isGamepadSupported = (function () { return !!window.Gamepad || false; })();

/**
 * Tests for ImageBitmap support
 */
// @ts-ignore missing type definition
var isImageBitmapSupported = (function () { return (!!window.ImageBitmap && !!window.createImageBitmap) || false; })();

/**
 * Tests for Image decode support
 */
var isImageDecodeSupported = (function () {
    try {
        var image = new Image();
        return !!image.decode;
    }
    catch (err) {
        return false;
    }
})();

/**
 * Tests for IndexedDB support
 */
var isIndexedDBSupported = (function () {
    try {
        return !!window.indexedDB;
    }
    catch (err) {
        return false;
    }
})();

/**
 * Tests for IntersectionObserver support
 */
// @ts-ignore missing type definition
var isIntersectionObserverSupported = (function () { return !!window.IntersectionObserver || false; })();

/**
 * Tests for Layout Worklet support
 */
// @ts-ignore missing type definition
var isLayoutWorkletSupported = (function () { return (!!window.CSS && !!window.CSS.layoutWorklet) || false; })();

/**
 * Tests for LocalStorage support
 */
var isLocalStorageSupported = (function () {
    try {
        return !!window.localStorage;
    }
    catch (err) {
        return false;
    }
})();

/**
 * Tests for MutationObserver support
 */
// @ts-ignore missing type definition
var isMutationObserverSupported = (function () { return !!window.MutationObserver || false; })();

/**
 * Tests for OffscreenCanvas support
 */
// @ts-ignore missing type definition
var isOffscreenCanvasSupported = (function () { return !!window.OffscreenCanvas || false; })();

/**
 * Tests for Paint Worklet support
 */
// @ts-ignore missing type definition
var isPaintWorkletSupported = (function () { return (!!window.CSS && !!window.CSS.paintWorklet) || false; })();

/**
 * Tests for performance.now support
 */
var isPerformanceNowSupported = (function () { return !!(window.performance && window.performance.now) || false; })();

/**
 * Tests for PerformanceObserver support
 */
// @ts-ignore missing type definition
var isPerformanceObserverSupported = (function () { return !!window.PerformanceObserver || false; })();

/**
 * Tests for ServiceWorker support
 */
var isServiceWorkerSupported = (function () { return !!navigator.serviceWorker || false; })();

/**
 * Tests for SessionStorage support
 */
var isSessionStorageSupported = (function () {
    try {
        return !!window.sessionStorage;
    }
    catch (err) {
        return false;
    }
})();

/**
 * Tests for WebAssembly support
 */
// @ts-ignore missing type definition
var isWebAssemblySupported = (function () { return !!window.WebAssembly || false; })();

/**
 * Tests for WebAudio support
 */
// @ts-ignore missing type definition
var isWebAudioSupported = (function () { return !!window.AudioContext || !!window.webkitAudioContext || false; })();

/**
 * Tests for WebGL2 support
 */
var isWebGL2Supported = (function () {
    var canvas = document.createElement('canvas');
    // NOTE: there is no 'experimental-webgl2' as mentioned in https://webgl2fundamentals.org/webgl/lessons/webgl1-to-webgl2.html
    var gl = canvas.getContext('webgl2');
    // @ts-ignore missing type definition
    return (gl && gl instanceof WebGL2RenderingContext) || false;
});

/**
 * Tests for WebGL support
 */
var isWebGLSupported = (function () {
    var canvas = document.createElement('canvas');
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return (gl && gl instanceof WebGLRenderingContext) || false;
})();

/**
 * Tests for WebP support
 */
var isWebPSupported = (function () {
    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL ? canvas.toDataURL('image/webp').indexOf('image/webp') === 5 : false;
})();

/**
 * Tests for WebRTC support
 */
var isWebRTCSupported = (function () {
    // @ts-ignore missing type definition
    return (!!window.RTCPeerConnection && !!window.RTCDataChannelEvent) ||
        // @ts-ignore missing type definition
        !!window.webkitRTCPeerConnection ||
        // @ts-ignore missing type definition
        !!window.mozRTCPeerConnection ||
        // @ts-ignore missing type definition
        !!window.msRTCPeerConnection ||
        // @ts-ignore missing type definition
        !!window.oRTCPeerConnection ||
        false;
})();

/**
 * Tests for WebSocket support
 */
// @ts-ignore missing type definition
var isWebSocketSupported = (function () { return !!window.WebSocket || false; })();

/**
 * Tests for WebVR support
 */
var isWebVRSupported = (function () { return !!navigator.getVRDisplays || false; })();

/**
 * Tests for inline web worker support
 */
var isWebWorkerInlineSupported = (function () {
    try {
        // @ts-ignore missing type definition
        var URL_1 = window.URL || window.webkitURL;
        // @ts-ignore missing type definition
        if (URL_1 === undefined || window.Blob === undefined || window.Worker === undefined) {
            return false;
        }
        var blob = new Blob(['']);
        var oURL = URL_1.createObjectURL(blob);
        var worker = new Worker(oURL);
        URL_1.revokeObjectURL(oURL);
        if (worker) {
            worker.terminate();
            return true;
        }
        return false;
    }
    catch (err) {
        return false;
    }
})();

/**
 * Tests for inline web worker support
 */
// @ts-ignore missing type definition
var isWebWorkerSupported = (function () { return !!window.Worker || false; })();

/**
 * Tests for WebXR support
 */
// @ts-ignore missing type definition
var isWebXRSupported = (function () { return !!navigator.xr || false; })();

/**
 * Gets the device pixel ratio of the device
 * Note that different zooming levels change the device pixel ratio
 */
var getDevicePixelRatio = (function () { return window.devicePixelRatio || 1; })();

/**
 * Gets the device byte endianness
 */
var getEndianness = (function () {
    // @ts-ignore missing type definition
    if (window.ArrayBuffer !== null) {
        var buffer = new ArrayBuffer(4);
        var intView = new Uint32Array(buffer);
        var byteView = new Uint8Array(buffer);
        intView[0] = 1;
        return byteView[0] === 1 ? 'little' : 'big';
    }
    return 'Unknown';
})();

// !! AUTO-GENERATED FILE - DO NOT EDIT !!
// Scraped from https://www.notebookcheck.net/
// Mobile GPU benchmark: https://www.notebookcheck.net/Mobile-Graphics-Cards-Benchmark-List.844.0.html?type=&sort=&professional=2&showClassDescription=1&deskornote=3&archive=1&perfrating=1&or=0&showBars=1&3dmark13_ice_gpu=1&3dmark13_cloud_gpu=1&3dmark13_fire_gpu=1&3dmark11_gpu=1&gpu_fullname=1&architecture=1&pixelshaders=1&vertexshaders=1&corespeed=1&boostspeed=1&memoryspeed=1&memorybus=1&memorytype=1&directx=1
// Desktop GPU benchmark: https://www.notebookcheck.net/Mobile-Graphics-Cards-Benchmark-List.844.0.html?type=&sort=&showClassDescription=1&deskornote=4&archive=1&perfrating=1&or=0&showBars=1&3dmark13_ice_gpu=1&3dmark13_cloud_gpu=1&3dmark13_fire_gpu=1&3dmark11_gpu=1&gpu_fullname=1&architecture=1&pixelshaders=1&vertexshaders=1&corespeed=1&boostspeed=1&memoryspeed=1&memorybus=1&memorytype=1&directx=1
var GPU_BENCHMARK_SCORE_DESKTOP = [
    '738 - AMD Radeon HD 7290',
    '728 - AMD Radeon HD 8180',
    '726 - AMD Radeon HD 7310',
    '724 - AMD Radeon HD 7340',
    '720 - Intel HD Graphics (Bay Trail)',
    '679 - Intel HD Graphics (Ivy Bridge)',
    '675 - AMD Radeon HD 8210',
    '651 - Intel HD Graphics (Cherry Trail)',
    '650 - AMD Radeon HD 8250',
    '649 - AMD Radeon R6 (Mullins)',
    '648 - AMD Radeon HD 8240',
    '640 - AMD Radeon HD 8280',
    '637 - AMD Radeon R2 (Mullins/Beema/Carrizo-L)',
    '616 - Intel HD Graphics (Haswell)',
    '607 - Intel HD Graphics 400 (Braswell)',
    '606 - Intel HD Graphics (Braswell)',
    '605 - Intel HD Graphics 405 (Braswell)',
    '585 - Intel HD Graphics 500',
    '584 - Intel UHD Graphics 600',
    '583 - AMD Radeon HD 8330',
    '582 - AMD Radeon HD 8350G',
    '569 - AMD Radeon HD 8400',
    '565 - AMD Radeon HD 8450G',
    '556 - Intel HD Graphics 4200',
    '555 - Intel HD Graphics (Broadwell)',
    '554 - AMD Radeon R2 (Stoney Ridge)',
    '553 - AMD Radeon R3 (Mullins/Beema)',
    '552 - AMD Radeon R4 (Kaveri)',
    '551 - AMD Radeon R4 (Beema)',
    '550 - AMD Radeon R5 (Beema/Carrizo-L)',
    '548 - AMD Radeon R4 (Stoney Ridge)',
    '544 - Intel HD Graphics 4000',
    '543 - AMD Radeon HD 7480D',
    '535 - Intel HD Graphics 5300',
    '534 - Intel HD Graphics 505',
    '533 - Intel UHD Graphics 605',
    '504 - Intel HD Graphics 510',
    '503 - AMD Radeon HD 8610G',
    '502 - Intel HD Graphics 610',
    '501 - Intel HD Graphics 4400',
    '500 - Intel HD Graphics 515',
    '493 - AMD Radeon HD 8470D',
    '484 - AMD Radeon HD 8550G',
    '468 - Intel HD Graphics 5000',
    '465 - AMD Radeon HD 7660G',
    '464 - NVIDIA GeForce 710M',
    '461 - AMD Radeon R5 (Kaveri)',
    '460 - AMD Radeon R5 (Carrizo)',
    '459 - Intel HD Graphics 615',
    '458 - Intel UHD Graphics 615',
    '457 - Intel UHD Graphics 617',
    '447 - Intel HD Graphics 5500',
    '445 - Intel HD Graphics 4600',
    '441 - Intel Iris Graphics 5100',
    '439 - NVIDIA Quadro K610M',
    '438 - Intel HD Graphics 6000',
    '432 - AMD Radeon R5 (Stoney Ridge)',
    '431 - AMD Radeon R5 M420',
    '430 - AMD Radeon R5 M315',
    '428 - AMD Radeon R5 M320',
    '425 - NVIDIA GeForce GT 720M',
    '424 - Intel Iris Graphics 6100',
    '423 - Intel HD Graphics 520',
    '422 - NVIDIA GeForce 820M',
    '421 - NVIDIA GeForce 910M',
    '419 - AMD Radeon RX Vega 3',
    '418 - AMD Radeon R5 M255',
    '417 - AMD Radeon R5 M430',
    '416 - AMD Radeon R5 M330',
    '413 - AMD Radeon HD 7560D',
    '407 - AMD Radeon HD 8650G',
    '391 - NVIDIA Quadro K1000M',
    '389 - AMD Radeon HD 7660D',
    '388 - AMD Radeon R6 M255DX',
    '381 - Intel HD Graphics 5600',
    '371 - AMD FirePro W2100',
    '362 - AMD Radeon R6 (Kaveri)',
    '350 - AMD Radeon R6 (Carrizo)',
    '349 - Intel HD Graphics 620',
    '348 - Intel UHD Graphics 620',
    '347 - AMD Radeon R5 (Bristol Ridge)',
    '345 - Intel HD Graphics P530',
    '344 - Intel HD Graphics 530',
    '343 - Intel HD Graphics P630',
    '342 - Intel HD Graphics 630',
    '341 - Intel UHD Graphics 630',
    '340 - AMD Radeon RX Vega 6',
    '338 - AMD Radeon 520',
    '337 - AMD Radeon R7 M340',
    '330 - AMD Radeon R7 M440',
    '329 - AMD Radeon R8 M445DX',
    '326 - NVIDIA GeForce 920M',
    '324 - AMD Radeon R7 M360',
    '321 - AMD Radeon R7 M460',
    '319 - AMD Radeon R7 (Kaveri)',
    '318 - AMD Radeon R7 (Carrizo)',
    '317 - NVIDIA GeForce GT 640M',
    '316 - AMD Radeon R7 (Bristol Ridge)',
    '312 - AMD Radeon R7 M265',
    '308 - AMD FirePro M4100',
    '305 - NVIDIA GeForce GT 730M',
    '295 - AMD FirePro M4000',
    '293 - NVIDIA GeForce 825M',
    '291 - NVIDIA GeForce GT 735M',
    '288 - NVIDIA Quadro K2000M',
    '284 - Intel Iris Graphics 540',
    '283 - NVIDIA GeForce 920MX',
    '282 - Intel Iris Plus Graphics 640',
    '281 - NVIDIA GeForce MX110',
    '280 - NVIDIA GeForce 830M',
    '279 - AMD Radeon 530',
    '278 - Intel Iris Graphics 550',
    '277 - NVIDIA GeForce 930M',
    '276 - Intel Iris Plus Graphics 650',
    '275 - NVIDIA GeForce GT 740M',
    '274 - AMD Radeon R7 384 Cores (Kaveri Desktop)',
    '273 - Intel Iris Pro Graphics 5200',
    '272 - AMD Radeon R7 512 Cores (Kaveri Desktop)',
    '269 - NVIDIA GeForce GT 745M',
    '267 - NVIDIA GeForce 840M',
    '266 - NVIDIA Quadro M500M',
    '261 - AMD Radeon R7 M445',
    '260 - Intel Iris Plus Graphics 655',
    '259 - AMD Radeon R9 M375',
    '258 - AMD FirePro W4190M',
    '257 - NVIDIA Quadro M600M',
    '255 - NVIDIA GeForce 930MX',
    '254 - NVIDIA GeForce 940M',
    '253 - AMD Radeon RX Vega 8',
    '252 - NVIDIA Quadro K1100M',
    '251 - NVIDIA Quadro M520',
    '250 - NVIDIA GeForce 940MX',
    '249 - NVIDIA GeForce MX130',
    '248 - Intel Iris Pro Graphics 6200',
    '247 - NVIDIA GeForce GT 750M',
    '242 - AMD FirePro W4100',
    '241 - AMD FirePro W4170M',
    '239 - AMD Radeon R7 M465',
    '237 - AMD Radeon R9 M265X',
    '234 - NVIDIA GeForce 845M',
    '232 - NVIDIA GeForce GT 755M',
    '231 - AMD Radeon R7 250',
    '226 - NVIDIA Quadro K2100M',
    '225 - NVIDIA GeForce MX230',
    '224 - AMD FirePro M5100',
    '223 - AMD FirePro M6000',
    '221 - NVIDIA Quadro K3000M',
    '215 - AMD FirePro W5130M',
    '214 - NVIDIA Maxwell GPU Surface Book (940M, GDDR5)',
    '208 - AMD Radeon R9 M370X',
    '207 - AMD FirePro W5170M',
    '206 - NVIDIA Quadro K3100M',
    '195 - AMD Radeon R9 M470',
    '190 - Intel Iris Pro Graphics 580',
    '189 - Intel Iris Pro Graphics P580',
    '188 - AMD Radeon RX Vega 10',
    '187 - NVIDIA Quadro P500',
    '186 - NVIDIA Quadro K4000M',
    '181 - NVIDIA GeForce 945M',
    '175 - AMD Radeon RX Vega 11',
    '174 - NVIDIA Quadro M620',
    '173 - NVIDIA Quadro M1000M',
    '172 - NVIDIA GeForce GTX 850M',
    '171 - AMD Radeon R9 M385X',
    '170 - AMD Radeon R9 M470X',
    '169 - AMD Radeon Pro 450',
    '168 - NVIDIA GeForce GTX 950M',
    '160 - NVIDIA GeForce GTX 860M',
    '159 - AMD Radeon Pro WX 3100 Mobile',
    '158 - AMD Radeon RX 540',
    '156 - NVIDIA Quadro K4100M',
    '155 - NVIDIA Quadro K5000M',
    '154 - NVIDIA Quadro M2000M',
    '153 - NVIDIA GeForce MX150',
    '152 - NVIDIA GeForce MX250',
    '151 - NVIDIA Quadro P600',
    '150 - NVIDIA GeForce GT 1030 (Desktop)',
    '149 - AMD Radeon Pro 455',
    '148 - AMD Radeon Pro 555',
    '147 - AMD Radeon Pro 555X',
    '146 - NVIDIA Quadro M1200',
    '142 - AMD Radeon RX 550 (Laptop)',
    '141 - AMD Radeon RX 550X (Laptop)',
    '139 - NVIDIA GeForce GTX 960M',
    '138 - AMD Radeon Pro WX 4130',
    '137 - AMD Radeon Pro 460',
    '136 - AMD Radeon Pro 560',
    '135 - AMD Radeon Pro 560X',
    '133 - AMD FirePro M6100',
    '132 - AMD Radeon R9 M390',
    '129 - AMD Radeon RX 460 (Laptop)',
    '122 - NVIDIA GeForce GTX 870M',
    '121 - NVIDIA Quadro M2200',
    '120 - AMD Radeon RX 560 (Laptop)',
    '119 - AMD Radeon RX 560X (Laptop)',
    '118 - NVIDIA GeForce GTX 965M',
    '116 - AMD Radeon Pro WX 4150',
    '115 - AMD Radeon RX 460 (Desktop)',
    '113 - NVIDIA Quadro P1000',
    '112 - NVIDIA Quadro K5100M',
    '108 - AMD Radeon R9 270X',
    '107 - NVIDIA GeForce GTX 950',
    '106 - NVIDIA GeForce GTX 1050 Max-Q',
    '105 - NVIDIA GeForce GTX 880M',
    '103 - AMD Radeon R7 370',
    '102 - AMD Radeon R9 M395',
    '101 - AMD FirePro W7170M',
    '100 - NVIDIA GeForce GTX 1050 (Laptop)',
    '99 - NVIDIA GeForce GTX 1050 (Desktop)',
    '98 - NVIDIA Quadro M3000M',
    '95 - AMD Radeon R9 M485X',
    '94 - AMD Radeon Pro Vega 16',
    '93 - AMD Radeon Pro WX Vega M GL',
    '92 - AMD Radeon RX Vega M GL / 870',
    '91 - NVIDIA GeForce GTX 1050 Ti Max-Q',
    '90 - AMD Radeon R9 M395X',
    '85 - NVIDIA GeForce GTX 970M',
    '84 - NVIDIA Quadro M4000M',
    '83 - NVIDIA Quadro P2000 Max-Q',
    '82 - NVIDIA Quadro P2000',
    '81 - NVIDIA GeForce GTX 1050 Ti (Desktop)',
    '80 - NVIDIA GeForce GTX 1050 Ti (Laptop)',
    '79 - NVIDIA GeForce GTX 960',
    '78 - AMD Radeon R9 380',
    '77 - AMD Radeon R9 280X',
    '76 - NVIDIA Quadro M5000M',
    '75 - AMD Radeon Pro Vega 20',
    '74 - AMD Radeon RX Vega M GH',
    '73 - NVIDIA GeForce GTX 980M',
    '66 - AMD Radeon R9 290X',
    '63 - AMD Radeon RX 470 (Laptop)',
    '62 - AMD Radeon RX 570 (Laptop)',
    '61 - AMD Radeon RX 570X (Laptop)',
    '60 - AMD Radeon RX 470 (Desktop)',
    '59 - AMD Radeon Pro WX 7100',
    '57 - NVIDIA Quadro P3000 Max-Q',
    '56 - NVIDIA GeForce GTX 1060 Max-Q',
    '55 - NVIDIA GeForce GTX 970',
    '54 - NVIDIA Quadro P3000',
    '53 - AMD Radeon RX Vega Mobile',
    '51 - AMD Radeon RX 580 (Laptop)',
    '50 - AMD Radeon RX 580X (Laptop)',
    '49 - NVIDIA Quadro P3200',
    '48 - NVIDIA Quadro P4000 Max-Q',
    '47 - NVIDIA GeForce GTX 1060 (Laptop)',
    '46 - AMD Radeon RX 480 (Desktop)',
    '45 - NVIDIA Quadro P4000',
    '44 - NVIDIA GeForce GTX 1060 (Desktop)',
    '42 - AMD Radeon R9 390X',
    '41 - NVIDIA Quadro M5500',
    '40 - NVIDIA GeForce GTX 980 (Laptop)',
    '39 - AMD Radeon RX 580 (Desktop)',
    '38 - AMD Radeon RX 590 (Desktop)',
    '37 - NVIDIA GeForce GTX 980',
    '36 - AMD Radeon R9 Nano',
    '35 - AMD Radeon R9 Fury',
    '33 - NVIDIA Quadro P5000 Max-Q',
    '32 - NVIDIA GeForce GTX 1070 Max-Q',
    '31 - NVIDIA GeForce GTX 980 Ti',
    '30 - NVIDIA Quadro P5000',
    '29 - NVIDIA Quadro P4200',
    '28 - NVIDIA GeForce GTX 1660 Ti (Laptop)',
    '27 - NVIDIA GeForce GTX 1070 (Laptop)',
    '26 - NVIDIA GeForce RTX 2060 Max-Q',
    '25 - NVIDIA GeForce GTX 1080 Max-Q',
    '24 - NVIDIA GeForce GTX 1070 (Desktop)',
    '23 - AMD Radeon Pro Vega 56',
    '22 - NVIDIA Quadro P5200',
    '20 - NVIDIA GeForce RTX 2060 (Laptop)',
    '19 - NVIDIA GeForce GTX 1070 Ti (Desktop)',
    '18 - NVIDIA GeForce RTX 2060 (Desktop)',
    '17 - NVIDIA GeForce RTX 2070 Max-Q',
    '16 - NVIDIA GeForce GTX 1080 (Laptop)',
    '15 - AMD Radeon RX Vega 64',
    '14 - NVIDIA GeForce RTX 2070 (Laptop)',
    '13 - NVIDIA GeForce GTX 1080 (Desktop)',
    '12 - NVIDIA GeForce RTX 2070 (Desktop)',
    '11 - NVIDIA GeForce GTX 1070 SLI (Laptop)',
    '10 - NVIDIA GeForce GTX 1070 SLI (Desktop)',
    '9 - NVIDIA GeForce GTX 1080 SLI (Laptop)',
    '8 - NVIDIA Titan X Pascal',
    '7 - NVIDIA GeForce GTX 1080 Ti (Desktop)',
    '6 - NVIDIA GeForce RTX 2080 Max-Q',
    '5 - NVIDIA GeForce RTX 2080 (Laptop)',
    '4 - AMD Radeon VII',
    '3 - NVIDIA GeForce RTX 2080 (Desktop)',
    '2 - NVIDIA GeForce RTX 2080 Ti (Desktop)',
    '1 - NVIDIA Titan RTX',
];
var GPU_BENCHMARK_SCORE_MOBILE = [
    '878 - ARM Mali-200',
    '877 - Qualcomm Adreno 200',
    '876 - PowerVR SGX530',
    '875 - PowerVR SGX531',
    '874 - PowerVR SGX535',
    '873 - Vivante GC800',
    '872 - Qualcomm Adreno 203',
    '871 - Qualcomm Adreno 205',
    '869 - PowerVR SGX540',
    '867 - NVIDIA GeForce ULP (Tegra 2)',
    '866 - ARM Mali-400 MP',
    '865 - ARM Mali-400 MP2',
    '864 - Vivante GC1000+ Dual-Core',
    '863 - Qualcomm Adreno 220',
    '862 - Broadcom VideoCore-IV',
    '861 - NVIDIA GeForce ULP (Tegra 3)',
    '860 - ARM Mali-400 MP4',
    '859 - Vivante GC4000',
    '858 - Qualcomm Adreno 225',
    '850 - Qualcomm Adreno 302',
    '849 - Vivante GC7000UL',
    '848 - ARM Mali-T720',
    '847 - Qualcomm Adreno 304',
    '846 - Qualcomm Adreno 305',
    '845 - Qualcomm Adreno 306',
    '844 - Qualcomm Adreno 308',
    '843 - PowerVR SGX544',
    '842 - ARM Mali-T720 MP2',
    '841 - PowerVR SGX544MP2',
    '840 - PowerVR SGX545',
    '837 - PowerVR SGX543MP2',
    '827 - PowerVR SGX543MP3',
    '819 - ARM Mali-T830 MP1',
    '818 - ARM Mali-450 MP4',
    '817 - ARM Mali-T720 MP4',
    '816 - PowerVR GE8100',
    '815 - PowerVR GE8320',
    '814 - ARM Mali-T760 MP2',
    '813 - Qualcomm Adreno 320',
    '812 - ARM Mali-T624',
    '811 - PowerVR SGX543MP4',
    '784 - ARM Mali-T830 MP2',
    '783 - Qualcomm Adreno 405',
    '782 - PowerVR G6200',
    '781 - NVIDIA GeForce Tegra 4',
    '776 - ARM Mali-T604 MP4',
    '770 - ARM Mali-T830 MP3',
    '769 - ARM Mali-T860 MP2',
    '765 - Qualcomm Adreno 505',
    '764 - Qualcomm Adreno 506',
    '763 - Qualcomm Adreno 508',
    '762 - Qualcomm Adreno 509',
    '761 - ARM Mali-T628 MP4',
    '760 - PowerVR SGX554MP4',
    '722 - ARM Mali-T760 MP4',
    '721 - ARM Mali-T628 MP6',
    '720 - Intel HD Graphics (Bay Trail)',
    '719 - PowerVR G6400',
    '718 - PowerVR GX6250',
    '717 - PowerVR G6430',
    '716 - Qualcomm Adreno 330',
    '715 - Qualcomm Adreno 510',
    '714 - Qualcomm Adreno 512',
    '651 - Intel HD Graphics (Cherry Trail)',
    '638 - ARM Mali-G51 MP4',
    '636 - Qualcomm Adreno 616',
    '635 - Qualcomm Adreno 418',
    '615 - Qualcomm Adreno 420',
    '614 - PowerVR GX6450',
    '604 - ARM Mali-T880 MP2',
    '603 - ARM Mali-T760 MP6',
    '571 - ARM Mali-T880 MP4',
    '570 - ARM Mali-G72 MP3',
    '549 - Qualcomm Adreno 430',
    '546 - ARM Mali-G71 MP2',
    '545 - ARM Mali-T760 MP8',
    '499 - ARM Mali-T880 MP12',
    '498 - Apple A9 / PowerVR GT7600',
    '497 - NVIDIA Tegra K1 Kepler GPU',
    '496 - PowerVR GXA6850',
    '495 - Qualcomm Adreno 530',
    '456 - ARM Mali-G71 MP8',
    '455 - ARM Mali-G72 MP12',
    '454 - ARM Mali-G71 MP20',
    '453 - ARM Mali-G72 MP18',
    '452 - Qualcomm Adreno 540',
    '451 - ARM Mali-G76 MP10',
    '450 - ARM Mali-G76 MP12',
    '449 - Qualcomm Adreno 630',
    '448 - Qualcomm Adreno 640',
    '433 - Apple A10 Fusion GPU / PowerVR',
    '346 - NVIDIA Tegra X1 Maxwell GPU',
    '323 - Apple A9X / PowerVR Series 7XT',
    '287 - Apple A10X Fusion GPU / PowerVR',
    '286 - Apple A11 Bionic GPU',
    '285 - Apple A12 Bionic GPU',
    '256 - Apple A12X Bionic GPU',
];

// Data
// @ts-check
var isWebGLSupported$1 = function () {
    var attributes = {
        alpha: false,
        antialias: false,
        depth: false,
        failIfMajorPerformanceCaveat: true,
        stencil: false,
    };
    // Keep reference to the canvas and context in order to clean up
    // after the necessary information has been extracted
    var canvas = document.createElement('canvas');
    var gl = canvas.getContext('webgl', attributes) || canvas.getContext('experimental-webgl', attributes);
    if (!gl || !(gl instanceof WebGLRenderingContext)) {
        return false;
    }
    return gl;
};
var getWebGLUnmaskedRenderer = function (gl) {
    if (gl) {
        var glExtensionDebugRendererInfo = gl.getExtension('WEBGL_debug_renderer_info');
        var renderer = glExtensionDebugRendererInfo &&
            gl.getParameter(glExtensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL);
        return renderer;
    }
    return false;
};
// Get benchmark entry's by percentage of the total benchmark entries
var getBenchmarkByPercentage = function (benchmark, percentages) {
    var chunkOffset = 0;
    var benchmarkTiers = percentages.map(function (percentage) {
        var chunkSize = Math.round((benchmark.length / 100) * percentage);
        var chunk = benchmark.slice(chunkOffset, chunkOffset + chunkSize);
        chunkOffset += chunkSize;
        return chunk;
    });
    return benchmarkTiers;
};
var cleanEntryString = function (entryString) {
    return entryString
        .toLowerCase() // Lowercase all for easier matching
        .split('- ')[1] // Remove prelude score (`3 - `)
        .split(' /')[0];
}; // Reduce 'apple a9x / powervr series 7xt' to 'apple a9x'
var getEntryVersionNumber = function (entryString) { return entryString.replace(/[\D]/g, ''); }; // Grab and concat all digits in the string
var cleanRendererString = function (rendererString) {
    var cleanedRendererString = rendererString.toLowerCase();
    // Strip off ANGLE and Direct3D version
    if (cleanedRendererString.includes('angle (') && cleanedRendererString.includes('direct3d')) {
        cleanedRendererString = cleanedRendererString.replace('angle (', '').split(' direct3d')[0];
    }
    // Strip off the GB amount (1060 6gb was being concatenated to 10606 and because of it using the fallback)
    if (cleanedRendererString.includes('nvidia') && cleanedRendererString.includes('gb')) {
        cleanedRendererString = cleanedRendererString.split(/\dgb/)[0];
    }
    return cleanedRendererString;
};
var getGPUTier = function (options) {
    if (options === void 0) { options = {}; }
    var mobileBenchmarkPercentages = options.mobileBenchmarkPercentages || [
        0,
        50,
        30,
        20,
    ];
    var desktopBenchmarkPercentages = options.desktopBenchmarkPercentages || [
        0,
        50,
        30,
        20,
    ];
    var forceRendererString = options.forceRendererString || false;
    var forceMobile = options.forceMobile || false;
    var renderer;
    var tier;
    var type;
    var gl = isWebGLSupported$1();
    // WebGL support is missing
    if (!gl) {
        if (isMobile || isTablet || forceMobile) {
            return {
                tier: 'GPU_MOBILE_TIER_0',
                type: 'WEBGL_UNSUPPORTED',
            };
        }
        return {
            tier: 'GPU_DESKTOP_TIER_0',
            type: 'WEBGL_UNSUPPORTED',
        };
    }
    if (forceRendererString === false) {
        renderer = getWebGLUnmaskedRenderer(gl);
    }
    else {
        renderer = forceRendererString;
    }
    renderer = cleanRendererString(renderer);
    var rendererVersionNumber = renderer.replace(/[\D]/g, '');
    // GPU BLACKLIST
    // https://wiki.mozilla.org/Blocklisting/Blocked_Graphics_Drivers
    // https://www.khronos.org/webgl/wiki/BlacklistsAndWhitelists
    // https://chromium.googlesource.com/chromium/src/+/master/gpu/config/software_rendering_list.json
    // https://chromium.googlesource.com/chromium/src/+/master/gpu/config/gpu_driver_bug_list.json
    var isGPUBlacklisted = /(radeon hd 6970m|radeon hd 6770m|radeon hd 6490m|radeon hd 6630m|radeon hd 6750m|radeon hd 5750|radeon hd 5670|radeon hd 4850|radeon hd 4870|radeon hd 4670|geforce 9400m|geforce 320m|geforce 330m|geforce gt 130|geforce gt 120|geforce gtx 285|geforce 8600|geforce 9600m|geforce 9400m|geforce 8800 gs|geforce 8800 gt|quadro fx 5|quadro fx 4|radeon hd 2600|radeon hd 2400|radeon hd 2600|mali-4|mali-3|mali-2)/.test(renderer);
    if (isGPUBlacklisted) {
        if (isMobile || isTablet || forceMobile) {
            return {
                tier: 'GPU_MOBILE_TIER_0',
                type: 'BLACKLISTED',
            };
        }
        return {
            tier: 'GPU_DESKTOP_TIER_0',
            type: 'BLACKLISTED',
        };
    }
    if (isMobile || isTablet || forceMobile) {
        var mobileBenchmark = getBenchmarkByPercentage(GPU_BENCHMARK_SCORE_MOBILE, mobileBenchmarkPercentages);
        var isRendererAdreno_1 = renderer.includes('adreno');
        var isRendererApple_1 = renderer.includes('apple');
        var isRendererMali_1 = renderer.includes('mali') && !renderer.includes('mali-t');
        var isRendererMaliT_1 = renderer.includes('mali-t');
        var isRendererNVIDIA_1 = renderer.includes('nvidia');
        var isRendererPowerVR_1 = renderer.includes('powervr');
        mobileBenchmark.forEach(function (benchmarkTier, index) {
            return benchmarkTier.forEach(function (benchmarkEntry) {
                var entry = cleanEntryString(benchmarkEntry);
                var entryVersionNumber = getEntryVersionNumber(entry);
                if ((entry.includes('adreno') && isRendererAdreno_1) ||
                    (entry.includes('apple') && isRendererApple_1) ||
                    (entry.includes('mali') && !entry.includes('mali-t') && isRendererMali_1) ||
                    (entry.includes('mali-t') && isRendererMaliT_1) ||
                    (entry.includes('nvidia') && isRendererNVIDIA_1) ||
                    (entry.includes('powervr') && isRendererPowerVR_1)) {
                    if (entryVersionNumber.includes(rendererVersionNumber)) {
                        tier = "GPU_MOBILE_TIER_" + index;
                        type = "BENCHMARK - " + entry;
                    }
                    // Handle mobile edge cases
                }
            });
        });
        if (!tier) {
            tier = 'GPU_MOBILE_TIER_1';
            type = 'FALLBACK';
        }
        return {
            tier: tier,
            type: type,
        };
    }
    if (isDesktop) {
        var desktopBenchmark = getBenchmarkByPercentage(GPU_BENCHMARK_SCORE_DESKTOP, desktopBenchmarkPercentages);
        var isRendererIntel_1 = renderer.includes('intel');
        var isRendererAMD_1 = renderer.includes('amd');
        var isRendererNVIDIA_2 = renderer.includes('nvidia');
        desktopBenchmark.forEach(function (benchmarkTier, index) {
            return benchmarkTier.forEach(function (benchmarkEntry) {
                var entry = cleanEntryString(benchmarkEntry);
                var entryVersionNumber = getEntryVersionNumber(entry);
                if ((entry.includes('intel') && isRendererIntel_1) ||
                    (entry.includes('amd') && isRendererAMD_1) ||
                    (entry.includes('nvidia') && isRendererNVIDIA_2)) {
                    if (entryVersionNumber.includes(rendererVersionNumber)) {
                        tier = "GPU_DESKTOP_TIER_" + index;
                        type = "BENCHMARK - " + entry;
                    }
                    // Handle desktop edge cases
                }
            });
        });
        if (!tier) {
            tier = 'GPU_DESKTOP_TIER_1';
            type = 'FALLBACK';
        }
        return {
            tier: tier,
            type: type,
        };
    }
    return {
        tier: tier,
        type: type,
    };
};

/**
 * Gets the CPU cores available for web worker threading
 */
var getWebWorkerPoolSize = (function () { return navigator.hardwareConcurrency || 0; })();

// Browser features
var features = {
    // Browser features
    browserFeatures: {
        browserType: getBrowserType,
        isAnimationWorkletSupported: isAnimationWorkletSupported,
        isAudioWorkletSupported: isAudioWorkletSupported,
        isBroadcastChannelSupported: isBroadcastChannelSupported,
        isFetchSupported: isFetchSupported,
        isGamepadSupported: isGamepadSupported,
        isImageBitmapSupported: isImageBitmapSupported,
        isImageDecodeSupported: isImageDecodeSupported,
        isIndexedDBSupported: isIndexedDBSupported,
        isIntersectionObserverSupported: isIntersectionObserverSupported,
        isLayoutWorkletSupported: isLayoutWorkletSupported,
        isLocalStorageSupported: isLocalStorageSupported,
        isMutationObserverSupported: isMutationObserverSupported,
        isOffscreenCanvasSupported: isOffscreenCanvasSupported,
        isPaintWorkletSupported: isPaintWorkletSupported,
        isPerformanceNowSupported: isPerformanceNowSupported,
        isPerformanceObserverSupported: isPerformanceObserverSupported,
        isRequestIdleCallbackSupported: isRequestIdleCallbackSupported,
        isServiceWorkerSupported: isServiceWorkerSupported,
        isSessionStorageSupported: isSessionStorageSupported,
        isUserActivationSupported: isUserActivationSupported,
        isWebAssemblySupported: isWebAssemblySupported,
        isWebAudioSupported: isWebAudioSupported,
        // !! Device driver bug: Work around bug on Samsung Galaxy S and A series
        // !! it appears to have problems with immediately evaluated support checking for WebGL 2 (not WebGL)
        isWebGL2Supported: isWebGL2Supported(),
        isWebGLSupported: isWebGLSupported,
        isWebPSupported: isWebPSupported,
        isWebRTCSupported: isWebRTCSupported,
        isWebSocketSupported: isWebSocketSupported,
        isWebVRSupported: isWebVRSupported,
        isWebWorkerInlineSupported: isWebWorkerInlineSupported,
        isWebWorkerSupported: isWebWorkerSupported,
        isWebXRSupported: isWebXRSupported,
        mediaFeatures: getMediaFeatures,
        // !! Device driver bug: Work around bug on Samsung Galaxy S and A series
        // !! it appears to have problems with immediately evaluated support checking for WebGL 2 (not WebGL)
        webGL2Features: getWebGL2Features(),
        webGLFeatures: getWebGLFeatures,
    },
    // Browser settings
    browserSettings: {
        isCookieEnabled: isCookieEnabled,
        isDoNotTrackEnabled: isDoNotTrackEnabled,
    },
    // Hardware features
    hardwareFeatures: {
        devicePixelRatio: getDevicePixelRatio,
        endianness: getEndianness,
        workerPoolSize: getWebWorkerPoolSize,
    },
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/* Font Face Observer v3.3.1 - © Bram Stein - Damien Seguin. License: BSD-3-Clause */
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var styles = {
  maxWidth: "none",
  display: "inline-block",
  position: "absolute",
  height: "100%",
  width: "100%",
  overflow: "scroll",
  fontSize: "16px"
};
var collapsibleInnerStyles = {
  display: "inline-block",
  height: "200%",
  width: "200%",
  fontSize: "16px",
  maxWidth: "none"
};
var fontStyle = {
  maxWidth: "none",
  minWidth: "20px",
  minHeight: "20px",
  display: "inline-block",
  overflow: "hidden",
  position: "absolute",
  width: "auto",
  margin: "0",
  padding: "0",
  top: "-999px",
  whiteSpace: "nowrap",
  fontSynthesis: "none"
};

var Ruler =
/*#__PURE__*/
function () {
  /**
   *
   * @param {string} text
   */
  function Ruler(text) {
    _classCallCheck(this, Ruler);

    this.element = document.createElement("div");
    this.element.setAttribute("aria-hidden", "true");
    this.element.appendChild(document.createTextNode(text));
    this.collapsible = document.createElement("span");
    this.expandable = document.createElement("span");
    this.collapsibleInner = document.createElement("span");
    this.expandableInner = document.createElement("span");
    this.lastOffsetWidth = -1;
    Object.assign(this.collapsible.style, styles);
    Object.assign(this.expandable.style, styles);
    Object.assign(this.expandableInner.style, styles);
    Object.assign(this.collapsibleInner.style, collapsibleInnerStyles);
    this.collapsible.appendChild(this.collapsibleInner);
    this.expandable.appendChild(this.expandableInner);
    this.element.appendChild(this.collapsible);
    this.element.appendChild(this.expandable);
  }
  /**
   * @return {Element}
   */


  _createClass(Ruler, [{
    key: "getElement",
    value: function getElement() {
      return this.element;
    }
    /**
     * @param {string} font
     */

  }, {
    key: "setFont",
    value: function setFont(font) {
      Object.assign(this.element.style, _objectSpread({}, fontStyle, {
        font: font
      }));
    }
    /**
     * @return {number}
     */

  }, {
    key: "getWidth",
    value: function getWidth() {
      return this.element.offsetWidth;
    }
    /**
     * @param {string} width
     */

  }, {
    key: "setWidth",
    value: function setWidth(width) {
      this.element.style.width = width + "px";
    }
    /**
     * @private
     *
     * @return {boolean}
     */

  }, {
    key: "reset",
    value: function reset() {
      var offsetWidth = this.getWidth();
      var width = offsetWidth + 100;
      this.expandableInner.style.width = width + "px";
      this.expandable.scrollLeft = width;
      this.collapsible.scrollLeft = this.collapsible.scrollWidth + 100;

      if (this.lastOffsetWidth !== offsetWidth) {
        this.lastOffsetWidth = offsetWidth;
        return true;
      } else {
        return false;
      }
    }
    /**
     * @private
     * @param {function(number)} callback
     */

  }, {
    key: "onScroll",
    value: function onScroll(callback) {
      if (this.reset() && this.element.parentNode !== null) {
        callback(this.lastOffsetWidth);
      }
    }
    /**
     * @param {function(number)} callback
     */

  }, {
    key: "onResize",
    value: function onResize(callback) {
      var that = this;

      function onScroll() {
        that.onScroll(callback);
      }

      this.collapsible.addEventListener("scroll", onScroll);
      this.expandable.addEventListener("scroll", onScroll);
      this.reset();
    }
  }]);

  return Ruler;
}();

function onReady(callback) {
  document.body ? callback() : document.addEventListener ? document.addEventListener("DOMContentLoaded", function c() {
    document.removeEventListener("DOMContentLoaded", c);
    callback();
  }) : document.attachEvent("onreadystatechange", function k() {
    if ("interactive" == document.readyState || "complete" == document.readyState) document.detachEvent("onreadystatechange", k), callback();
  });
}

/** Class for FontFaceObserver. */

var FontFaceObserver =
/*#__PURE__*/
function () {
  _createClass(FontFaceObserver, null, [{
    key: "getUserAgent",

    /**
     * @type {null|boolean}
     */

    /**
     * @type {null|boolean}
     */

    /**
     * @type {null|boolean}
     */

    /**
     * @type {null|boolean}
     */

    /**
     * @type {number}
     */

    /**
     * @return {string}
     */
    value: function getUserAgent() {
      return window.navigator.userAgent;
    }
    /**
     * @return {string}
     */

  }, {
    key: "getNavigatorVendor",
    value: function getNavigatorVendor() {
      return window.navigator.vendor;
    }
    /**
     * Returns true if this browser is WebKit and it has the fallback bug which is
     * present in WebKit 536.11 and earlier.
     *
     * @return {boolean}
     */

  }, {
    key: "hasWebKitFallbackBug",
    value: function hasWebKitFallbackBug() {
      if (FontFaceObserver.HAS_WEBKIT_FALLBACK_BUG === null) {
        var match = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(FontFaceObserver.getUserAgent());
        FontFaceObserver.HAS_WEBKIT_FALLBACK_BUG = !!match && (parseInt(match[1], 10) < 536 || parseInt(match[1], 10) === 536 && parseInt(match[2], 10) <= 11);
      }

      return FontFaceObserver.HAS_WEBKIT_FALLBACK_BUG;
    }
    /**
     * Returns true if the browser has the Safari 10 bugs. The native font load
     * API in Safari 10 has two bugs that cause the document.fonts.load and
     * FontFace.prototype.load methods to return promises that don't reliably get
     * settled.
     *
     * The bugs are described in more detail here:
     *  - https://bugs.webkit.org/show_bug.cgi?id=165037
     *  - https://bugs.webkit.org/show_bug.cgi?id=164902
     *
     * If the browser is made by Apple, and has native font loading support, it is
     * potentially affected. But the API was fixed around AppleWebKit version 603,
     * so any newer versions that that does not contain the bug.
     *
     * @return {boolean}
     */

  }, {
    key: "hasSafari10Bug",
    value: function hasSafari10Bug() {
      if (FontFaceObserver.HAS_SAFARI_10_BUG === null) {
        if (FontFaceObserver.supportsNativeFontLoading() && /Apple/.test(FontFaceObserver.getNavigatorVendor())) {
          var match = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(FontFaceObserver.getUserAgent());
          FontFaceObserver.HAS_SAFARI_10_BUG = !!match && parseInt(match[1], 10) < 603;
        } else {
          FontFaceObserver.HAS_SAFARI_10_BUG = false;
        }
      }

      return FontFaceObserver.HAS_SAFARI_10_BUG;
    }
    /**
     * Returns true if the browser supports the native font loading API.
     *
     * @return {boolean}
     */

  }, {
    key: "supportsNativeFontLoading",
    value: function supportsNativeFontLoading() {
      if (FontFaceObserver.SUPPORTS_NATIVE_FONT_LOADING === null) {
        FontFaceObserver.SUPPORTS_NATIVE_FONT_LOADING = !!document["fonts"];
      }

      return FontFaceObserver.SUPPORTS_NATIVE_FONT_LOADING;
    }
    /**
     * Returns true if the browser supports font-style in the font short-hand
     * syntax.
     *
     * @return {boolean}
     */

  }, {
    key: "supportStretch",
    value: function supportStretch() {
      if (FontFaceObserver.SUPPORTS_STRETCH === null) {
        var div = document.createElement("div");

        try {
          div.style.font = "condensed 100px sans-serif";
        } catch (e) {}

        FontFaceObserver.SUPPORTS_STRETCH = div.style.font !== "";
      }

      return FontFaceObserver.SUPPORTS_STRETCH;
    }
    /**
     * @typedef {Object} Descriptors
     * @property {string|undefined} style
     * @property {string|undefined} weight
     * @property {string|undefined} stretch
     */

    /**
     *
     * @param {string} family font-family name (required)
     * @param {Descriptors} descriptors an object describing the variation
     * (optional). The object can contain `weight`, `style`, and `stretch`
     * properties. If a property is not present it will default to `normal`.
     */

  }]);

  function FontFaceObserver(family) {
    var descriptors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, FontFaceObserver);

    this.family = family;
    this.style = descriptors.style || "normal";
    this.weight = descriptors.weight || "normal";
    this.stretch = descriptors.stretch || "normal";
    return this;
  }
  /**
   * @param {string=} text Optional test string to use for detecting if a font
   * is available.
   * @param {number=} timeout Optional timeout for giving up on font load
   * detection and rejecting the promise (defaults to 3 seconds).
   * @return {Promise.<FontFaceObserver>}
   */


  _createClass(FontFaceObserver, [{
    key: "load",
    value: function load(text, timeout) {
      var that = this;
      var testString = text || "BESbswy";
      var timeoutId = 0;
      var timeoutValue = timeout || FontFaceObserver.DEFAULT_TIMEOUT;
      var start = that.getTime();
      return new Promise(function (resolve, reject) {
        if (FontFaceObserver.supportsNativeFontLoading() && !FontFaceObserver.hasSafari10Bug()) {
          var loader = new Promise(function (resolve, reject) {
            var check = function check() {
              var now = that.getTime();

              if (now - start >= timeoutValue) {
                reject(new Error("" + timeoutValue + "ms timeout exceeded"));
              } else {
                document.fonts.load(that.getStyle('"' + that["family"] + '"'), testString).then(function (fonts) {
                  if (fonts.length >= 1) {
                    resolve();
                  } else {
                    setTimeout(check, 25);
                  }
                }, reject);
              }
            };

            check();
          });
          var timer = new Promise(function (resolve, reject) {
            timeoutId = setTimeout(function () {
              reject(new Error("" + timeoutValue + "ms timeout exceeded"));
            }, timeoutValue);
          });
          Promise.race([timer, loader]).then(function () {
            clearTimeout(timeoutId);
            resolve(that);
          }, reject);
        } else {
          onReady(function () {
            var rulerA = new Ruler(testString);
            var rulerB = new Ruler(testString);
            var rulerC = new Ruler(testString);
            var widthA = -1;
            var widthB = -1;
            var widthC = -1;
            var fallbackWidthA = -1;
            var fallbackWidthB = -1;
            var fallbackWidthC = -1;
            var container = document.createElement("div");
            /**
             * @private
             */

            function removeContainer() {
              if (container.parentNode !== null) {
                container.parentNode.removeChild(container);
              }
            }
            /**
             * @private
             *
             * If metric compatible fonts are detected, one of the widths will be
             * -1. This is because a metric compatible font won't trigger a scroll
             * event. We work around this by considering a font loaded if at least
             * two of the widths are the same. Because we have three widths, this
             * still prevents false positives.
             *
             * Cases:
             * 1) Font loads: both a, b and c are called and have the same value.
             * 2) Font fails to load: resize callback is never called and timeout
             *    happens.
             * 3) WebKit bug: both a, b and c are called and have the same value,
             *    but the values are equal to one of the last resort fonts, we
             *    ignore this and continue waiting until we get new values (or a
             *    timeout).
             */


            function check() {
              if (widthA != -1 && widthB != -1 || widthA != -1 && widthC != -1 || widthB != -1 && widthC != -1) {
                if (widthA == widthB || widthA == widthC || widthB == widthC) {
                  // All values are the same, so the browser has most likely
                  // loaded the web font
                  if (FontFaceObserver.hasWebKitFallbackBug()) {
                    // Except if the browser has the WebKit fallback bug, in which
                    // case we check to see if all values are set to one of the
                    // last resort fonts.
                    if (widthA == fallbackWidthA && widthB == fallbackWidthA && widthC == fallbackWidthA || widthA == fallbackWidthB && widthB == fallbackWidthB && widthC == fallbackWidthB || widthA == fallbackWidthC && widthB == fallbackWidthC && widthC == fallbackWidthC) {
                      // The width we got matches some of the known last resort
                      // fonts, so let's assume we're dealing with the last resort
                      // font.
                      return;
                    }
                  }

                  removeContainer();
                  clearTimeout(timeoutId);
                  resolve(that);
                }
              }
            } // This ensures the scroll direction is correct.


            container.dir = "ltr";
            rulerA.setFont(that.getStyle("sans-serif"));
            rulerB.setFont(that.getStyle("serif"));
            rulerC.setFont(that.getStyle("monospace"));
            container.appendChild(rulerA.getElement());
            container.appendChild(rulerB.getElement());
            container.appendChild(rulerC.getElement());
            document.body.appendChild(container);
            fallbackWidthA = rulerA.getWidth();
            fallbackWidthB = rulerB.getWidth();
            fallbackWidthC = rulerC.getWidth();

            function checkForTimeout() {
              var now = that.getTime();

              if (now - start >= timeoutValue) {
                removeContainer();
                reject(new Error("" + timeoutValue + "ms timeout exceeded"));
              } else {
                var hidden = document["hidden"];

                if (hidden === true || hidden === undefined) {
                  widthA = rulerA.getWidth();
                  widthB = rulerB.getWidth();
                  widthC = rulerC.getWidth();
                  check();
                }

                timeoutId = setTimeout(checkForTimeout, 50);
              }
            }

            checkForTimeout();
            rulerA.onResize(function (width) {
              widthA = width;
              check();
            });
            rulerA.setFont(that.getStyle('"' + that["family"] + '",sans-serif'));
            rulerB.onResize(function (width) {
              widthB = width;
              check();
            });
            rulerB.setFont(that.getStyle('"' + that["family"] + '",serif'));
            rulerC.onResize(function (width) {
              widthC = width;
              check();
            });
            rulerC.setFont(that.getStyle('"' + that["family"] + '",monospace'));
          });
        }
      });
    }
    /**
     * @private
     *
     * @param {string} family
     * @return {string}
     */

  }, {
    key: "getStyle",
    value: function getStyle(family) {
      return [this.style, this.weight, FontFaceObserver.supportStretch() ? this.stretch : "", "100px", family].join(" ");
    }
    /**
     * @private
     *
     * @return {number}
     */

  }, {
    key: "getTime",
    value: function getTime() {
      return new Date().getTime();
    }
  }]);

  return FontFaceObserver;
}();

_defineProperty(FontFaceObserver, "Ruler", Ruler);

_defineProperty(FontFaceObserver, "HAS_WEBKIT_FALLBACK_BUG", null);

_defineProperty(FontFaceObserver, "HAS_SAFARI_10_BUG", null);

_defineProperty(FontFaceObserver, "SUPPORTS_STRETCH", null);

_defineProperty(FontFaceObserver, "SUPPORTS_NATIVE_FONT_LOADING", null);

_defineProperty(FontFaceObserver, "DEFAULT_TIMEOUT", 3000);

/**
 * Convert ArrayBuffer to Blob
 *
 * @param buffer Buffer to convert
 * @param type MIME type of ArrayBuffer to store
 */
var convertArrayBufferToBlob = function (buffer, type) {
    return new Blob([buffer], { type: type });
};

/**
 * Convert Blob to ArrayBuffer
 *
 * @param blob Blob to convert
 */
var convertBlobToArrayBuffer = function (blob) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.addEventListener('loadend', function (event) {
            // @ts-ignore
            resolve(reader.result);
        });
        reader.addEventListener('error', reject);
        reader.readAsArrayBuffer(blob);
    });
};

/**
 * Creates a single interface around the Crypto API (IE 11 requires a `ms` prefix)
 *
 * For current browser support please refer to: https://caniuse.com/#search=crypto
 */
var getRandomValuesInterface = (typeof crypto !== 'undefined' &&
    crypto.getRandomValues &&
    crypto.getRandomValues.bind(crypto)) ||
    // @ts-ignore msCrypto does not have a type entry but is valid in IE 11
    (typeof msCrypto !== 'undefined' &&
        // @ts-ignore msCrypto does not have a type entry but is valid in IE 11
        typeof window.msCrypto.getRandomValues === 'function' &&
        // @ts-ignore msCrypto does not have a type entry but is valid in IE 11
        msCrypto.getRandomValues.bind(msCrypto));
/**
 * Get a 16 random byte values array either using the Crypto API or the Math.random() fallback
 */
var getRandomValues = function () {
    if (getRandomValuesInterface) {
        var data = new Uint8Array(16);
        getRandomValuesInterface(data);
        return data;
    }
    else {
        var data = new Array(16);
        var r = 0;
        for (var i = 0; i < 16; i++) {
            if ((i & 0x03) === 0) {
                r = Math.random() * 0x100000000;
            }
            data[i] = (r >>> ((i & 0x03) << 3)) & 0xff;
        }
        return data;
    }
};
/**
 * Compute byte to hexadecimal array
 */
var hex = [];
for (var i = 0; i < 256; i++) {
    hex[i] = (i + 0x100).toString(16).substr(1);
}
/**
 * Create a 32 character RFC-compliant V4 unique identifier
 *
 * https://www.ietf.org/rfc/rfc4122.txt
 */
var createUUID = function () {
    var r = getRandomValues();
    /**
     * Convert array of 16 byte values to UUID string format of the form:
     * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
     */
    // Per V4.4, set bits for version and `clock_seq_hi_and_reserved`
    r[6] = (r[6] & 0x0f) | 0x40;
    r[8] = (r[8] & 0x3f) | 0x80;
    // Possibly necessary to work out a memory issue in Chrome and Node
    // https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
    // return [
    //   hex[r[0]],
    //   hex[r[1]],
    //   hex[r[2]],
    //   hex[r[3]],
    //   '-',
    //   hex[r[4]],
    //   hex[r[5]],
    //   '-',
    //   hex[r[6]],
    //   hex[r[7]],
    //   '-',
    //   hex[r[8]],
    //   hex[r[9]],
    //   '-',
    //   hex[r[10]],
    //   hex[r[11]],
    //   hex[r[12]],
    //   hex[r[13]],
    //   hex[r[14]],
    //   hex[r[15]],
    // ].join('');
    return (hex[r[0]] +
        hex[r[1]] +
        hex[r[2]] +
        hex[r[3]] +
        '-' +
        hex[r[4]] +
        hex[r[5]] +
        '-' +
        hex[r[6]] +
        hex[r[7]] +
        '-' +
        hex[r[8]] +
        hex[r[9]] +
        '-' +
        hex[r[10]] +
        hex[r[11]] +
        hex[r[12]] +
        hex[r[13]] +
        hex[r[14]] +
        hex[r[15]]);
};

/**
 * Get search parameters from URL
 *
 * ?isDebug=false&isGUI=true would result in { isDebug: false, isGUI: true }
 *
 * @param url query parameters
 */
var getQueryParameters = function (url) {
    if (url === void 0) { url = window.location.search; }
    return url
        // Remove ?
        .slice(1)
        // Split by &
        .split('&')
        // Find parameters
        .map(function (param) { return param.split('='); })
        // Construct { key: value } pairs
        .reduce(function (values, _a) {
        var key = _a[0], value = _a[1];
        // @ts-ignore implicit any, has no index structure
        values[key] = value;
        return values;
    }, {});
};

// Utilities

// Enums
/**
 * Keys used for the loaders
 */
var ELoaderKey;
(function (ELoaderKey) {
    ELoaderKey["ArrayBuffer"] = "ArrayBuffer";
    ELoaderKey["Audio"] = "Audio";
    ELoaderKey["Blob"] = "Blob";
    ELoaderKey["Font"] = "Font";
    ELoaderKey["Image"] = "Image";
    ELoaderKey["ImageBitmap"] = "ImageBitmap";
    ELoaderKey["ImageCompressed"] = "ImageCompressed";
    ELoaderKey["JSON"] = "JSON";
    ELoaderKey["Text"] = "Text";
    ELoaderKey["Video"] = "Video";
    ELoaderKey["WebAssembly"] = "WebAssembly";
    ELoaderKey["XML"] = "XML";
})(ELoaderKey || (ELoaderKey = {}));

/**
 * Loader types and the extensions they handle
 * Allows the omission of the loader key for some generic extensions used on the web
 */
var LOADER_EXTENSIONS_MAP = new Map([
    [ELoaderKey.Audio, { extensions: ['mp3', 'ogg', 'wav', 'flac'] }],
    [ELoaderKey.Font, { extensions: ['woff2', 'woff', 'ttf', 'otf', 'eot'] }],
    [ELoaderKey.Image, { extensions: ['jpeg', 'jpg', 'gif', 'png', 'webp'] }],
    [ELoaderKey.ImageBitmap, { extensions: ['jpeg', 'jpg', 'gif', 'png', 'webp'] }],
    [ELoaderKey.ImageCompressed, { extensions: ['ktx'] }],
    [ELoaderKey.JSON, { extensions: ['json'] }],
    [ELoaderKey.Text, { extensions: ['txt'] }],
    [ELoaderKey.Video, { extensions: ['webm', 'ogg', 'mp4'] }],
    [ELoaderKey.WebAssembly, { extensions: ['wasm', 'wat'] }],
    [
        ELoaderKey.XML,
        {
            defaultMimeType: 'text/xml',
            extensions: ['xml', 'svg', 'html'],
            mimeType: {
                html: 'text/html',
                svg: 'image/svg+xml',
                xml: 'text/xml',
            },
        },
    ],
]);
// Safari does not fire `canplaythrough` preventing it from resolving naturally.
// A workaround is to not wait for the `canplaythrough` event but rather resolve early and hope for the best
var IS_MEDIA_PRELOAD_SUPPORTED = !getBrowserType.isSafari;
/**
 * Asynchronous asset preloader
 */
var AssetLoader = /** @class */ (function () {
    function AssetLoader() {
        var _this = this;
        this.assets = new Map();
        /**
         * Load the specified manifest (array of items)
         *
         * @param items Items to load
         */
        this.loadAssets = function (items) {
            var loadingAssets = items
                .filter(function (item) { return item; })
                .map(function (item) {
                var startTime = window.performance.now();
                return new Promise(function (resolve) {
                    var cacheHit = _this.assets.get(item.src);
                    if (cacheHit) {
                        resolve({
                            fromCache: true,
                            id: item.id || item.src,
                            item: cacheHit,
                            timeToLoad: window.performance.now() - startTime,
                        });
                    }
                    var loaderType = item.loader || AssetLoader.getLoaderByFileExtension(item.src);
                    var loadedItem;
                    switch (loaderType) {
                        case ELoaderKey.ArrayBuffer:
                            loadedItem = AssetLoader.loadArrayBuffer(item);
                            break;
                        case ELoaderKey.Audio:
                            loadedItem = AssetLoader.loadAudio(item);
                            break;
                        case ELoaderKey.Blob:
                            loadedItem = AssetLoader.loadBlob(item);
                            break;
                        case ELoaderKey.Font:
                            loadedItem = AssetLoader.loadFont(item);
                            break;
                        case ELoaderKey.Image:
                            loadedItem = AssetLoader.loadImage(item);
                            break;
                        case ELoaderKey.ImageBitmap:
                            loadedItem = AssetLoader.loadImageBitmap(item);
                            break;
                        case ELoaderKey.ImageCompressed:
                            loadedItem = AssetLoader.loadImageCompressed(item);
                            break;
                        case ELoaderKey.JSON:
                            loadedItem = AssetLoader.loadJSON(item);
                            break;
                        case ELoaderKey.Text:
                            loadedItem = AssetLoader.loadText(item);
                            break;
                        case ELoaderKey.Video:
                            loadedItem = AssetLoader.loadVideo(item);
                            break;
                        case ELoaderKey.WebAssembly:
                            loadedItem = AssetLoader.loadWebAssembly(item);
                            break;
                        case ELoaderKey.XML:
                            loadedItem = AssetLoader.loadXML(item);
                            break;
                        default:
                            warn('Missing loader, falling back to loading as ArrayBuffer');
                            loadedItem = AssetLoader.loadArrayBuffer(item);
                            break;
                    }
                    loadedItem.then(function (asset) {
                        _this.assets.set(item.src, asset);
                        resolve({
                            fromCache: false,
                            id: item.id || item.src,
                            item: asset,
                            timeToLoad: window.performance.now() - startTime,
                        });
                    });
                });
            });
            var loadedAssets = Promise.all(loadingAssets);
            var progress = 0;
            loadingAssets.forEach(function (promise) {
                return promise.then(function (asset) {
                    progress++;
                    eventEmitter.emit('ALPINE::ASSET_LOADED', {
                        id: asset.id,
                        progress: "" + (progress / loadingAssets.length).toFixed(2),
                        timeToLoad: asset.timeToLoad.toFixed(2) + "ms",
                    });
                });
            });
            return loadedAssets.then(function (assets) {
                var assetMap = new Map();
                assets.forEach(function (asset) {
                    if (assetMap.get(asset.id)) {
                        warn("Detected duplicate id, please use unique id's");
                    }
                    assetMap.set(asset.id, asset.item);
                });
                return assetMap;
            });
        };
    }
    /**
     * Load conditionally based on device type
     */
    AssetLoader.byDeviceType = function (data) {
        return data.DESKTOP && getBrowserType.isDesktop
            ? data.DESKTOP
            : data.TABLET && getBrowserType.isTablet
                ? data.TABLET
                : data.MOBILE;
    };
    /**
     * Load conditionally based on supported compressed texture
     */
    AssetLoader.bySupportedCompressedTexture = function (data) {
        if (getWebGLFeatures) {
            return data.ASTC && getWebGLFeatures.extensions.compressedTextureASTCExtension
                ? data.ASTC
                : data.ETC && getWebGLFeatures.extensions.compressedTextureETCExtension
                    ? data.S3TC
                    : data.PVRTC && getWebGLFeatures.extensions.compressedTexturePVRTCExtension
                        ? data.PVRTC
                        : data.S3TC && getWebGLFeatures.extensions.compressedTextureS3TCExtension
                            ? data.S3TC
                            : data.FALLBACK;
        }
        else {
            return data.FALLBACK;
        }
    };
    /**
     * DOMParser instance for the XML loader
     */
    AssetLoader.domParser = new DOMParser();
    /**
     * Get a file extension from a full asset path
     *
     * @param path Path to asset
     */
    AssetLoader.getFileExtension = function (path) {
        var basename = path.split(/[\\/]/).pop();
        if (!basename) {
            return '';
        }
        var seperator = basename.lastIndexOf('.');
        if (seperator < 1) {
            return '';
        }
        return basename.slice(seperator + 1);
    };
    /**
     * Retrieve mime type from extension
     *
     * @param loaderKey Loader key
     * @param extension extension
     */
    AssetLoader.getMimeType = function (loaderKey, extension) {
        var loader = LOADER_EXTENSIONS_MAP.get(loaderKey);
        return loader.mimeType[extension] || loader.defaultMimeType;
    };
    /**
     * Retrieve loader key from extension (when the loader option isn't specified)
     *
     * @param path File path
     */
    AssetLoader.getLoaderByFileExtension = function (path) {
        var fileExtension = AssetLoader.getFileExtension(path);
        var loader = Array.from(LOADER_EXTENSIONS_MAP).find(function (type) {
            return type[1].extensions.includes(fileExtension);
        });
        return loader ? loader[0] : ELoaderKey.ArrayBuffer;
    };
    /**
     * Fetch wrapper for loading an item, to be processed by a specific loader afterwards
     *
     * @param item Item to fetch
     */
    AssetLoader.fetchItem = function (item) { return fetch(item.src, item.options || {}); };
    /**
     * Load an item and parse the Response as arrayBuffer
     *
     * @param item Item to load
     */
    AssetLoader.loadArrayBuffer = function (item) {
        return AssetLoader.fetchItem(item)
            .then(function (response) { return response.arrayBuffer(); })
            .catch(function (err) {
            warn(err);
        });
    };
    /**
     * Load an item and parse the Response as <audio> element
     *
     * @param item Item to load
     */
    AssetLoader.loadAudio = function (item) {
        return AssetLoader.fetchItem(item)
            .then(function (response) { return response.blob(); })
            .then(function (blob) {
            return new Promise(function (resolve, reject) {
                var audio = document.createElement('audio');
                audio.preload = 'auto';
                audio.autoplay = false;
                if (IS_MEDIA_PRELOAD_SUPPORTED) {
                    audio.addEventListener('canplaythrough', function handler() {
                        audio.removeEventListener('canplaythrough', handler);
                        URL.revokeObjectURL(audio.src);
                        resolve(audio);
                    });
                    audio.addEventListener('error', function handler() {
                        audio.removeEventListener('error', handler);
                        URL.revokeObjectURL(audio.src);
                        reject(audio);
                    });
                }
                audio.src = URL.createObjectURL(blob);
                if (!IS_MEDIA_PRELOAD_SUPPORTED) {
                    // Force the audio to load but resolve immediately as `canplaythrough` event will never be fired
                    audio.load();
                    resolve(audio);
                }
            });
        })
            .catch(function (err) {
            warn(err);
        });
    };
    /**
     * Load an item and parse the Response as blob
     *
     * @param item Item to load
     */
    AssetLoader.loadBlob = function (item) {
        return AssetLoader.fetchItem(item)
            .then(function (response) { return response.blob(); })
            .catch(function (err) {
            warn(err);
        });
    };
    /**
     * Load an item and parse the Response as a FontFace
     *
     * @param item Item to load
     */
    AssetLoader.loadFont = function (item) {
        return new FontFaceObserver(item.id, item.options || {}).load();
    };
    /**
     * Load an item and parse the Response as <image> element
     *
     * @param item Item to load
     */
    AssetLoader.loadImage = function (item) {
        return new Promise(function (resolve, reject) {
            var image = new Image();
            // Check if we can decode non-blocking by loading the image asynchronously using image.decode().then(() => ...)
            // https://www.chromestatus.com/feature/5637156160667648 (Chrome / Safari / Safari iOS)
            if (isImageDecodeSupported) {
                image.src = item.src;
                image
                    .decode()
                    .then(function () {
                    resolve(image);
                })
                    .catch(function (err) {
                    reject(err);
                });
            }
            else {
                // Fallback solution
                // Decode as synchronous blocking on the main thread
                // This is the least favorable method and should preferably only be used in old browsers (Edge, Firefox)
                image.onload = function () {
                    resolve(image);
                };
                image.onerror = function (err) {
                    reject(err);
                };
                image.src = item.src;
            }
        });
    };
    /**
     * Load an item and parse the Response as ImageBitmap element
     *
     * NOTE: Please be cautious when using loadImageBitmap as browser support is still spotty and unreliable
     *
     *  See:
     * - https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html#dom-createimagebitmap
     * - https://caniuse.com/createimagebitmap
     * - https://bugzilla.mozilla.org/show_bug.cgi?id=1335594
     * - https://bugzilla.mozilla.org/show_bug.cgi?id=1363861
     *
     * @param item Item to load
     */
    AssetLoader.loadImageBitmap = function (item) {
        if (isImageBitmapSupported) {
            return AssetLoader.loadBlob(item).then(function (data) {
                if (data) {
                    if (item.loaderOptions) {
                        var _a = item.loaderOptions, sx = _a.sx, sy = _a.sy, sw = _a.sw, sh = _a.sh, options = _a.options;
                        if (sx !== undefined && sy !== undefined && sw !== undefined && sh !== undefined) {
                            if (options !== undefined) {
                                // NOTE: Firefox does not yet support passing options (at least as second parameter) to createImageBitmap and throws
                                // https://bugzilla.mozilla.org/show_bug.cgi?id=1335594
                                // https://www.khronos.org/registry/webgl/specs/latest/1.0/#PIXEL_STORAGE_PARAMETERS
                                // @ts-ignore
                                return createImageBitmap(data, sx, sy, sw, sh, options);
                            }
                            else {
                                return createImageBitmap(data, sx, sy, sw, sh);
                            }
                        }
                        else if (options !== undefined) {
                            // NOTE: Firefox does not yet support passing options (at least as second parameter) to createImageBitmap and throws
                            // https://bugzilla.mozilla.org/show_bug.cgi?id=1335594
                            // https://www.khronos.org/registry/webgl/specs/latest/1.0/#PIXEL_STORAGE_PARAMETERS
                            // @ts-ignore
                            return createImageBitmap(data, options);
                        }
                        else {
                            return createImageBitmap(data);
                        }
                    }
                    else {
                        return createImageBitmap(data);
                    }
                }
                else {
                    // In case something went wrong with loading the blob or corrupted data
                    // Fallback to default image loader
                    warn('Received no or corrupt data, falling back to default image loader');
                    return AssetLoader.loadImage(item);
                }
            });
        }
        else {
            // Fallback to default image loader
            return AssetLoader.loadImage(item);
        }
    };
    /**
     * Load an item and parse the Response as compressed image (KTX container)
     *
     * @param item Item to load
     */
    AssetLoader.loadImageCompressed = function (item) {
        return AssetLoader.loadArrayBuffer(item).then(function (data) {
            if (data) {
                // Switch endianness of value
                var switchEndianness = function (value) {
                    return ((value & 0xff) << 24) |
                        ((value & 0xff00) << 8) |
                        ((value >> 8) & 0xff00) |
                        ((value >> 24) & 0xff);
                };
                // Test that it is a ktx formatted file, based on the first 12 bytes:
                // '´', 'K', 'T', 'X', ' ', '1', '1', 'ª', '\r', '\n', '\x1A', '\n'
                // 0xAB, 0x4B, 0x54, 0x58, 0x20, 0x31, 0x31, 0xBB, 0x0D, 0x0A, 0x1A, 0x0A
                var identifier = new Uint8Array(data, 0, 12);
                assert(identifier[0] === 0xab ||
                    identifier[1] === 0x4b ||
                    identifier[2] === 0x54 ||
                    identifier[3] === 0x58 ||
                    identifier[4] === 0x20 ||
                    identifier[5] === 0x31 ||
                    identifier[6] === 0x31 ||
                    identifier[7] === 0xbb ||
                    identifier[8] === 0x0d ||
                    identifier[9] === 0x0a ||
                    identifier[10] === 0x1a ||
                    identifier[11] === 0x0a, 'Texture missing KTX identifier, currently only supporting KTX containers');
                // Load the rest of the header in 32 bit int
                var header = new Int32Array(data, 12, 13);
                // Determine of the remaining header values are recorded
                // in the opposite endianness and require conversion
                var bigEndian = header[0] === 0x01020304;
                // Must be 0 for compressed textures
                var glType = bigEndian ? switchEndianness(header[1]) : header[1];
                // Must be 1 for compressed textures
                // const glTypeSize = bigEndian ? switchEndianness(header[2]) : header[2];
                // Must be 0 for compressed textures
                // const glFormat = bigEndian ? switchEndianness(header[3]) : header[3];
                // The value to be passed to gl.compressedTexImage2D(,,x,,,,)
                var glInternalFormat = bigEndian ? switchEndianness(header[4]) : header[4];
                // Specify GL_RGB, GL_RGBA, GL_ALPHA, etc (un-compressed only)
                var glBaseInternalFormat = bigEndian ? switchEndianness(header[5]) : header[5];
                // Level 0 value to be passed to gl.compressedTexImage2D(,,,x,,,)
                var pixelWidth = bigEndian ? switchEndianness(header[6]) : header[6];
                // Level 0 value to be passed to gl.compressedTexImage2D(,,,,x,,)
                var pixelHeight = bigEndian ? switchEndianness(header[7]) : header[7];
                // Level 0 value to be passed to gl.compressedTexImage3D(,,,,,x,,)
                var pixelDepth = bigEndian ? switchEndianness(header[8]) : header[8];
                // Used for texture arrays
                var numberOfArrayElements = bigEndian ? switchEndianness(header[9]) : header[9];
                // Used for cubemap textures, should either be 1 or 6
                var numberOfFaces = bigEndian ? switchEndianness(header[10]) : header[10];
                // Number of levels; disregard possibility of 0 for compressed textures
                var numberOfMipmapLevels = bigEndian ? switchEndianness(header[11]) : header[11];
                // The amount of space after the header for meta-data
                var bytesOfKeyValueData = bigEndian ? switchEndianness(header[12]) : header[12];
                // Value of zero is an indication to generate mipmaps at runtime.
                // Not usually allowed for compressed, so disregard.
                numberOfMipmapLevels = Math.max(1, numberOfMipmapLevels);
                // Check for 2D texture
                assert(pixelHeight !== 0 && pixelDepth === 0, 'Only 2D textures currently supported');
                // Check for texture arrays, currently not supported
                assert(numberOfArrayElements === 0, 'Texture arrays not currently supported');
                var mipmaps = [];
                // Identifier + header elements (not including key value meta-data pairs)
                var dataOffset = 64 + bytesOfKeyValueData;
                var width = pixelWidth;
                var height = pixelHeight;
                var mipmapCount = numberOfMipmapLevels || 1;
                for (var level = 0; level < mipmapCount; level++) {
                    // Size per face, since not supporting array cubemaps
                    var imageSize = new Int32Array(data, dataOffset, 1)[0];
                    // Image data starts from next multiple of 4 offset
                    // Each face refers to same imagesize field above
                    dataOffset += 4;
                    for (var face = 0; face < numberOfFaces; face++) {
                        var byteArray = new Uint8Array(data, dataOffset, imageSize);
                        mipmaps.push({
                            data: byteArray,
                            height: height,
                            width: width,
                        });
                        // Add size of the image for the next face / mipmap
                        dataOffset += imageSize;
                        // Add padding for odd sized image
                        dataOffset += 3 - ((imageSize + 3) % 4);
                    }
                    width = Math.max(1.0, width * 0.5);
                    height = Math.max(1.0, height * 0.5);
                }
                return {
                    baseInternalFormat: glBaseInternalFormat,
                    height: pixelHeight,
                    internalFormat: glInternalFormat,
                    isCompressed: !glType,
                    isCubemap: numberOfFaces === 6,
                    mipmapCount: numberOfMipmapLevels,
                    mipmaps: mipmaps,
                    width: pixelWidth,
                };
            }
        });
    };
    /**
     * Load an item and parse the Response as JSON
     *
     * @param item Item to load
     */
    AssetLoader.loadJSON = function (item) {
        return AssetLoader.fetchItem(item)
            .then(function (response) { return response.json(); })
            .catch(function (err) {
            warn(err);
        });
    };
    /**
     * Load an item and parse the Response as plain text
     *
     * @param item Item to load
     */
    AssetLoader.loadText = function (item) {
        return AssetLoader.fetchItem(item)
            .then(function (response) { return response.text(); })
            .catch(function (err) {
            warn(err);
        });
    };
    /**
     * Load an item and parse the Response as <video> element
     *
     * @param item Item to load
     */
    AssetLoader.loadVideo = function (item) {
        return AssetLoader.fetchItem(item)
            .then(function (response) { return response.blob(); })
            .then(function (blob) {
            return new Promise(function (resolve, reject) {
                var video = document.createElement('video');
                video.preload = 'auto';
                video.autoplay = false;
                // @ts-ignore playsinline is not recognized as a valid type but it is valid syntax
                video.playsinline = true;
                if (IS_MEDIA_PRELOAD_SUPPORTED) {
                    video.addEventListener('canplaythrough', function handler() {
                        video.removeEventListener('canplaythrough', handler);
                        URL.revokeObjectURL(video.src);
                        resolve(video);
                    });
                    video.addEventListener('error', function handler() {
                        video.removeEventListener('error', handler);
                        URL.revokeObjectURL(video.src);
                        reject(video);
                    });
                }
                video.src = URL.createObjectURL(blob);
                if (!IS_MEDIA_PRELOAD_SUPPORTED) {
                    // Force the audio to load but resolve immediately as `canplaythrough` event will never be fired
                    video.load();
                    resolve(video);
                }
            });
        })
            .catch(function (err) {
            warn(err);
        });
    };
    /**
     * Load an item and parse the Response as ArrayBuffer (ready to instantiate)
     *
     * @param item Item to load
     */
    AssetLoader.loadWebAssembly = function (item) {
        if (isWebAssemblySupported) {
            // @ts-ignore
            if (window.WebAssembly.instantiateStreaming) {
                // @ts-ignore
                return window.WebAssembly.instantiateStreaming(AssetLoader.fetchItem(item), item.loaderOptions.importObject);
            }
            else {
                return (AssetLoader.fetchItem(item)
                    .then(function (response) { return response.arrayBuffer(); })
                    // @ts-ignore
                    .then(function (data) { return window.WebAssembly.instantiate(data, item.loaderOptions.importObject); })
                    .catch(function (err) {
                    warn(err);
                }));
            }
        }
        else {
            warn('WebAssembly is not supported');
            return Promise.resolve();
        }
    };
    /**
     * Load an item and parse the Response as XML
     *
     * @param item Item to load
     */
    AssetLoader.loadXML = function (item) {
        if (!item.mimeType) {
            var extension = AssetLoader.getFileExtension(item.src);
            item = __assign({}, item, { mimeType: AssetLoader.getMimeType(ELoaderKey.XML, extension) });
        }
        return AssetLoader.fetchItem(item)
            .then(function (response) { return response.text(); })
            .then(function (data) {
            if (item.mimeType) {
                return AssetLoader.domParser.parseFromString(data, item.mimeType);
            }
        })
            .catch(function (err) {
            warn(err);
        });
    };
    return AssetLoader;
}());

// Loaders

var key$1 = {
    fullscreenEnabled: 0,
    // tslint:disable-next-line:object-literal-sort-keys
    fullscreenElement: 1,
    requestFullscreen: 2,
    exitFullscreen: 3,
    fullscreenchange: 4,
    fullscreenerror: 5,
};
var webkit$1 = [
    'webkitFullscreenEnabled',
    'webkitFullscreenElement',
    'webkitRequestFullscreen',
    'webkitExitFullscreen',
    'webkitfullscreenchange',
    'webkitfullscreenerror',
];
var moz = [
    'mozFullScreenEnabled',
    'mozFullScreenElement',
    'mozRequestFullScreen',
    'mozCancelFullScreen',
    'mozfullscreenchange',
    'mozfullscreenerror',
];
var ms$1 = [
    'msFullscreenEnabled',
    'msFullscreenElement',
    'msRequestFullscreen',
    'msExitFullscreen',
    'MSFullscreenChange',
    'MSFullscreenError',
];
var prefix$1 = ('fullscreenEnabled' in document && Object.keys(key$1)) ||
    (webkit$1[0] in document && webkit$1) ||
    (moz[0] in document && moz) ||
    (ms$1[0] in document && ms$1) ||
    [];
var fullScreen = {
    // @ts-ignore implicit any, has no index structure
    requestFullscreen: function (element) { return element[prefix$1[key$1.requestFullscreen]](); },
    get exitFullscreen() {
        // @ts-ignore implicit any, has no index structure
        return document[prefix$1[key$1.exitFullscreen]].bind(document);
    },
    addEventListener: function (type, handler, options) {
        // @ts-ignore implicit any, has no index structure
        return document.addEventListener(prefix$1[key$1[type]], handler, options);
    },
    removeEventListener: function (type, handler, options) {
        // @ts-ignore implicit any, has no index structure
        return document.removeEventListener(prefix$1[key$1[type]], handler, options);
    },
    get fullscreenSupported() {
        // @ts-ignore implicit any, has no index structure
        return Boolean(document[prefix$1[key$1.fullscreenEnabled]]);
    },
    // tslint:disable-next-line:no-empty
    set fullscreenSupported(val) { },
    get fullscreenElement() {
        // @ts-ignore implicit any, has no index structure
        return document[prefix$1[key$1.fullscreenElement]];
    },
    // tslint:disable-next-line:no-empty
    set fullscreenElement(val) { },
    get onfullscreenchange() {
        // @ts-ignore implicit any, has no index structure
        return document[("on" + prefix$1[key$1.fullscreenchange]).toLowerCase()];
    },
    set onfullscreenchange(handler) {
        // @ts-ignore implicit any, has no index structure
        return (document[("on" + prefix$1[key$1.fullscreenchange]).toLowerCase()] = handler);
    },
    get onfullscreenerror() {
        // @ts-ignore implicit any, has no index structure
        return document[("on" + prefix$1[key$1.fullscreenerror]).toLowerCase()];
    },
    set onfullscreenerror(handler) {
        // @ts-ignore implicit any, has no index structure
        document[("on" + prefix$1[key$1.fullscreenerror]).toLowerCase()] = handler;
    },
};

// Create vendor agnostic API (inspired by https://github.com/rafrex/fscreen)
var key$2 = {
    pointerlockElement: 0,
    requestPointerLock: 1,
    // tslint:disable-next-line:object-literal-sort-keys
    exitPointerLock: 2,
    pointerlockchange: 3,
    pointerlockerror: 4,
};
var webkit$2 = [
    'webkitPointerLockElement',
    'webkitRequestPointerLock',
    'webkitExitPointerLock',
    'webkitpointerlockchange',
    'webkitpointerlockerror',
];
var moz$1 = [
    'mozPointerLockElement',
    'mozRequestPointerLock',
    'mozExitPointerLock',
    'mozpointerlockchange',
    'mozpointerlockerror',
];
var ms$2 = [
    'msPointerLockElement',
    'msRequestPointerLock',
    'msExitPointerLock',
    'mspointerlockchange',
    'mspointerlockerror',
];
var prefix$2 = ('pointerLockElement' in document && Object.keys(key$2)) ||
    (webkit$2[0] in document && webkit$2) ||
    (moz$1[0] in document && moz$1) ||
    (ms$2[0] in document && ms$2) ||
    [];
var pointerLock = {
    // @ts-ignore implicit any, has no index structure
    requestPointerLock: function (element) { return element[prefix$2[key$2.requestPointerLock]](); },
    get exitPointerLock() {
        // @ts-ignore implicit any, has no index structure
        return document[prefix$2[key$2.exitPointerLock]].bind(document);
    },
    addEventListener: function (type, handler, options) {
        // @ts-ignore implicit any, has no index structure
        return document.addEventListener(prefix$2[key$2[type]], handler, options);
    },
    removeEventListener: function (type, handler, options) {
        // @ts-ignore implicit any, has no index structure
        return document.removeEventListener(prefix$2[key$2[type]], handler, options);
    },
    get pointerlockEnabled() {
        // @ts-ignore implicit any, has no index structure
        return Boolean('pointerLockElement' in document ||
            webkit$2[0] in document ||
            moz$1[0] in document ||
            ms$2[0] in document);
    },
    // tslint:disable-next-line:no-empty
    set pointerlockEnabled(val) { },
    get pointerLockElement() {
        // @ts-ignore implicit any, has no index structure
        return document[prefix$2[key$2.pointerLockElement]];
    },
    // tslint:disable-next-line:no-empty
    set pointerLockElement(val) { },
    get onpointerlockchange() {
        // @ts-ignore implicit any, has no index structure
        return document[("on" + prefix$2[key$2.pointerlockchange]).toLowerCase()];
    },
    set onpointerlockchange(handler) {
        // @ts-ignore implicit any, has no index structure
        return (document[("on" + prefix$2[key$2.pointerlockchange]).toLowerCase()] = handler);
    },
    get onpointerlockerror() {
        // @ts-ignore implicit any, has no index structure
        return document[("on" + prefix$2[key$2.pointerlockerror]).toLowerCase()];
    },
    set onpointerlockerror(handler) {
        // @ts-ignore implicit any, has no index structure
        document[("on" + prefix$2[key$2.pointerlockerror]).toLowerCase()] = handler;
    },
};

// Polyfills

// TODO: add way to limit concurrent threads (p-queue?)
/**
 * Create a self-closing RPC worker that consumes a single asynchronous function
 *
 * Inspired by https://github.com/developit/greenlet
 */
var Thread = /** @class */ (function () {
    /**
     * @param asyncFn Asynchronous function to process
     */
    function Thread(asyncFn) {
        // Execute on main thread as a fallback solution
        // Internet Explorer 11 does not support Promise without being polyfilled
        // which is too costly to ship along with the worker to make it worth including
        if (!isWebWorkerInlineSupported || isInternetExplorer) {
            return function (args) {
                args = [].slice.call(arguments);
                return asyncFn(args);
            };
        }
        // A simple counter is used to generate worker-global unique ID's for RPC
        var WORKER_ID = 0;
        // Outward-facing promises store their `controllers` (`[request, reject]`) here
        var promises = {};
        // @ts-ignore fallback to webkitURL if necessary (https://caniuse.com/#search=createObjectURL)
        var URL = window.URL || window.webkitURL;
        // Use a data URI for the worker's src. It inlines the target function and an RPC handler
        var workerURL = URL.createObjectURL(new Blob([
            "$$=" + asyncFn + ";onmessage=" + function (event) {
                if (event) {
                    // Invoking within then() captures exceptions in the supplied async function as rejections
                    Promise.resolve(event.data[1])
                        // @ts-ignore $$ is internally globally available
                        .then(function (args) { return $$.apply($$, args); })
                        .then(
                    // success handler - callback(id, SUCCESS(0), result)
                    // if `data` is transferable transfer zero-copy
                    function (data) {
                        postMessage([event.data[0], 0, data], 
                        // @ts-ignore
                        [data].filter(function (transfer) {
                            return transfer instanceof ArrayBuffer ||
                                transfer instanceof MessagePort ||
                                (self.createImageBitmap && transfer instanceof ImageBitmap);
                        }));
                        // Terminate the worker
                        close();
                    }, 
                    // error handler - callback(id, ERROR(1), error)
                    function (err) {
                        // @ts-ignore
                        postMessage([event.data[0], 1, "" + err]);
                        // Terminate the worker
                        close();
                    });
                }
            },
        ]));
        var worker = new Worker(workerURL);
        URL.revokeObjectURL(workerURL);
        /**
         * Handle RPC results/errors coming back out of the worker
         *
         * Messages coming from the worker take the form `[id, status, result]`:
         * id - counter-based unique ID for the RPC call
         * status - 0 for success, 1 for failure
         * result - the result or error, depending on `status`
         */
        worker.onmessage = function (event) {
            // invoke the promise's resolve() or reject() depending on whether there was an error
            promises[event.data[0]][event.data[1]](event.data[2]);
            // and then delete the promise controller
            promises[event.data[0]] = null;
        };
        // Return a proxy function that forwards calls to the worker and returns a promise for the result
        return function (args) {
            args = [].slice.call(arguments);
            return new Promise(function () {
                // Add the promise controller to the registry
                promises[++WORKER_ID] = arguments;
                // Send an RPC call to the worker - call(id, params)
                // The filter is to provide a list of transferables to send zero-copy
                worker.postMessage([WORKER_ID, args], args.filter(function (transfer) {
                    return transfer instanceof ArrayBuffer ||
                        transfer instanceof MessagePort ||
                        (window.createImageBitmap && transfer instanceof ImageBitmap);
                }));
            });
        };
    }
    return Thread;
}());

// Threads

// Analytics

export { AssetLoader, mitt as EventEmitter, PersistentCache, Thread, assert, config, convertArrayBufferToBlob, convertBlobToArrayBuffer, createAudioContext, createUUID, debounce, deleteCookie, error, eventEmitter, features, fullScreen, getConfigEntry, getCookie, getGPUTier, getQueryParameters, isAutoplayAllowed, listenToConnectionChange, listenToOrientationChange, listenToVisibilityChange, listenToWindowSizeChange, log, pointerLock, recordAnalyticsEvent, registerAnalytics, setConfigEntry, setCookie, stopListeningToConnectionChange, stopListeningToOrientationChange, stopListeningToVisibilityChange, stopListeningToWindowSizeChange, unlockAutoplay, warn };
