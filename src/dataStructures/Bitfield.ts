/**
 * Inspired by https://github.com/thi-ng/umbrella/blob/master/packages/bitfield/src/bitfield.ts
 */

/**
 * Bitfield is a simple resizable bitfield data structure
 * It is an efficient way of storing many boolean values
 */
export class Bitfield {
  private data: Uint32Array;
  private size: number;

  /**
   * Set the size of the bitfield and initializes the internal data buffer
   *
   * @param size Size of the bitfield
   */
  constructor(size: number) /* O(1) */ {
    this.size = (size + 31) & ~31;
    this.data = new Uint32Array(this.size >>> 5);
  }

  /**
   * Get a bit value by index
   *
   * @param index Index of bit
   */
  public get(index: number): boolean /* O(1) */ {
    return (this.data[index >>> 5] & (0x80000000 >>> (index & 31))) !== 0;
  }

  /**
   * Set a bit index with value
   *
   * 1 << 0   = 1            = 0b00000000000000000000000000000001
   * 1 << 1   = 2            = 0b00000000000000000000000000000010
   * ......   = .........    = ..................................
   * 1 << 30  = 1073741824   = 0b01000000000000000000000000000000
   * 1 << 31  = 2147483648   = 0b10000000000000000000000000000000
   *
   * Where 0, 1, ..., 30 and 31 are indices into the bitfield
   *
   * @param index Index of bit
   * @param value Value of bit
   */
  public set(index: number, value: boolean = true): boolean /* O(1) */ {
    const bitIndex = index >>> 5;
    const bitMask = 0x80000000 >>> (index & 31);
    const bitValue = this.data[bitIndex] & bitMask;

    if (value) {
      this.data[bitIndex] |= bitMask;
    } else {
      this.data[bitIndex] &= ~bitMask;
    }

    return bitValue !== 0;
  }

  /**
   * Resize the bitfield
   *
   * @param size New size of the bitfield
   */
  public resize(size: number): void /* O(1) */ {
    size = (size + 31) & ~31;

    const tmp = new Uint32Array(size >>> 5);
    tmp.set(this.data.slice(0, tmp.length));

    this.data = tmp;
    this.size = size;
  }

  /**
   * Stringify the bitfield
   */
  public toString(): string /* O(n) */ {
    return `0b${[...Array.from(this.data)]
      .map(bit => (bit >>> 0).toString(2).padStart(32, '0'))
      .join('')}`;
  }
}
