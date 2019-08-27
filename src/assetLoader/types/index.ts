// Caching
import { PersistentCache } from '../../caching';

/**
 * Keys used for the loaders
 */
export enum ELoaderKey {
  ArrayBuffer = 'ArrayBuffer',
  Audio = 'Audio',
  Audiopack = 'Audiopack',
  Binpack = 'Binpack',
  Blob = 'Blob',
  Font = 'Font',
  Image = 'Image',
  ImageBitmap = 'ImageBitmap',
  ImageCompressed = 'ImageCompressed',
  JSON = 'JSON',
  Text = 'Text',
  Video = 'Video',
  WebAssembly = 'WebAssembly',
  XML = 'XML',
}

/**
 * Options to pass to the AssetLoader
 */
export interface IAssetLoaderOptions {
  persistentCache?: PersistentCache;
}

/**
 * Conditionally load by device type
 */
export interface IByDeviceTypeOptions {
  DESKTOP?: string;
  TABLET?: string;
  MOBILE?: string;
}

/**
 * Conditionally load by supported GPU compressed texture format
 */
export interface IBySupportedCompressedTextureOptions {
  ASTC?: string;
  ETC?: string;
  S3TC?: string;
  PVRTC?: string;
  FALLBACK?: string;
}

/**
 * Main interface representing an object to load
 */
export interface ILoadItem {
  src: string;
  id?: string | number;
  loader?: ELoaderKey;
  persistent?: boolean;

  // Any options directly passed to the loader
  loaderOptions?: any;

  options?: RequestInit;
  body?: TBodyMethod;
  mimeType?: SupportedType;
}

/**
 * Methods that can be called on a Request (object returned by fetch and that implements the [Body](https://developer.mozilla.org/en-US/docs/Web/API/Body) interface)
 */
export type TBodyMethod = 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text';
