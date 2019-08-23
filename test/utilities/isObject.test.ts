// Source
import { isObject } from '../../src/utilities/isObject';

describe('isObject', () => {
  it('tests if item is an object', () => {
    expect.assertions(6);

    expect(isObject({})).toEqual(true);
    expect(isObject(new Object('A'))).toEqual(true);

    expect(isObject([])).toEqual(false);
    expect(isObject(undefined)).toEqual(false);
    expect(isObject(null)).toEqual(false);
    expect(isObject('a')).toEqual(false);
  });
});
