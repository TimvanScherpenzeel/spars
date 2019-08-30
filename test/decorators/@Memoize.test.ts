// Source
import { Memoize } from '../../src/decorators';

// Constants
import { TEST_CONSTANTS } from '../constants';

const { Ay } = TEST_CONSTANTS;

// Suite
describe('Memoize', () => {
  let counter = 0;

  class Tomorrow {
    // @ts-ignore experimental support for decorators was added
    @Memoize() public when(today: Date): Date {
      counter++;
      const date = new Date(today.getTime());
      date.setDate(date.getDate() + 1);
      return date;
    }
  }

  const tomorrow = new Tomorrow();

  it('should correctly cache upon consecutive hits', () => {
    expect.assertions(6);

    // Consecutive hits get cached up until a limit of 3
    expect(tomorrow.when(new Date(2000, 1, Ay))).toStrictEqual(new Date(2000, 1, Ay + 1));
    expect(counter).toEqual(1);

    expect(tomorrow.when(new Date(2000, 1, Ay))).toStrictEqual(new Date(2000, 1, Ay + 1));
    expect(counter).toEqual(1);

    expect(tomorrow.when(new Date(2000, 1, Ay))).toStrictEqual(new Date(2000, 1, Ay + 1));
    expect(counter).toEqual(1);
  });

  it('should correctly return from cache and cache break upon hitting the limit', () => {
    expect.assertions(16);

    // The results are correctly cached until broken where the oldest entry is removed
    expect(tomorrow.when(new Date(2000, 1, Ay + 1))).toStrictEqual(new Date(2000, 1, Ay + 2));
    expect(counter).toEqual(2);

    expect(tomorrow.when(new Date(2000, 1, Ay))).toStrictEqual(new Date(2000, 1, Ay + 1));
    expect(counter).toEqual(2);

    expect(tomorrow.when(new Date(2000, 1, Ay + 2))).toStrictEqual(new Date(2000, 1, Ay + 3));
    expect(counter).toEqual(3);

    expect(tomorrow.when(new Date(2000, 1, Ay))).toStrictEqual(new Date(2000, 1, Ay + 1));
    expect(counter).toEqual(3);

    expect(tomorrow.when(new Date(2000, 1, Ay + 1))).toStrictEqual(new Date(2000, 1, Ay + 2));
    expect(counter).toEqual(3);

    expect(tomorrow.when(new Date(2000, 1, Ay + 3))).toStrictEqual(new Date(2000, 1, Ay + 4));
    expect(counter).toEqual(4);

    // Once the cache limit of 3 has been reached break the memoize cache
    expect(tomorrow.when(new Date(2000, 1, Ay))).toStrictEqual(new Date(2000, 1, Ay + 1));
    expect(counter).toEqual(5);

    expect(tomorrow.when(new Date(2000, 1, Ay + 3))).toStrictEqual(new Date(2000, 1, Ay + 4));
    expect(counter).toEqual(5);
  });
});
