// Source
import { LRUCache } from '../../src/caching';

// Constants
import { TEST_CONSTANTS } from '../constants';

const { Ax, Ay, Az } = TEST_CONSTANTS;

let lruCache;

// Suite
describe('LRUCache', () => {
  it('should instantiate a new LRUCache', () => {
    expect.assertions(1);

    const MAX_LRU_CACHE_SIZE = 10;

    lruCache = new LRUCache(MAX_LRU_CACHE_SIZE);

    expect(lruCache).toBeInstanceOf(LRUCache);
  });

  it('should be able to set an entry and have a callback fired upon removing an entry', () => {
    expect.assertions(1);

    const MAX_LRU_CACHE_SIZE = 10;
    const LRU_OVERFLOW = 15;

    lruCache = new LRUCache(MAX_LRU_CACHE_SIZE);

    let refCounter = 0;

    for (let i = 0; i < MAX_LRU_CACHE_SIZE + LRU_OVERFLOW; i++) {
      const uniqueId = Math.random();

      lruCache.setEntry(`${uniqueId}`, Ax, () => {
        refCounter++;
      });
    }

    expect(refCounter).toEqual(LRU_OVERFLOW);
  });

  it('should replace the least used entry with a new entry', () => {
    expect.assertions(100 + 10 + 1 + 1);

    const MAX_LRU_CACHE_SIZE = 2;

    lruCache = new LRUCache(MAX_LRU_CACHE_SIZE);

    const mostUsedEntry = Ax;
    const leastUsedEntry = Ay;
    const replacementEntry = Az;

    lruCache.setEntry(`${mostUsedEntry}`, Ax);
    lruCache.setEntry(`${leastUsedEntry}`, Ay);

    for (let i = 0; i < 100; i++) {
      const entry = lruCache.getEntry(`${mostUsedEntry}`);
      expect(entry).toEqual(mostUsedEntry);
    }

    for (let i = 0; i < 10; i++) {
      const entry = lruCache.getEntry(`${leastUsedEntry}`);
      expect(entry).toEqual(leastUsedEntry);
    }

    lruCache.setEntry(`${replacementEntry}`, Az);

    expect(lruCache.getCache.size).toEqual(MAX_LRU_CACHE_SIZE);
    expect(lruCache.getList.getLength).toEqual(MAX_LRU_CACHE_SIZE);
  });
});
