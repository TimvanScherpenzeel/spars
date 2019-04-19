"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Analytics
var analytics_1 = require("./analytics");
exports.registerAnalytics = analytics_1.registerAnalytics;
exports.recordAnalyticsEvent = analytics_1.recordAnalyticsEvent;
// Audio
var audio_1 = require("./audio");
exports.createAudioContext = audio_1.createAudioContext;
exports.isAutoplayAllowed = audio_1.isAutoplayAllowed;
exports.unlockAutoplay = audio_1.unlockAutoplay;
// Cache
var cache_1 = require("./cache");
exports.PersistentCache = cache_1.PersistentCache;
// Config
var config_1 = require("./config");
exports.config = config_1.config;
exports.getConfigEntry = config_1.getConfigEntry;
exports.setConfigEntry = config_1.setConfigEntry;
// Cookie
var cookie_1 = require("./cookie");
exports.deleteCookie = cookie_1.deleteCookie;
exports.getCookie = cookie_1.getCookie;
exports.setCookie = cookie_1.setCookie;
// Events
var events_1 = require("./events");
exports.EventEmitter = events_1.EventEmitter;
exports.eventEmitter = events_1.eventEmitter;
exports.listenToConnectionChange = events_1.listenToConnectionChange;
exports.listenToOrientationChange = events_1.listenToOrientationChange;
exports.listenToVisibilityChange = events_1.listenToVisibilityChange;
exports.listenToWindowSizeChange = events_1.listenToWindowSizeChange;
exports.stopListeningToConnectionChange = events_1.stopListeningToConnectionChange;
exports.stopListeningToOrientationChange = events_1.stopListeningToOrientationChange;
exports.stopListeningToVisibilityChange = events_1.stopListeningToVisibilityChange;
exports.stopListeningToWindowSizeChange = events_1.stopListeningToWindowSizeChange;
// Features
var features_1 = require("./features");
exports.features = features_1.features;
exports.getGPUTier = features_1.getGPUTier;
// Loaders
var loaders_1 = require("./loaders");
exports.AssetLoader = loaders_1.AssetLoader;
// Logger
var logger_1 = require("./logger");
exports.error = logger_1.error;
exports.log = logger_1.log;
exports.warn = logger_1.warn;
// Polyfill
var polyfills_1 = require("./polyfills");
exports.fullScreen = polyfills_1.fullScreen;
exports.pointerLock = polyfills_1.pointerLock;
// Threads
var threads_1 = require("./threads");
exports.Thread = threads_1.Thread;
// Utilities
var utilities_1 = require("./utilities");
exports.assert = utilities_1.assert;
exports.convertArrayBufferToBlob = utilities_1.convertArrayBufferToBlob;
exports.convertBlobToArrayBuffer = utilities_1.convertBlobToArrayBuffer;
exports.createUUID = utilities_1.createUUID;
exports.debounce = utilities_1.debounce;
exports.getQueryParameters = utilities_1.getQueryParameters;
//# sourceMappingURL=index.js.map