// Events
import { eventEmitter } from '../events/eventEmitter';

// Features
import getBrowserType from '../features/browserFeatures/getBrowserType';
import isImageDecodeSupported from '../features/browserFeatures/isImageDecodeSupported';

// Utilities
import { assert } from '../utilities';

// Types
import { ILoadItem } from './types';

// Safari does not fire `canplaythrough` preventing it from resolving naturally.
// A workaround is to not wait for the `canplaythrough` event but rather resolve early and hope for the best
const IS_MEDIA_PRELOAD_SUPPORTED = !getBrowserType.isSafari;

/**
 * Loader types and the extensions they handle
 * Allows the omission of the loader key for some generic extensions used on the web
 */
const LOADER_EXTENSIONS_MAP = new Map([
  ['Text', { extensions: ['txt', 'svg'] }],
  ['JSON', { extensions: ['json'] }],
  ['Image', { extensions: ['jpeg', 'jpg', 'gif', 'png', 'webp'] }],
  ['CompressedImage', { extensions: ['ktx'] }],
  ['Audio', { extensions: ['mp3', 'ogg', 'wav', 'flac'] }],
  ['Video', { extensions: ['webm', 'ogg', 'mp4'] }],
]);

/**
 * Get a file extension from a full asset path
 *
 * @param {string} path Path to asset
 */
const getFileExtension = (path: string) => {
  const basename = path.split(/[\\/]/).pop();

  if (!basename) {
    return '';
  }

  const seperator = basename.lastIndexOf('.');

  if (seperator < 1) {
    return '';
  }

  return basename.slice(seperator + 1);
};

/**
 * Retrieve loader key from extension (when the loader option isn't specified)
 *
 * @param {string} path File path
 * @returns Loader (ArrayBuffer by default)
 */
const getLoaderByFileExtension = (path: string) => {
  const fileExtension = getFileExtension(path);
  const loader = Array.from(LOADER_EXTENSIONS_MAP).find(type =>
    type[1].extensions.includes(fileExtension)
  );

  return loader ? loader[0] : 'ArrayBuffer';
};

/**
 * Fetch wrapper for loading an item, to be processed by a specific loader afterwards
 *
 * @param item Item to fetch
 * @returns Fetch response
 */
const fetchItem = (item: ILoadItem) => fetch(item.src, item.options || {});

/**
 * Load an item and parse the Response as arrayBuffer
 *
 * @param item Item to load
 * @returns {Promise} Fulfilled value of parsed Response
 */
const loadArrayBuffer = (item: ILoadItem) =>
  fetchItem(item).then(response => response.arrayBuffer());

/**
 * Load an item and parse the Response as <audio> element
 *
 * @param item Item to load
 * @returns {Promise} Fulfilled value of parsed Response. Defaults to a HTMLAudioElement with a blob as src.
 */
const loadAudio = (item: ILoadItem) =>
  fetchItem(item)
    .then(response => response.blob())
    .then(
      blob =>
        new Promise((resolve, reject) => {
          const audio = document.createElement('audio');
          audio.preload = 'auto';
          audio.autoplay = false;

          if (IS_MEDIA_PRELOAD_SUPPORTED) {
            audio.addEventListener('canplaythrough', function canplaythrough() {
              audio.removeEventListener('canplaythrough', canplaythrough);
              resolve(audio);
            });

            audio.addEventListener('error', function error() {
              audio.removeEventListener('error', error);
              reject(audio);
            });
          }

          audio.src = URL.createObjectURL(blob);

          if (!IS_MEDIA_PRELOAD_SUPPORTED) {
            // Force the audio to load but resolve immediately as `canplaythrough` event will never be fired
            audio.load();
            resolve(audio);
          }
        })
    );

/**
 * Load an item and parse the Response as blob
 *
 * @param item Item to load
 * @returns {Promise} Fulfilled value of parsed Response
 */
const loadBlob = (item: ILoadItem) => fetchItem(item).then(response => response.blob());

/**
 * Load an item and parse the Response as <image> element
 *
 * @param item Item to load
 * @returns {Promise} Fulfilled value of parsed Response. Defaults to a HTMLImageElement with a blob as src.
 */
const loadImage = (item: ILoadItem) =>
  new Promise((resolve, reject) => {
    const image = new Image();

    // Check if we can decode non-blocking by loading the image asynchronously using image.decode().then(() => ...)
    // https://www.chromestatus.com/feature/5637156160667648 (Chrome / Safari / Safari iOS)
    if (isImageDecodeSupported) {
      image.src = item.src;
      image
        .decode()
        .then(() => {
          resolve(image);
        })
        .catch(err => {
          reject(err);
        });
    } else {
      // Fallback solution
      // Decode as synchronous blocking on the main thread
      // This is the least favorable method and should preferably only be used in old browsers (Edge, Firefox)
      image.onload = () => {
        resolve(image);
      };

      image.onerror = err => {
        reject(err);
      };

      image.src = item.src;
    }
  });

/**
 * Load an item and parse the Response as compressed image (KTX container)
 *
 * @param item Item to load
 * @returns {Promise} Fulfilled value of parsed Response
 */
const loadCompressedImage = (item: ILoadItem) =>
  loadArrayBuffer(item).then(data => {
    // Switch endianness of value
    const switchEndianness = (value: number) =>
      ((value & 0xff) << 24) |
      ((value & 0xff00) << 8) |
      ((value >> 8) & 0xff00) |
      ((value >> 24) & 0xff);

    // Test that it is a ktx formatted file, based on the first 12 bytes:
    // '´', 'K', 'T', 'X', ' ', '1', '1', 'ª', '\r', '\n', '\x1A', '\n'
    // 0xAB, 0x4B, 0x54, 0x58, 0x20, 0x31, 0x31, 0xBB, 0x0D, 0x0A, 0x1A, 0x0A
    const identifier = new Uint8Array(data, 0, 12);

    if (
      identifier[0] !== 0xab ||
      identifier[1] !== 0x4b ||
      identifier[2] !== 0x54 ||
      identifier[3] !== 0x58 ||
      identifier[4] !== 0x20 ||
      identifier[5] !== 0x31 ||
      identifier[6] !== 0x31 ||
      identifier[7] !== 0xbb ||
      identifier[8] !== 0x0d ||
      identifier[9] !== 0x0a ||
      identifier[10] !== 0x1a ||
      identifier[11] !== 0x0a
    ) {
      throw new Error('Texture missing KTX identifier, currently only supporting KTX containers');
    }

    // Load the rest of the header in 32 bit int
    const header = new Int32Array(data, 12, 13);

    // Determine of the remaining header values are recorded
    // in the opposite endianness and require conversion
    const bigEndian = header[0] === 0x01020304;

    // Must be 0 for compressed textures
    const glType = bigEndian ? switchEndianness(header[1]) : header[1];

    // Must be 1 for compressed textures
    // const glTypeSize = bigEndian ? switchEndianness(header[2]) : header[2];

    // Must be 0 for compressed textures
    // const glFormat = bigEndian ? switchEndianness(header[3]) : header[3];

    // The value to be passed to gl.compressedTexImage2D(,,x,,,,)
    const glInternalFormat = bigEndian ? switchEndianness(header[4]) : header[4];

    // Specify GL_RGB, GL_RGBA, GL_ALPHA, etc (un-compressed only)
    const glBaseInternalFormat = bigEndian ? switchEndianness(header[5]) : header[5];

    // Level 0 value to be passed to gl.compressedTexImage2D(,,,x,,,)
    const pixelWidth = bigEndian ? switchEndianness(header[6]) : header[6];

    // Level 0 value to be passed to gl.compressedTexImage2D(,,,,x,,)
    const pixelHeight = bigEndian ? switchEndianness(header[7]) : header[7];

    // Level 0 value to be passed to gl.compressedTexImage3D(,,,,,x,,)
    const pixelDepth = bigEndian ? switchEndianness(header[8]) : header[8];

    // Used for texture arrays
    const numberOfArrayElements = bigEndian ? switchEndianness(header[9]) : header[9];

    // Used for cubemap textures, should either be 1 or 6
    const numberOfFaces = bigEndian ? switchEndianness(header[10]) : header[10];

    // Number of levels; disregard possibility of 0 for compressed textures
    let numberOfMipmapLevels = bigEndian ? switchEndianness(header[11]) : header[11];

    // The amount of space after the header for meta-data
    const bytesOfKeyValueData = bigEndian ? switchEndianness(header[12]) : header[12];

    // Value of zero is an indication to generate mipmaps at runtime.
    // Not usually allowed for compressed, so disregard.
    numberOfMipmapLevels = Math.max(1, numberOfMipmapLevels);

    // Check for 2D texture
    assert(pixelHeight !== 0 && pixelDepth === 0, 'Only 2D textures currently supported');

    // Check for texture arrays, currently not supported
    assert(numberOfArrayElements === 0, 'Texture arrays not currently supported');

    const mipmaps = [];

    // Identifier + header elements (not including key value meta-data pairs)
    let dataOffset = 64 + bytesOfKeyValueData;
    let width = pixelWidth;
    let height = pixelHeight;
    const mipmapCount = numberOfMipmapLevels || 1;

    for (let level = 0; level < mipmapCount; level += 1) {
      // Size per face, since not supporting array cubemaps
      const imageSize = new Int32Array(data, dataOffset, 1)[0];

      // Image data starts from next multiple of 4 offset
      // Each face refers to same imagesize field above
      dataOffset += 4;

      for (let face = 0; face < numberOfFaces; face += 1) {
        const byteArray = new Uint8Array(data, dataOffset, imageSize);

        mipmaps.push({
          data: byteArray,
          height,
          width,
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
      mipmaps,
      width: pixelWidth,
    };
  });

/**
 * Load an item and parse the Response as JSON
 *
 * @param item Item to load
 * @returns {Promise} Fulfilled value of parsed Response
 */
const loadJSON = (item: ILoadItem) => fetchItem(item).then(response => response.json());

/**
 * Load an item and parse the Response as plain text
 *
 * @param item Item to load
 * @returns {Promise} Fulfilled value of parsed Response
 */
const loadText = (item: ILoadItem) => fetchItem(item).then(response => response.text());

/**
 * Load an item and parse the Response as <video> element
 *
 * @param item Item to load
 * @returns {Promise} Fulfilled value of parsed Response. Defaults to a HTMLVideoElement with a blob as src.
 */
const loadVideo = (item: ILoadItem) =>
  fetchItem(item)
    .then(response => response.blob())
    .then(
      blob =>
        new Promise((resolve, reject) => {
          const video = document.createElement('video');
          video.preload = 'auto';
          video.autoplay = false;
          // @ts-ignore playsinline is not recognized as a valid type but it is valid syntax
          video.playsinline = true;

          if (IS_MEDIA_PRELOAD_SUPPORTED) {
            video.addEventListener('canplaythrough', function canplaythrough() {
              video.removeEventListener('canplaythrough', canplaythrough);
              resolve(video);
            });

            video.addEventListener('error', function error() {
              video.removeEventListener('error', error);
              reject(video);
            });
          }

          video.src = URL.createObjectURL(blob);

          if (!IS_MEDIA_PRELOAD_SUPPORTED) {
            // Force the audio to load but resolve immediately as `canplaythrough` event will never be fired
            video.load();
            resolve(video);
          }
        })
    );

/**
 * Asynchronous asset preloader
 */
class AssetLoader {
  public assets: Map<string, Promise<Response>>;

  constructor() {
    this.assets = new Map();

    this.loadAsset = this.loadAsset.bind(this);
    this.loadAssets = this.loadAssets.bind(this);
  }

  /**
   * Load a single item
   *
   * @param item Item to load
   * @returns {Promise} Resolve when item is loaded, reject for any error
   */
  public loadAsset(item: ILoadItem) {
    const startTime = window.performance.now();

    return new Promise(resolve => {
      const cacheHit = this.assets.get(item.src);

      if (cacheHit) {
        resolve({
          fromCache: true,
          id: item.id || item.src,
          item: cacheHit,
          timeToLoad: window.performance.now() - startTime,
        });
      }

      const loaderType = item.loader || getLoaderByFileExtension(item.src);

      let loadedItem;

      switch (loaderType) {
        case 'ArrayBuffer':
          loadedItem = loadArrayBuffer(item);
          break;
        case 'Audio':
          loadedItem = loadAudio(item);
          break;
        case 'CompressedImage':
          loadedItem = loadCompressedImage(item);
          break;
        case 'Image':
          loadedItem = loadImage(item);
          break;
        case 'JSON':
          loadedItem = loadJSON(item);
          break;
        case 'Text':
          loadedItem = loadText(item);
          break;
        case 'Video':
          loadedItem = loadVideo(item);
          break;
        case 'Blob':
        default:
          loadedItem = loadBlob(item);
          break;
      }

      loadedItem.then(asset => {
        this.assets.set(item.src, asset);

        resolve({
          fromCache: false,
          id: item.id || item.src,
          item: asset,
          timeToLoad: window.performance.now() - startTime,
        });
      });
    });
  }

  /**
   * Load the specified manifest (array of items)
   *
   * @param items Items to load
   * @returns {Promise} Resolve when all items are loaded, reject for any error
   */
  public loadAssets(items: ILoadItem[]) {
    const loadingAssets = items.filter(item => item).map(this.loadAsset);
    const loadedAssets = Promise.all(loadingAssets);

    let progress = 0;

    loadingAssets.forEach((promise: Promise<any>) =>
      promise.then(asset => {
        progress += 1;

        eventEmitter.emit('RIDGE::ASSET_LOADED', {
          id: asset.id,
          progress: `${(progress / loadingAssets.length).toFixed(2)}`,
          timeToLoad: `${asset.timeToLoad.toFixed(2)}ms`,
        });
      })
    );

    return loadedAssets;
  }
}

// Export as a singleton in order to prevent multiple instances
const assetLoader = new AssetLoader();
export { assetLoader };
