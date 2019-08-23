// Source
import { BitField } from '../../src/dataStructures/BitField';

describe('BitField', () => {
  it('should take a size as argument and fit automatically to 32-bit chunks', () => {
    expect.assertions(2);

    const bitfieldA = new BitField(31);

    expect(bitfieldA.length).toEqual(32);

    const bitfieldB = new BitField(33);

    expect(bitfieldB.length).toEqual(64);
  });

  it('should allow to set / get a bit', () => {
    expect.assertions(11);

    const bitfield = new BitField(5);

    expect(bitfield.length).toEqual(32);

    bitfield.set(2, true);
    expect(bitfield.get(2)).toEqual(true);

    expect(bitfield.toString()).toEqual('0b00100000000000000000000000000000');

    bitfield.set(2, false);
    expect(bitfield.get(2)).toEqual(false);

    expect(bitfield.toString()).toEqual('0b00000000000000000000000000000000');

    bitfield.resize(33);

    expect(bitfield.length).toEqual(64);

    expect(bitfield.toString()).toEqual(
      '0b0000000000000000000000000000000000000000000000000000000000000000'
    );

    bitfield.set(36, true);
    expect(bitfield.get(36)).toEqual(true);

    expect(bitfield.toString()).toEqual(
      '0b0000000000000000000000000000000000001000000000000000000000000000'
    );

    bitfield.set(36, false);
    expect(bitfield.get(36)).toEqual(false);

    expect(bitfield.toString()).toEqual(
      '0b0000000000000000000000000000000000000000000000000000000000000000'
    );
  });
});
