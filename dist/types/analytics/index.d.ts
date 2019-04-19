/**
 * Registers Google Analytics tracking snippet
 *
 * @param trackingIdentifier Tracking identifier in format: UA-XXXX-YY
 */
export declare const registerAnalytics: (trackingIdentifier: string) => void;
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
export declare const recordAnalyticsEvent: (record?: {}) => void;
