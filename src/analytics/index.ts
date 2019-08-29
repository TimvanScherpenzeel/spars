// Features
import isRequestIdleCallbackSupported from '../features/browserFeatures/isRequestIdleCallbackSupported';
import isDoNotTrackEnabled from '../features/browserSettings/isDoNotTrackEnabled';

/**
 * Registers Google Analytics tracking snippet
 *
 * @param trackingIdentifier Tracking identifier in format: UA-XXXX-YY
 */
export const registerAnalytics = (trackingIdentifier: string): void => {
  if (
    trackingIdentifier === undefined ||
    !/^ua-\d{4,9}-\d{1,4}$/i.test(trackingIdentifier.toString())
  ) {
    // SEE: https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#trackingId
    console.warn('Analytics -> TrackingIdentifier expected to be of format "UA-XXXX-YY"');
  }

  if (!isDoNotTrackEnabled) {
    // Default async GA snippet as provided by Google
    // tslint:disable-next-line:only-arrow-functions
    (function(i, s, o, g, r, a, m): void {
      // @ts-ignore Google Analytics snippet
      i.GoogleAnalyticsObject = r;
      // @ts-ignore Google Analytics snippet
      (i[r] =
        // @ts-ignore Google Analytics snippet
        i[r] ||
        // tslint:disable-next-line:only-arrow-functions
        function(): void {
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
    ga('create', `${trackingIdentifier}`, 'auto');
    // @ts-ignore Google Analytics snippet
    ga('send', 'pageview');
  } else {
    console.warn(
      'Analytics -> "DoNotTrack" setting is enabled, avoided installing the analytics snippet'
    );
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
export const recordAnalyticsEvent = (record = {}): void => {
  if ((window as any).ga !== undefined && typeof (window as any).ga === 'function') {
    if (Object.keys(record).length <= 0) {
      console.warn('Analytics -> Record cannot be empty');
      return undefined;
    }

    const callback = (): void => {
      (window as any).ga('send', record);
    };

    if (isRequestIdleCallbackSupported) {
      (window as any).requestIdleCallback(callback);
    } else {
      callback();
    }
  }
};
