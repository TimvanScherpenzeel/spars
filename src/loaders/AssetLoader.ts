// Vendor
// @ts-ignore missing type definition
import FontFaceObserver from 'fontfaceobserver-es';

// Events
import { eventEmitter } from '../events/EventEmitter';

// Features
import getBrowserType from '../features/browserFeatures/getBrowserType';
import getWebGLFeatures from '../features/browserFeatures/getWebGLFeatures';
import isImageBitmapSupported from '../features/browserFeatures/isImageBitmapSupported';
import isImageDecodeSupported from '../features/browserFeatures/isImageDecodeSupported';
import isWebAssemblySupported from '../features/browserFeatures/isWebAssemblySupported';

// Utilities
import { assert } from '../utilities';

// Types
import { TUndefinable, TVoidable } from '../types';
import {
  ELoaderKey,
  IByDeviceTypeOptions,
  IBySupportedCompressedTextureOptions,
  ILoadItem,
} from './types';

/**
 * Loader types and the extensions they handle
 * Allows the omission of the loader key for some generic extensions used on the web
 */
const LOADER_EXTENSIONS_MAP = new Map([
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
const IS_MEDIA_PRELOAD_SUPPORTED = !getBrowserType.isSafari;

/**
 * Asynchronous asset preloader
 */
export class AssetLoader {
  /**
   * Load conditionally based on device type
   */
  public static byDeviceType = (data: IByDeviceTypeOptions): TUndefinable<string> =>
    data.DESKTOP && getBrowserType.isDesktop
      ? data.DESKTOP
      : data.TABLET && getBrowserType.isTablet
      ? data.TABLET
      : data.MOBILE;

  /**
   * Load conditionally based on supported compressed texture
   */
  public static bySupportedCompressedTexture = (
    data: IBySupportedCompressedTextureOptions
  ): TUndefinable<string> => {
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
    } else {
      return data.FALLBACK;
    }
  };

  /**
   * DOMParser instance for the XML loader
   */
  private static domParser = new DOMParser();

  /**
   * Get a file extension from a full asset path
   *
   * @param path Path to asset
   */
  private static getFileExtension = (path: string): string => {
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
   * Retrieve mime type from extension
   *
   * @param loaderKey Loader key
   * @param extension extension
   */
  private static getMimeType = (loaderKey: ELoaderKey, extension: string): string => {
    const loader: any = LOADER_EXTENSIONS_MAP.get(loaderKey);

    return loader.mimeType[extension] || loader.defaultMimeType;
  };

  /**
   * Retrieve loader key from extension (when the loader option isn't specified)
   *
   * @param path File path
   */
  private static getLoaderByFileExtension = (path: string): string => {
    const fileExtension = AssetLoader.getFileExtension(path);
    const loader = Array.from(LOADER_EXTENSIONS_MAP).find(type =>
      type[1].extensions.includes(fileExtension)
    );

    return loader ? loader[0] : ELoaderKey.ArrayBuffer;
  };

  /**
   * Fetch wrapper for loading an item, to be processed by a specific loader afterwards
   *
   * @param item Item to fetch
   */
  private static fetchItem = (item: ILoadItem): Promise<Response> =>
    fetch(item.src, item.options || {});

  /**
   * Load an item and parse the Response as arrayBuffer
   *
   * @param item Item to load
   */
  private static loadArrayBuffer = (item: ILoadItem): Promise<ArrayBuffer | void> =>
    AssetLoader.fetchItem(item)
      .then(response => response.arrayBuffer())
      .catch(err => {
        console.warn(err);
      });

  /**
   * Load an item and parse the Response as <audio> element
   *
   * @param item Item to load
   */
  private static loadAudio = (item: ILoadItem): Promise<unknown> =>
    AssetLoader.fetchItem(item)
      .then(response => response.blob())
      .then(
        blob =>
          new Promise(
            (resolve, reject): void => {
              const audio = document.createElement('audio');
              audio.preload = 'auto';
              audio.autoplay = false;

              if (IS_MEDIA_PRELOAD_SUPPORTED) {
                audio.addEventListener('canplaythrough', function handler(): void {
                  audio.removeEventListener('canplaythrough', handler);
                  URL.revokeObjectURL(audio.src);
                  resolve(audio);
                });

                audio.addEventListener('error', function handler(): void {
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
            }
          )
      )
      .catch(err => {
        console.warn(err);
      });

  /**
   * Load an item and parse the Response as blob
   *
   * @param item Item to load
   */
  private static loadBlob = (item: ILoadItem): Promise<Blob | void> =>
    AssetLoader.fetchItem(item)
      .then(response => response.blob())
      .catch(err => {
        console.warn(err);
      });

  /**
   * Load an item and parse the Response as a FontFace
   *
   * @param item Item to load
   */
  private static loadFont = (item: ILoadItem): Promise<any> =>
    new FontFaceObserver(item.id, item.options || {}).load();

  /**
   * Load an item and parse the Response as <image> element
   *
   * @param item Item to load
   */
  private static loadImage = (item: ILoadItem): Promise<HTMLImageElement> =>
    new Promise(
      (resolve, reject): void => {
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
          image.onload = (): void => {
            resolve(image);
          };

          image.onerror = (err): void => {
            reject(err);
          };

          image.src = item.src;
        }
      }
    );

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
  private static loadImageBitmap = (item: ILoadItem): Promise<ImageBitmap | HTMLImageElement> => {
    if (isImageBitmapSupported) {
      return AssetLoader.loadBlob(item).then(data => {
        if (data) {
          if (item.loaderOptions) {
            const { sx, sy, sw, sh, options } = item.loaderOptions;

            if (sx !== undefined && sy !== undefined && sw !== undefined && sh !== undefined) {
              if (options !== undefined) {
                // NOTE: Firefox does not yet support passing options (at least as second parameter) to createImageBitmap and throws
                // https://bugzilla.mozilla.org/show_bug.cgi?id=1335594
                // https://www.khronos.org/registry/webgl/specs/latest/1.0/#PIXEL_STORAGE_PARAMETERS
                // @ts-ignore createImageBitmap expects 1 or 5 parameters but now optionally supports 6
                return createImageBitmap(data, sx, sy, sw, sh, options);
              } else {
                return createImageBitmap(data, sx, sy, sw, sh);
              }
            } else if (options !== undefined) {
              // NOTE: Firefox does not yet support passing options (at least as second parameter) to createImageBitmap and throws
              // https://bugzilla.mozilla.org/show_bug.cgi?id=1335594
              // https://www.khronos.org/registry/webgl/specs/latest/1.0/#PIXEL_STORAGE_PARAMETERS
              // @ts-ignore createImageBitmap expects 1 or 5 parameters but now optionally supports 2
              return createImageBitmap(data, options);
            } else {
              return createImageBitmap(data);
            }
          } else {
            return createImageBitmap(data);
          }
        } else {
          // In case something went wrong with loading the blob or corrupted data
          // Fallback to default image loader
          console.warn('Received no or corrupt data, falling back to default image loader');
          return AssetLoader.loadImage(item);
        }
      });
    } else {
      // Fallback to default image loader
      return AssetLoader.loadImage(item);
    }
  };

  /**
   * Load an item and parse the Response as compressed image (KTX container)
   *
   * @param item Item to load
   */
  private static loadImageCompressed = (
    item: ILoadItem
  ): Promise<
    TUndefinable<{
      baseInternalFormat: GLenum;
      height: number;
      internalFormat: GLenum;
      isCompressed: boolean;
      isCubemap: boolean;
      mipmapCount: number;
      mipmaps: any;
      width: number;
    }>
  > =>
    AssetLoader.loadArrayBuffer(item).then(data => {
      if (data) {
        // Switch endianness of value
        const switchEndianness = (value: number): number =>
          ((value & 0xff) << 24) |
          ((value & 0xff00) << 8) |
          ((value >> 8) & 0xff00) |
          ((value >> 24) & 0xff);

        // Test that it is a ktx formatted file, based on the first 12 bytes:
        // '´', 'K', 'T', 'X', ' ', '1', '1', 'ª', '\r', '\n', '\x1A', '\n'
        // 0xAB, 0x4B, 0x54, 0x58, 0x20, 0x31, 0x31, 0xBB, 0x0D, 0x0A, 0x1A, 0x0A
        const identifier = new Uint8Array(data, 0, 12);

        assert(
          identifier[0] === 0xab ||
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
            identifier[11] === 0x0a,
          'Texture missing KTX identifier, currently only supporting KTX containers'
        );

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

        for (let level = 0; level < mipmapCount; level++) {
          // Size per face, since not supporting array cubemaps
          const imageSize = new Int32Array(data, dataOffset, 1)[0];

          // Image data starts from next multiple of 4 offset
          // Each face refers to same imagesize field above
          dataOffset += 4;

          for (let face = 0; face < numberOfFaces; face++) {
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
      }
    });

  /**
   * Load an item and parse the Response as JSON
   *
   * @param item Item to load
   */
  private static loadJSON = (item: ILoadItem): Promise<JSON> =>
    AssetLoader.fetchItem(item)
      .then(response => response.json())
      .catch(err => {
        console.warn(err);
      });

  /**
   * Load an item and parse the Response as plain text
   *
   * @param item Item to load
   */
  private static loadText = (item: ILoadItem): Promise<string | void> =>
    AssetLoader.fetchItem(item)
      .then(response => response.text())
      .catch(err => {
        console.warn(err);
      });

  /**
   * Load an item and parse the Response as <video> element
   *
   * @param item Item to load
   */
  private static loadVideo = (item: ILoadItem): Promise<unknown> =>
    AssetLoader.fetchItem(item)
      .then(response => response.blob())
      .then(
        blob =>
          new Promise(
            (resolve, reject): void => {
              const video = document.createElement('video');
              video.preload = 'auto';
              video.autoplay = false;
              // @ts-ignore playsinline is not recognized as a valid type but it is valid syntax
              video.playsinline = true;

              if (IS_MEDIA_PRELOAD_SUPPORTED) {
                video.addEventListener('canplaythrough', function handler(): void {
                  video.removeEventListener('canplaythrough', handler);
                  URL.revokeObjectURL(video.src);
                  resolve(video);
                });

                video.addEventListener('error', function handler(): void {
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
            }
          )
      )
      .catch(err => {
        console.warn(err);
      });

  /**
   * Load an item and parse the Response as ArrayBuffer (ready to instantiate)
   *
   * @param item Item to load
   */
  // TODO: any must be WebAssembly.Instance
  private static loadWebAssembly = (item: ILoadItem): Promise<TVoidable<any>> => {
    if (isWebAssemblySupported) {
      if ((window as any).WebAssembly.instantiateStreaming) {
        return (window as any).instantiateStreaming(
          AssetLoader.fetchItem(item),
          item.loaderOptions.importObject
        );
      } else {
        return AssetLoader.fetchItem(item)
          .then(response => response.arrayBuffer())
          .then(data =>
            (window as any).WebAssembly.instantiate(data, item.loaderOptions.importObject)
          )
          .catch(err => {
            console.warn(err);
          });
      }
    } else {
      console.warn('WebAssembly is not supported');
      return Promise.resolve();
    }
  };

  /**
   * Load an item and parse the Response as XML
   *
   * @param item Item to load
   */
  private static loadXML = (item: ILoadItem): Promise<any> => {
    if (!item.mimeType) {
      const extension: string = AssetLoader.getFileExtension(item.src);
      item = {
        ...item,
        mimeType: AssetLoader.getMimeType(ELoaderKey.XML, extension) as SupportedType,
      };
    }

    return AssetLoader.fetchItem(item)
      .then(response => response.text())
      .then(data => {
        if (item.mimeType) {
          return AssetLoader.domParser.parseFromString(data, item.mimeType);
        }
      })
      .catch(err => {
        console.warn(err);
      });
  };

  public assets: Map<string, Promise<Response>> = new Map();

  /**
   * Load the specified manifest (array of items)
   *
   * @param items Items to load
   */
  public loadAssets = (items: ILoadItem[]): Promise<any> => {
    const loadingAssets = items
      .filter(item => item)
      .map(item => {
        const startTime = window.performance.now();

        return new Promise(
          (resolve): void => {
            const cacheHit = this.assets.get(item.src);

            if (cacheHit) {
              resolve({
                fromCache: true,
                id: item.id || item.src,
                item: cacheHit,
                timeToLoad: window.performance.now() - startTime,
              });
            }

            const loaderType = item.loader || AssetLoader.getLoaderByFileExtension(item.src);

            let loadedItem;

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
                console.warn('Missing loader, falling back to loading as ArrayBuffer');
                loadedItem = AssetLoader.loadArrayBuffer(item);
                break;
            }

            loadedItem.then((asset: any) => {
              this.assets.set(item.src, asset);

              resolve({
                fromCache: false,
                id: item.id || item.src,
                item: asset,
                timeToLoad: window.performance.now() - startTime,
              });
            });
          }
        );
      });

    const loadedAssets = Promise.all(loadingAssets);

    let progress = 0;

    loadingAssets.forEach((promise: Promise<any>) =>
      promise.then(asset => {
        progress++;

        eventEmitter.emit('ALPINE::ASSET_LOADED', {
          id: asset.id,
          progress: `${(progress / loadingAssets.length).toFixed(2)}`,
          timeToLoad: `${asset.timeToLoad.toFixed(2)}ms`,
        });
      })
    );

    return loadedAssets.then(assets => {
      const assetMap = new Map();

      assets.forEach((asset: any) => {
        if (assetMap.get(asset.id)) {
          console.warn("Detected duplicate id, please use unique id's");
        }

        assetMap.set(asset.id, asset.item);
      });

      return assetMap;
    });
  };
}
