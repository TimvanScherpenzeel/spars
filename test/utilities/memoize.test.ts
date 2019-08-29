// Source
import { memoize } from '../../src/utilities/memoize';

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
      numberOfCalls += 1;
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

  it('memoize functions with spread arguments', () => {
    expect.assertions(2);

    function multiply(multiplier: number, ...theArgs: number[]): number[] {
      return theArgs.map((element: number): number => {
        return multiplier * element;
      });
    }

    const memoizedMultiply = memoize(multiply, {
      strategy: memoize.strategies.variadic,
    });

    expect(memoizedMultiply(2, 1, 2, 3)).toEqual([2, 4, 6]);
    expect(memoizedMultiply(2, 4, 5, 6)).toEqual([8, 10, 12]);
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

  it('inject custom cache', () => {
    expect.assertions(1);

    let setMethodExecutionCount = 0;

    // a custom cache instance must implement:
    // - has
    // - get
    // - set
    // - delete
    const customCacheProto = {
      has(key: any): boolean {
        // @ts-ignore
        return key in this.cache;
      },

      get(key: any): any {
        // @ts-ignore
        return this.cache[key];
      },
      set(key: any, value: any): void {
        setMethodExecutionCount++;
        // @ts-ignore
        this.cache[key] = value;
      },

      delete(key: any): void {
        // @ts-ignore
        delete this.cache[key];
      },
    };

    const customCache = {
      create(): any {
        const cache = Object.create(customCacheProto);
        cache.cache = Object.create(null);

        return cache;
      },
    };

    function minus(a: number, b: number): number {
      return a - b;
    }

    const memoizedMinus = (memoize as any)(minus, {
      cache: customCache,
    });

    memoizedMinus(3, 1);
    memoizedMinus(3, 1);

    expect(setMethodExecutionCount).toBe(1);
  });

  it('inject custom serializer', () => {
    expect.assertions(1);

    let serializerMethodExecutionCount = 0;

    function serializer(): string {
      serializerMethodExecutionCount++;
      return JSON.stringify(arguments);
    }

    function minus(a: number, b: number): number {
      return a - b;
    }

    const memoizedMinus = memoize(minus, {
      serializer,
    });

    memoizedMinus(3, 1);
    memoizedMinus(3, 1);

    expect(serializerMethodExecutionCount).toBe(2);
  });

  it('explicitly use exposed monadic strategy', () => {
    let numberOfCalls = 0;

    function addition(numb: number): number {
      numberOfCalls += 1;
      return numb + 1;
    }

    const spy = jest.spyOn(memoize.strategies, 'monadic');
    const memoizedAddition = memoize(addition, { strategy: memoize.strategies.monadic });

    expect(memoizedAddition(1)).toBe(2);
    expect(numberOfCalls).toBe(1);
    expect(memoizedAddition(1)).toBe(2);
    expect(numberOfCalls).toBe(1);
    expect(spy).toHaveBeenCalled();

    // Teardown
    spy.mockRestore();
  });

  it('explicitly use exposed variadic strategy', () => {
    expect.assertions(5);

    let numberOfCalls = 0;

    function addition(numb: number): number {
      numberOfCalls += 1;
      return numb + 1;
    }

    const spy = jest.spyOn(memoize.strategies, 'variadic');
    const memoizedAddition = memoize(addition, { strategy: memoize.strategies.variadic });

    expect(memoizedAddition(1)).toBe(2);
    expect(numberOfCalls).toBe(1);
    expect(memoizedAddition(1)).toBe(2);
    expect(numberOfCalls).toBe(1);
    expect(spy).toHaveBeenCalled();

    // Teardown
    spy.mockRestore();
  });
});
