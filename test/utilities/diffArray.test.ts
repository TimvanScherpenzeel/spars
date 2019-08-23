// Source
import { diffArray } from '../../src/utilities/diffArray';

describe('diffArray', () => {
  it('creates a diff between two objects', () => {
    expect.assertions(1);

    const A = [3, 5, 60, 10, 80, 140];
    const B = [5, 3, 60, 80, 120, 100];

    expect(diffArray(A, B)).toEqual([10, 140, 120, 100]);
  });
});
