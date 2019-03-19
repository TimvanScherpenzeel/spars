import { TypedArrayPool } from '../../src/structures/TypedArrayPool';

describe('TypedArrayPool', () => {
  it('can be instantiated', () => {
    const typedArrayPool = new TypedArrayPool();
    expect(typedArrayPool).toBeInstanceOf(TypedArrayPool);
  });
});
