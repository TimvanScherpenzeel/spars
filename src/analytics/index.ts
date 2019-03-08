// Features
import isRequestIdleCallbackSupported from '../features/browserFeatures/isRequestIdleCallbackSupported';
import isDoNotTrackEnabled from '../features/browserSettings/isDoNotTrackEnabled';

// Logger
import { warn } from '../logger';

/**
 * Registers Google Analytics tracking snippet
 *
 * @param trackingIdentifier Tracking identifier in format: UA-XXXX-YY.
 */
export const registerAnalytics = (trackingIdentifier: string) => {
  if (
    trackingIdentifier === undefined ||
    !/^ua-\d{4,9}-\d{1,4}$/i.test(trackingIdentifier.toString())
  ) {
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#trackingId
    warn('Analytics -> TrackingIdentifier expected to be of format "UA-XXXX-YY"');
  }

  if (!isDoNotTrackEnabled) {
    // Default async GA snippet as provided by Google
    // tslint:disable-next-line:only-arrow-functions
    (function (i, s, o, g, r, a, m) {
      // @ts-ignore
      i.GoogleAnalyticsObject = r;
      // @ts-ignore
      (i[r] =
        // @ts-ignore
        i[r] ||
        // tslint:disable-next-line:only-arrow-functions
        function () {
          // @ts-ignore
          (i[r].q = i[r].q || []).push(arguments);
        }),
        // @ts-ignore
        (i[r].l = 1 * new Date());
      // @ts-ignore
      (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
      // @ts-ignore
      a.async = 1;
      // @ts-ignore
      a.src = g;
      // @ts-ignore
      m.parentNode.insertBefore(a, m);
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    // @ts-ignore
    ga('create', `${trackingIdentifier}`, 'auto');
    // @ts-ignore
    ga('send', 'pageview');
  } else {
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
export const recordAnalyticsEvent = (record = {}) => {
  // @ts-ignore
  if (window.ga !== undefined && typeof window.ga === 'function') {
    if (Object.keys(record).length <= 0) {
      warn('Analytics -> Record cannot be empty');
      return;
    }

    const callback = () => {
      // @ts-ignore
      window.ga('send', record);
    };

    if (isRequestIdleCallbackSupported) {
      // @ts-ignore
      window.requestIdleCallback(callback);
    } else {
      callback();
    }
  }
};
