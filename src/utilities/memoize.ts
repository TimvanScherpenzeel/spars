export class SizedCache {
  private size: number;
  private track: any[] = new Array(this.size);
  private cache: any = {};
  private index: number = 0;

  constructor(size: number) {
    this.size = size;
  }

  public get(key: any): any {
    return this.cache[key];
  }

  public set(key: any, value: any): any {
    this.cache[key] = value;

    if (this.track[this.index]) {
      delete this.cache[this.track[this.index]];
    }

    this.track[this.index] = key;

    this.index++;

    if (this.index === this.size) {
      this.index = 0;
    }
  }
}

function monadic(fn: any, cache: SizedCache, serializer: any, arg: any): any {
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

function variadic(fn: any, cache: SizedCache, serializer: any): any {
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

const serializerDefault = (...args: any): string => JSON.stringify(args);

export const memoize = (
  fn: any,
  type: 'monadic' | 'variadic' = 'monadic',
  cacheSize: number = 3
): any => {
  return (type === 'monadic' && fn.length === 1 ? monadic : variadic).bind(
    // @ts-ignore 'this' implicitly has type 'any' because it does not have a type annotation
    this,
    fn,
    new SizedCache(cacheSize),
    serializerDefault
  );
};
