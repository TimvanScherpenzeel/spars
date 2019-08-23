// Source
import { diffObject } from '../../src/utilities/diffObject';

describe('diffObject', () => {
  it('creates a diff between two objects', () => {
    expect.assertions(4);

    const A = { a: true, b: false, c: 'A', d: null, e: 5 };
    const B = { a: false, b: false, c: 'B', d: null, e: 7, f: 10 };

    const C = diffObject(A, B);
    expect(C).toEqual({ a: false, c: 'B', e: 7, f: 10 });

    const D = { a: false, c: 'B', e: 'A', f: 15 };
    expect(diffObject(C, D)).toEqual({ e: 'A', f: 15 });

    const E = { a: 1, c: { d: 1, e: 3, f: { j: 'k' } }, g: 6 };
    const F = { a: 1, c: { d: 1, e: 6, f: { j: 'm' } }, b: 2, g: '6' };
    expect(diffObject(E, F)).toEqual({ c: { e: 6, f: { j: 'm' } }, b: 2, g: '6' });

    expect(diffObject(E, 'A')).toEqual(null);
  });
});
