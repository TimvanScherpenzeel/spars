// Source
import { Bitfield } from '../../src/dataStructures/Bitfield';

describe('Bitfield', () => {
  it('should take a size as argument and fit automatically to 32-bit chunks', () => {
    expect.assertions(2);

    const bitfieldA = new Bitfield(31);

    expect(bitfieldA.length).toEqual(32);

    const bitfieldB = new Bitfield(33);

    expect(bitfieldB.length).toEqual(64);
  });

  it('should allow to set / get a bit', () => {
    expect.assertions(11);

    const bitfieldA = new Bitfield(5);

    expect(bitfieldA.length).toEqual(32);

    bitfieldA.set(2, true);
    expect(bitfieldA.get(2)).toEqual(true);

    expect(bitfieldA.toString()).toEqual('0b00100000000000000000000000000000');

    bitfieldA.set(2, false);
    expect(bitfieldA.get(2)).toEqual(false);

    expect(bitfieldA.toString()).toEqual('0b00000000000000000000000000000000');

    bitfieldA.resize(33);

    expect(bitfieldA.length).toEqual(64);

    expect(bitfieldA.toString()).toEqual(
      '0b0000000000000000000000000000000000000000000000000000000000000000'
    );

    bitfieldA.set(36, true);
    expect(bitfieldA.get(36)).toEqual(true);

    expect(bitfieldA.toString()).toEqual(
      '0b0000000000000000000000000000000000001000000000000000000000000000'
    );

    bitfieldA.set(36, false);
    expect(bitfieldA.get(36)).toEqual(false);

    expect(bitfieldA.toString()).toEqual(
      '0b0000000000000000000000000000000000000000000000000000000000000000'
    );
  });
});
