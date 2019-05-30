"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Vendor
// @ts-ignore
var fontfaceobserver_es_1 = __importDefault(require("fontfaceobserver-es"));
// Events
var EventEmitter_1 = require("../events/EventEmitter");
// Features
var getBrowserType_1 = __importDefault(require("../features/browserFeatures/getBrowserType"));
var getWebGLFeatures_1 = __importDefault(require("../features/browserFeatures/getWebGLFeatures"));
var isImageBitmapSupported_1 = __importDefault(require("../features/browserFeatures/isImageBitmapSupported"));
var isImageDecodeSupported_1 = __importDefault(require("../features/browserFeatures/isImageDecodeSupported"));
var isWebAssemblySupported_1 = __importDefault(require("../features/browserFeatures/isWebAssemblySupported"));
// Logger
var logger_1 = require("../logger");
// Utilities
var utilities_1 = require("../utilities");
// Types
var types_1 = require("./types");
/**
 * Loader types and the extensions they handle
 * Allows the omission of the loader key for some generic extensions used on the web
 */
var LOADER_EXTENSIONS_MAP = new Map([
    [types_1.ELoaderKey.Audio, { extensions: ['mp3', 'ogg', 'wav', 'flac'] }],
    [types_1.ELoaderKey.Font, { extensions: ['woff2', 'woff', 'ttf', 'otf', 'eot'] }],
    [types_1.ELoaderKey.Image, { extensions: ['jpeg', 'jpg', 'gif', 'png', 'webp'] }],
    [types_1.ELoaderKey.ImageBitmap, { extensions: ['jpeg', 'jpg', 'gif', 'png', 'webp'] }],
    [types_1.ELoaderKey.ImageCompressed, { extensions: ['ktx'] }],
    [types_1.ELoaderKey.JSON, { extensions: ['json'] }],
    [types_1.ELoaderKey.Text, { extensions: ['txt'] }],
    [types_1.ELoaderKey.Video, { extensions: ['webm', 'ogg', 'mp4'] }],
    [types_1.ELoaderKey.WebAssembly, { extensions: ['wasm', 'wat'] }],
    [
        types_1.ELoaderKey.XML,
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
var IS_MEDIA_PRELOAD_SUPPORTED = !getBrowserType_1.default.isSafari;
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
                        case types_1.ELoaderKey.ArrayBuffer:
                            loadedItem = AssetLoader.loadArrayBuffer(item);
                            break;
                        case types_1.ELoaderKey.Audio:
                            loadedItem = AssetLoader.loadAudio(item);
                            break;
                        case types_1.ELoaderKey.Blob:
                            loadedItem = AssetLoader.loadBlob(item);
                            break;
                        case types_1.ELoaderKey.Font:
                            loadedItem = AssetLoader.loadFont(item);
                            break;
                        case types_1.ELoaderKey.Image:
                            loadedItem = AssetLoader.loadImage(item);
                            break;
                        case types_1.ELoaderKey.ImageBitmap:
                            loadedItem = AssetLoader.loadImageBitmap(item);
                            break;
                        case types_1.ELoaderKey.ImageCompressed:
                            loadedItem = AssetLoader.loadImageCompressed(item);
                            break;
                        case types_1.ELoaderKey.JSON:
                            loadedItem = AssetLoader.loadJSON(item);
                            break;
                        case types_1.ELoaderKey.Text:
                            loadedItem = AssetLoader.loadText(item);
                            break;
                        case types_1.ELoaderKey.Video:
                            loadedItem = AssetLoader.loadVideo(item);
                            break;
                        case types_1.ELoaderKey.WebAssembly:
                            loadedItem = AssetLoader.loadWebAssembly(item);
                            break;
                        case types_1.ELoaderKey.XML:
                            loadedItem = AssetLoader.loadXML(item);
                            break;
                        default:
                            logger_1.warn('Missing loader, falling back to loading as ArrayBuffer');
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
                    EventEmitter_1.eventEmitter.emit('ALPINE::ASSET_LOADED', {
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
                        logger_1.warn("Detected duplicate id, please use unique id's");
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
        return data.DESKTOP && getBrowserType_1.default.isDesktop
            ? data.DESKTOP
            : data.TABLET && getBrowserType_1.default.isTablet
                ? data.TABLET
                : data.MOBILE;
    };
    /**
     * Load conditionally based on supported compressed texture
     */
    AssetLoader.bySupportedCompressedTexture = function (data) {
        if (getWebGLFeatures_1.default) {
            return data.ASTC && getWebGLFeatures_1.default.extensions.compressedTextureASTCExtension
                ? data.ASTC
                : data.ETC && getWebGLFeatures_1.default.extensions.compressedTextureETCExtension
                    ? data.S3TC
                    : data.PVRTC && getWebGLFeatures_1.default.extensions.compressedTexturePVRTCExtension
                        ? data.PVRTC
                        : data.S3TC && getWebGLFeatures_1.default.extensions.compressedTextureS3TCExtension
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
        return loader ? loader[0] : types_1.ELoaderKey.ArrayBuffer;
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
            logger_1.warn(err);
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
            logger_1.warn(err);
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
            logger_1.warn(err);
        });
    };
    /**
     * Load an item and parse the Response as a FontFace
     *
     * @param item Item to load
     */
    AssetLoader.loadFont = function (item) {
        return new fontfaceobserver_es_1.default(item.id, item.options || {}).load();
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
            if (isImageDecodeSupported_1.default) {
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
        if (isImageBitmapSupported_1.default) {
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
                    logger_1.warn('Received no or corrupt data, falling back to default image loader');
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
                utilities_1.assert(identifier[0] === 0xab ||
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
                utilities_1.assert(pixelHeight !== 0 && pixelDepth === 0, 'Only 2D textures currently supported');
                // Check for texture arrays, currently not supported
                utilities_1.assert(numberOfArrayElements === 0, 'Texture arrays not currently supported');
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
            logger_1.warn(err);
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
            logger_1.warn(err);
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
            logger_1.warn(err);
        });
    };
    /**
     * Load an item and parse the Response as ArrayBuffer (ready to instantiate)
     *
     * @param item Item to load
     */
    AssetLoader.loadWebAssembly = function (item) {
        if (isWebAssemblySupported_1.default) {
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
                    logger_1.warn(err);
                }));
            }
        }
        else {
            logger_1.warn('WebAssembly is not supported');
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
            item = __assign({}, item, { mimeType: AssetLoader.getMimeType(types_1.ELoaderKey.XML, extension) });
        }
        return AssetLoader.fetchItem(item)
            .then(function (response) { return response.text(); })
            .then(function (data) {
            if (item.mimeType) {
                return AssetLoader.domParser.parseFromString(data, item.mimeType);
            }
        })
            .catch(function (err) {
            logger_1.warn(err);
        });
    };
    return AssetLoader;
}());
exports.AssetLoader = AssetLoader;
//# sourceMappingURL=AssetLoader.js.map