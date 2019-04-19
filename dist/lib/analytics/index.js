"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Features
var isRequestIdleCallbackSupported_1 = __importDefault(require("../features/browserFeatures/isRequestIdleCallbackSupported"));
var isDoNotTrackEnabled_1 = __importDefault(require("../features/browserSettings/isDoNotTrackEnabled"));
// Logger
var logger_1 = require("../logger");
/**
 * Registers Google Analytics tracking snippet
 *
 * @param trackingIdentifier Tracking identifier in format: UA-XXXX-YY
 */
exports.registerAnalytics = function (trackingIdentifier) {
    if (trackingIdentifier === undefined ||
        !/^ua-\d{4,9}-\d{1,4}$/i.test(trackingIdentifier.toString())) {
        // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#trackingId
        logger_1.warn('Analytics -> TrackingIdentifier expected to be of format "UA-XXXX-YY"');
    }
    if (!isDoNotTrackEnabled_1.default) {
        // Default async GA snippet as provided by Google
        // tslint:disable-next-line:only-arrow-functions
        (function (i, s, o, g, r, a, m) {
            // @ts-ignore: Google Analytics snippet
            i.GoogleAnalyticsObject = r;
            // @ts-ignore: Google Analytics snippet
            (i[r] =
                // @ts-ignore: Google Analytics snippet
                i[r] ||
                    // tslint:disable-next-line:only-arrow-functions
                    function () {
                        // @ts-ignore: Google Analytics snippet
                        (i[r].q = i[r].q || []).push(arguments);
                    }),
                // @ts-ignore: Google Analytics snippet
                (i[r].l = 1 * new Date());
            // @ts-ignore: Google Analytics snippet
            (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
            // @ts-ignore: Google Analytics snippet
            a.async = 1;
            // @ts-ignore: Google Analytics snippet
            a.src = g;
            // @ts-ignore: Google Analytics snippet
            m.parentNode.insertBefore(a, m);
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
        // @ts-ignore: Google Analytics snippet
        ga('create', "" + trackingIdentifier, 'auto');
        // @ts-ignore: Google Analytics snippet
        ga('send', 'pageview');
    }
    else {
        logger_1.warn('Analytics -> "DoNotTrack" setting is enabled, avoided installing the analytics snippet');
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
exports.recordAnalyticsEvent = function (record) {
    if (record === void 0) { record = {}; }
    // @ts-ignore: Google Analytics snippet
    if (window.ga !== undefined && typeof window.ga === 'function') {
        if (Object.keys(record).length <= 0) {
            logger_1.warn('Analytics -> Record cannot be empty');
            return;
        }
        var callback = function () {
            // @ts-ignore: Google Analytics snippet
            window.ga('send', record);
        };
        if (isRequestIdleCallbackSupported_1.default) {
            // @ts-ignore: missing type definition
            window.requestIdleCallback(callback);
        }
        else {
            callback();
        }
    }
};
//# sourceMappingURL=index.js.map