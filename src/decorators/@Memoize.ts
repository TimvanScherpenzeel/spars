/**
 * Inspired by https://github.com/typescript-plus/fast-memoize-decorator
 */

// Utilities
import { memoize } from '../utilities';

export function Memoize(): any {
  return (target: {}, propertyKey: string, descriptor: PropertyDescriptor): void => {
    const value = descriptor.value;

    if (typeof value === 'function') {
      descriptor.value = newFunction(propertyKey, value as () => any);
      return;
    }

    const get = descriptor.get;

    if (get != null) {
      descriptor.get = newGetter(propertyKey, get);
    }
  };
}

function newFunction(name: string, fn: () => any): any {
  return function (this: any, ...args: any[]): any {
    const bound = fn.bind(this);
    const value = (memoize as (...args: any[]) => (...args: any[]) => any)(bound);

    Object.defineProperty(this, name, { value });

    return value(...args);
  };
}

function newGetter(name: string, fn: () => any): any {
  return function (this: any): any {
    const value = fn.apply(this);

    Object.defineProperty(this, name, { value });

    return value;
  };
}
