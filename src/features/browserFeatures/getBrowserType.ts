// Vendor
import { DetectUA } from 'detect-ua';

const device = new DetectUA();

const { isMobile, isTablet, isDesktop, isiOS, isAndroid, browser } = device;

const isChrome = typeof browser === 'object' && browser.name === 'Chrome';
const isFirefox = typeof browser === 'object' && browser.name === 'Firefox';
const isSafari = typeof browser === 'object' && browser.name === 'Safari';
const isEdge = typeof browser === 'object' && browser.name === 'Microsoft Edge';
const isInternetExplorer = typeof browser === 'object' && browser.name === 'Internet Explorer';
const isOpera = typeof browser === 'object' && browser.name === 'Opera';
const isSamsungBrowser =
  typeof browser === 'object' && browser.name === 'Samsung Internet for Android';
const isYandexBrowser = typeof browser === 'object' && browser.name === 'Yandex Browser';
const isUCBrowser = typeof browser === 'object' && browser.name === 'UC Browser';
const isChromium = typeof browser === 'object' && browser.name === 'Chromium';

/**
 * Device and browser detection
 */
export default {
  isDesktop,
  isMobile,
  isTablet,

  isAndroid,
  isiOS,

  isChrome,
  isChromium,
  isEdge,
  isFirefox,
  isInternetExplorer,
  isOpera,
  isSafari,
  isSamsungBrowser,
  isUCBrowser,
  isYandexBrowser,

  browserName: (typeof browser === 'object' && browser.name) || '',
  browserVersion: (typeof browser === 'object' && browser.version) || '',
};
