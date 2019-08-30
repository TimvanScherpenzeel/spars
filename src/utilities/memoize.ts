/**
 * Inspired by https://github.com/caiogondim/fast-memoize.js
 */

// TODO: look into creating a cheaper data structure than a class to express fixed size caching

/**
 * Cache with a fixed boundary to prevent memory leaks
 */
export class FixedSizeCache {
  private size: number;
  private track: any[] = new Array(this.size);
  private cache: Map<any, any> = new Map();
  private index: number = 0;

  /**
   * Configure the fixed cache size
   *
   * @param size Size of the cache
   */
  constructor(size: number) {
    this.size = size;
  }

  /**
   * Get a cache entry from the cache by key
   *
   * @param key Key to get cache entry by
   */
  public get(key: any): any {
    return this.cache.get(key);
  }

  /**
   * Set a cache entry by key
   *
   * @param key Key to set cache entry by
   * @param value Value to set cache entry to
   */
  public set(key: any, value: any): any {
    this.cache.set(key, value);

    if (this.track[this.index]) {
      this.cache.delete(this.track[this.index]);
    }

    this.track[this.index] = key;

    this.index++;

    if (this.index === this.size) {
      this.index = 0;
    }
  }
}

/**
 * A function which accepts a single argument
 *
 * @param fn Function to memoize
 * @param cache Cache to use
 * @param serializer Serializer to use
 * @param arg Argument
 */
function monadic(fn: any, cache: FixedSizeCache, serializer: any, arg: any): any {
  const cacheKey =
    arg === null || typeof arg === 'number' || typeof arg === 'boolean' ? arg : serializer(arg);
  let computedValue = cache.get(cacheKey);

  if (typeof computedValue === 'undefined') {
    // @ts-ignore 'this' implicitly has type 'any' because it does not have a type annotation
    computedValue = fn.call(this, arg);
    cache.set(cacheKey, computedValue);
  }

  return computedValue;
}

/**
 * A function which accepts a variable number of arguments.
 *
 * @param fn Function to memoize
 * @param cache Cache to use
 * @param serializer Serializer to use
 */
function variadic(fn: any, cache: FixedSizeCache, serializer: any): any {
  const args = Array.prototype.slice.call(arguments, 3);
  const cacheKey = serializer(args);
  let computedValue = cache.get(cacheKey);

  if (typeof computedValue === 'undefined') {
    // @ts-ignore 'this' implicitly has type 'any' because it does not have a type annotation
    computedValue = fn.apply(this, args);
    cache.set(cacheKey, computedValue);
  }

  return computedValue;
}

/**
 * Serialize the arguments in order to be cached and compared correctly
 *
 * @param args Any arguments that have been passed along
 */
const serializerDefault = (...args: any): string => JSON.stringify(args);

/**
 * Memoization is used to cache pure function results in order to speed up recurrent computation
 *
 * @param fn Function to memoize
 * @param object { size: number, type: 'monadic' | 'variadic' } Memoization configuration
 */
export function memoize(
  fn: any,
  {
    size = 3,
    type = 'monadic',
  }: {
    size?: number;
    type?: 'monadic' | 'variadic';
  } = {}
): any {
  return (type === 'monadic' && fn.length === 1 ? monadic : variadic).bind(
    // @ts-ignore 'this' implicitly has type 'any' because it does not have a type annotation
    this,
    fn,
    new FixedSizeCache(size),
    serializerDefault
  );
}
