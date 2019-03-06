// Source
import { assert } from '../../src/utilities/assert';

const assertionErrorPrefix = 'Assert -> Assertion failed:';
const assertionErrorMessage = 'foo must be true';

const foo = true;

describe('assert', () => {
  it('should not throw any Error if the assertion passes', () => {
    expect.assertions(1);

    expect(() => assert(foo === true, `${assertionErrorMessage}`)).not.toThrow();
  });

  it(`should throw Error with message ${assertionErrorPrefix} ${assertionErrorMessage} if the assertion fails`, () => {
    expect.assertions(1);

    try {
      // @ts-ignore
      assert(foo === false, `${assertionErrorMessage}`);
      expect(true).toBe(false);
    } catch (err) {
      expect(err.message).toBe(`${assertionErrorPrefix} ${assertionErrorMessage}`);
    }
  });
});
