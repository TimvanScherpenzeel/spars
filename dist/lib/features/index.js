"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Browser features
var getBrowserType_1 = __importDefault(require("./browserFeatures/getBrowserType"));
var getMediaFeatures_1 = __importDefault(require("./browserFeatures/getMediaFeatures"));
var getWebGL2Features_1 = __importDefault(require("./browserFeatures/getWebGL2Features"));
var getWebGLFeatures_1 = __importDefault(require("./browserFeatures/getWebGLFeatures"));
var isAnimationWorkletSupported_1 = __importDefault(require("./browserFeatures/isAnimationWorkletSupported"));
var isAudioWorkletSupported_1 = __importDefault(require("./browserFeatures/isAudioWorkletSupported"));
var isBroadcastChannelSupported_1 = __importDefault(require("./browserFeatures/isBroadcastChannelSupported"));
var isFetchSupported_1 = __importDefault(require("./browserFeatures/isFetchSupported"));
var isGamepadSupported_1 = __importDefault(require("./browserFeatures/isGamepadSupported"));
var isImageBitmapSupported_1 = __importDefault(require("./browserFeatures/isImageBitmapSupported"));
var isImageDecodeSupported_1 = __importDefault(require("./browserFeatures/isImageDecodeSupported"));
var isIndexedDBSupported_1 = __importDefault(require("./browserFeatures/isIndexedDBSupported"));
var isIntersectionObserverSupported_1 = __importDefault(require("./browserFeatures/isIntersectionObserverSupported"));
var isLayoutWorkletSupported_1 = __importDefault(require("./browserFeatures/isLayoutWorkletSupported"));
var isLocalStorageSupported_1 = __importDefault(require("./browserFeatures/isLocalStorageSupported"));
var isMutationObserverSupported_1 = __importDefault(require("./browserFeatures/isMutationObserverSupported"));
var isOffscreenCanvasSupported_1 = __importDefault(require("./browserFeatures/isOffscreenCanvasSupported"));
var isPaintWorkletSupported_1 = __importDefault(require("./browserFeatures/isPaintWorkletSupported"));
var isPerformanceNowSupported_1 = __importDefault(require("./browserFeatures/isPerformanceNowSupported"));
var isPerformanceObserverSupported_1 = __importDefault(require("./browserFeatures/isPerformanceObserverSupported"));
var isRequestIdleCallbackSupported_1 = __importDefault(require("./browserFeatures/isRequestIdleCallbackSupported"));
var isServiceWorkerSupported_1 = __importDefault(require("./browserFeatures/isServiceWorkerSupported"));
var isSessionStorageSupported_1 = __importDefault(require("./browserFeatures/isSessionStorageSupported"));
var isUserActivationSupported_1 = __importDefault(require("./browserFeatures/isUserActivationSupported"));
var isWebAssemblySupported_1 = __importDefault(require("./browserFeatures/isWebAssemblySupported"));
var isWebAudioSupported_1 = __importDefault(require("./browserFeatures/isWebAudioSupported"));
var isWebGL2Supported_1 = __importDefault(require("./browserFeatures/isWebGL2Supported"));
var isWebGLSupported_1 = __importDefault(require("./browserFeatures/isWebGLSupported"));
var isWebPSupported_1 = __importDefault(require("./browserFeatures/isWebPSupported"));
var isWebRTCSupported_1 = __importDefault(require("./browserFeatures/isWebRTCSupported"));
var isWebSocketSupported_1 = __importDefault(require("./browserFeatures/isWebSocketSupported"));
var isWebVRSupported_1 = __importDefault(require("./browserFeatures/isWebVRSupported"));
var isWebWorkerInlineSupported_1 = __importDefault(require("./browserFeatures/isWebWorkerInlineSupported"));
var isWebWorkerSupported_1 = __importDefault(require("./browserFeatures/isWebWorkerSupported"));
var isWebXRSupported_1 = __importDefault(require("./browserFeatures/isWebXRSupported"));
// Browser settings
var isCookieEnabled_1 = __importDefault(require("./browserSettings/isCookieEnabled"));
var isDoNotTrackEnabled_1 = __importDefault(require("./browserSettings/isDoNotTrackEnabled"));
// Hardware features
var getDevicePixelRatio_1 = __importDefault(require("./hardwareFeatures/getDevicePixelRatio"));
var getEndianness_1 = __importDefault(require("./hardwareFeatures/getEndianness"));
var getWebWorkerPoolSize_1 = __importDefault(require("./hardwareFeatures/getWebWorkerPoolSize"));
exports.features = {
    // Browser features
    browserFeatures: {
        browserType: getBrowserType_1.default,
        isAnimationWorkletSupported: isAnimationWorkletSupported_1.default,
        isAudioWorkletSupported: isAudioWorkletSupported_1.default,
        isBroadcastChannelSupported: isBroadcastChannelSupported_1.default,
        isFetchSupported: isFetchSupported_1.default,
        isGamepadSupported: isGamepadSupported_1.default,
        isImageBitmapSupported: isImageBitmapSupported_1.default,
        isImageDecodeSupported: isImageDecodeSupported_1.default,
        isIndexedDBSupported: isIndexedDBSupported_1.default,
        isIntersectionObserverSupported: isIntersectionObserverSupported_1.default,
        isLayoutWorkletSupported: isLayoutWorkletSupported_1.default,
        isLocalStorageSupported: isLocalStorageSupported_1.default,
        isMutationObserverSupported: isMutationObserverSupported_1.default,
        isOffscreenCanvasSupported: isOffscreenCanvasSupported_1.default,
        isPaintWorkletSupported: isPaintWorkletSupported_1.default,
        isPerformanceNowSupported: isPerformanceNowSupported_1.default,
        isPerformanceObserverSupported: isPerformanceObserverSupported_1.default,
        isRequestIdleCallbackSupported: isRequestIdleCallbackSupported_1.default,
        isServiceWorkerSupported: isServiceWorkerSupported_1.default,
        isSessionStorageSupported: isSessionStorageSupported_1.default,
        isUserActivationSupported: isUserActivationSupported_1.default,
        isWebAssemblySupported: isWebAssemblySupported_1.default,
        isWebAudioSupported: isWebAudioSupported_1.default,
        // !! Device driver bug: Work around bug on Samsung Galaxy S and A series
        // !! it appears to have problems with immediately evaluated support checking for WebGL 2 (not WebGL)
        isWebGL2Supported: isWebGL2Supported_1.default(),
        isWebGLSupported: isWebGLSupported_1.default,
        isWebPSupported: isWebPSupported_1.default,
        isWebRTCSupported: isWebRTCSupported_1.default,
        isWebSocketSupported: isWebSocketSupported_1.default,
        isWebVRSupported: isWebVRSupported_1.default,
        isWebWorkerInlineSupported: isWebWorkerInlineSupported_1.default,
        isWebWorkerSupported: isWebWorkerSupported_1.default,
        isWebXRSupported: isWebXRSupported_1.default,
        mediaFeatures: getMediaFeatures_1.default,
        // !! Device driver bug: Work around bug on Samsung Galaxy S and A series
        // !! it appears to have problems with immediately evaluated support checking for WebGL 2 (not WebGL)
        webGL2Features: getWebGL2Features_1.default(),
        webGLFeatures: getWebGLFeatures_1.default,
    },
    // Browser settings
    browserSettings: {
        isCookieEnabled: isCookieEnabled_1.default,
        isDoNotTrackEnabled: isDoNotTrackEnabled_1.default,
    },
    // Hardware features
    hardwareFeatures: {
        devicePixelRatio: getDevicePixelRatio_1.default,
        endianness: getEndianness_1.default,
        workerPoolSize: getWebWorkerPoolSize_1.default,
    },
};
//# sourceMappingURL=index.js.map