// Enums

/**
 * Keys used for the loaders
 */
export enum ELoaderKey {
  ArrayBuffer = 'ArrayBuffer',
  Audio = 'Audio',
  Image = 'Image',
  ImageBitmap = 'ImageBitmap',
  ImageCompressed = 'ImageCompressed',
  JSON = 'JSON',
  Text = 'Text',
  Video = 'Video',
  Blob = 'Blob',
}

// Interfaces

/**
 * Main interface representing an object to load
 */
export interface ILoadItem {
  src: string;
  id?: string | number;
  loader?: ELoaderKey;
  loaderOptions?: any;
  options?: RequestInit;
  body?: TBodyMethod;
}

// Types

/**
 * Methods that can be called on a Request (object returned by fetch and that implements the [Body](https://developer.mozilla.org/en-US/docs/Web/API/Body) interface)
 */
export type TBodyMethod = 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text';
