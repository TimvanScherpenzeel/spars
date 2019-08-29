/**
 * Inspired by https://github.com/getify/deePool
 */

// Types
import { TNullable } from '../types';

const EMPTY_SLOT = Object.freeze(Object.create(null));

/**
 * Create a new pool.
 */
export const createObjectPool = (objectFactory: any = {}): any => {
  const pool: any[] = [];
  let nextFreeSlot: TNullable<number> = null;

  function use(): any {
    let objToUse;

    if (nextFreeSlot === null || nextFreeSlot === pool.length) {
      grow(pool.length || 5);
    }

    objToUse = pool[nextFreeSlot as number];
    pool[(nextFreeSlot as number)++] = EMPTY_SLOT;

    // Clean object before making it available again
    if (!objToUse || objToUse.constructor !== Object) {
      return undefined;
    }

    // tslint:disable-next-line:forin
    for (const key in objToUse) {
      objToUse[key] = undefined;
    }

    return objToUse;
  }

  function recycle(obj: any): void {
    if (!(obj instanceof Object)) {
      return undefined;
    }

    if (nextFreeSlot === null || nextFreeSlot === -1) {
      pool[pool.length] = obj;

      return undefined;
    }

    pool[--nextFreeSlot] = obj;
  }

  function grow(count: number = pool.length): number {
    let currentLength;
    let i;

    if (count > 0 && nextFreeSlot == null) {
      nextFreeSlot = 0;
    }

    if (count > 0) {
      currentLength = pool.length;
      pool.length += count;

      for (i = currentLength; i < pool.length; i++) {
        pool[i] = objectFactory();
      }
    }

    return pool.length;
  }

  function length(): number {
    return pool.length;
  }

  return {
    grow,
    length,
    pool,
    recycle,
    use,
  };
};
