// Source
import { memoize, SizedCache } from '../../src/utilities/memoize';

// Suite
describe('memoize', () => {
  it('speed', () => {
    expect.assertions(1);

    // Non-memoized
    function vanillaFibonacci(n: number): number {
      return n < 2 ? n : vanillaFibonacci(n - 1) + vanillaFibonacci(n - 2);
    }

    const vanillaExecTimeStart = Date.now();
    vanillaFibonacci(35);
    const vanillaExecTime = Date.now() - vanillaExecTimeStart;

    // Memoized
    let fibonacci = (n: number): number => (n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2));
    fibonacci = memoize(fibonacci);

    const memoizedFibonacci = fibonacci;
    const memoizedExecTimeStart = Date.now();
    memoizedFibonacci(35);
    const memoizedExecTime = Date.now() - memoizedExecTimeStart;

    expect(memoizedExecTime < vanillaExecTime).toBe(true);
  });

  it('memoize functions with single primitive argument', () => {
    expect.assertions(2);

    function addition(numb: number): number {
      return numb + 1;
    }

    const memoizedAddition = memoize(addition);

    expect(memoizedAddition(1)).toBe(2);
    expect(memoizedAddition(1)).toBe(2);
  });

  it('memoize functions with single non-primitive argument', () => {
    expect.assertions(4);

    let numberOfCalls = 0;

    function addition(obj: any): number {
      numberOfCalls++;
      return obj.number + 1;
    }

    const memoizedAddition = memoize(addition);

    expect(memoizedAddition({ number: 1 })).toBe(2);
    expect(numberOfCalls).toBe(1);
    expect(memoizedAddition({ number: 1 })).toBe(2);
    expect(numberOfCalls).toBe(1);
  });

  it('memoize functions with N arguments', () => {
    expect.assertions(2);

    function nToThePower(n: number, power: number): number {
      return Math.pow(n, power);
    }

    const memoizedNToThePower = memoize(nToThePower);

    expect(memoizedNToThePower(2, 3)).toBe(8);
    expect(memoizedNToThePower(2, 3)).toBe(8);
  });

  it('single argument primitive test', () => {
    expect.assertions(2);

    function kindOf(arg: any): boolean {
      return arg && typeof arg === 'object' ? arg.constructor.name : typeof arg;
    }

    const memoizedKindOf = memoize(kindOf);

    expect(memoizedKindOf(2)).toEqual('number');
    expect(memoizedKindOf('2')).toEqual('string');
  });

  it('explicitly use exposed monadic strategy', () => {
    let numberOfCalls = 0;

    function addition(numb: number): number {
      numberOfCalls += 1;
      return numb + 1;
    }

    const memoizedAddition = memoize(addition, 'monadic');

    // Assertions
    expect(memoizedAddition(1)).toBe(2);
    expect(numberOfCalls).toBe(1);
    expect(memoizedAddition(1)).toBe(2);
    expect(numberOfCalls).toBe(1);
  });

  it('explicitly use exposed variadic strategy', () => {
    let numberOfCalls = 0;

    function addition(numb: number): number {
      numberOfCalls += 1;
      return numb + 1;
    }

    const memoizedAddition = memoize(addition, 'variadic');

    // Assertions
    expect(memoizedAddition(1)).toBe(2);
    expect(numberOfCalls).toBe(1);
    expect(memoizedAddition(1)).toBe(2);
    expect(numberOfCalls).toBe(1);
  });

  it('SizedCache works with integers', () => {
    const cache = new SizedCache(3);

    cache.set(1, 'foo');

    expect(cache.get(1)).toEqual('foo');

    cache.set(2, 'bar');
    cache.set(3, 'baz');
    cache.set(4, 'baa');

    expect(cache.get(1)).toEqual(undefined);
    expect(cache.get(2)).toEqual('bar');
    expect(cache.get(3)).toEqual('baz');
    expect(cache.get(4)).toEqual('baa');
  });

  it('SizedCache works with strings', () => {
    const cache = new SizedCache(3);

    cache.set('a', 1);

    expect(cache.get('a')).toEqual(1);

    cache.set('b', 2);
    cache.set('c', 3);
    cache.set('d', 4);
    cache.set('e', 5);

    expect(cache.get('b')).toEqual(undefined);
    expect(cache.get('c')).toEqual(3);
    expect(cache.get('d')).toEqual(4);
    expect(cache.get('e')).toEqual(5);
  });
});
