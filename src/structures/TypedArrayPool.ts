/**
 * Computes log base 2
 *
 * @param v Value to compute
 */
const logBaseTwo = (value: number) => {
  let r;
  let shift;

  // @ts-ignore
  r = (value > 0xffff) << 4;
  value >>>= r;

  // @ts-ignore
  shift = (value > 0xff) << 3;
  value >>>= shift;
  r |= shift;

  // @ts-ignore
  shift = (value > 0xf) << 2;
  value >>>= shift;
  r |= shift;

  // @ts-ignore
  shift = (value > 0x3) << 1;
  value >>>= shift;
  r |= shift;

  return r | (value >> 1);
};

/**
 * Rounds to the next power of two
 *
 * @param value Value to round
 */
export const nextPowerOfTwo = (value: number) => {
  // @ts-ignore
  value += value === 0;
  --value;

  value |= value >>> 1;
  value |= value >>> 2;
  value |= value >>> 4;
  value |= value >>> 8;
  value |= value >>> 16;

  return value + 1;
};

const DEFAULT_SIZE = 32;

const TYPED_ARRAY_POOL = {
  DATAVIEW: new Array(DEFAULT_SIZE).fill(0),

  INT_8: new Array(DEFAULT_SIZE).fill(0),
  // tslint:disable-next-line:object-literal-sort-keys
  INT_16: new Array(DEFAULT_SIZE).fill(0),
  INT_32: new Array(DEFAULT_SIZE).fill(0),
  INT_64: new Array(DEFAULT_SIZE).fill(0),

  UINT_8: new Array(DEFAULT_SIZE).fill(0),
  UINT_8_CLAMPED: new Array(DEFAULT_SIZE).fill(0),
  UINT_16: new Array(DEFAULT_SIZE).fill(0),
  UINT_32: new Array(DEFAULT_SIZE).fill(0),
  UINT_64: new Array(DEFAULT_SIZE).fill(0),

  FLOAT_32: new Array(DEFAULT_SIZE).fill(0),
  FLOAT_64: new Array(DEFAULT_SIZE).fill(0),
};

export class TypedArrayPool {
  private static allocArrayBuffer = (value: number) => {
    const slot = nextPowerOfTwo(value);
    const logSlot = logBaseTwo(slot);
    const dataView = TYPED_ARRAY_POOL.DATAVIEW[logSlot];

    if (dataView.length > 0) {
      return dataView.pop();
    }

    return new ArrayBuffer(slot);
  };

  public alloc(value: number, type = 'arraybuffer') {
    if (type === 'arraybuffer') {
      return TypedArrayPool.allocArrayBuffer(value);
    } else {
      switch (type) {
        case 'DATAVIEW':
          return new DataView(TypedArrayPool.allocArrayBuffer(value), 0, value);
        case 'INT_8':
          return new Int8Array(TypedArrayPool.allocArrayBuffer(value), 0, value);
        case 'INT_16':
          return new Int16Array(TypedArrayPool.allocArrayBuffer(2 * value), 0, value);
        case 'INT_32':
          return new Int32Array(TypedArrayPool.allocArrayBuffer(4 * value), 0, value);
        case 'INT_64':
          return new BigInt64Array(TypedArrayPool.allocArrayBuffer(8 * value), 0, value);

        case 'UINT_8':
          return new Uint8Array(TypedArrayPool.allocArrayBuffer(value), 0, value);
        case 'UINT_8_CLAMPED':
          return new Uint8ClampedArray(TypedArrayPool.allocArrayBuffer(value), 0, value);
        case 'UINT_16':
          return new Uint16Array(TypedArrayPool.allocArrayBuffer(2 * value), 0, value);
        case 'UINT_32':
          return new Uint32Array(TypedArrayPool.allocArrayBuffer(4 * value), 0, value);
        case 'UINT_64':
          return new BigUint64Array(TypedArrayPool.allocArrayBuffer(8 * value), 0, value);

        case 'FLOAT_32':
          return new Float32Array(TypedArrayPool.allocArrayBuffer(4 * value), 0, value);
        case 'FLOAT_64':
          return new Float64Array(TypedArrayPool.allocArrayBuffer(8 * value), 0, value);

        default:
          return TypedArrayPool.allocArrayBuffer(value);
      }
    }
  }

  public free(
    array:
      | ArrayBuffer
      | Int8Array
      | Int16Array
      | Int32Array
      | BigInt64Array
      | Uint8Array
      | Uint8ClampedArray
      | Uint16Array
      | Uint32Array
      | BigUint64Array
      | Float32Array
      | Float64Array
  ) {
    let buffer;

    // @ts-ignore
    if (array.buffer || Object.prototype.toString.call(array) !== '[object ArrayBuffer]') {
      // @ts-ignore
      buffer = array.buffer;
    } else {
      buffer = array;
    }

    if (!buffer) {
      return;
    }

    const slot = buffer.length || buffer.byteLength;
    const logSlot = logBaseTwo(slot) | 0;

    TYPED_ARRAY_POOL.DATAVIEW[logSlot].push(buffer);
  }

  public clear() {
    let i;

    for (i = 0; i < DEFAULT_SIZE; i += 1) {
      TYPED_ARRAY_POOL.DATAVIEW[i].length = 0;

      TYPED_ARRAY_POOL.INT_8[i].length = 0;
      TYPED_ARRAY_POOL.INT_16[i].length = 0;
      TYPED_ARRAY_POOL.INT_32[i].length = 0;
      TYPED_ARRAY_POOL.INT_64[i].length = 0;

      TYPED_ARRAY_POOL.UINT_8[i].length = 0;
      TYPED_ARRAY_POOL.UINT_8_CLAMPED[i].length = 0;
      TYPED_ARRAY_POOL.UINT_16[i].length = 0;
      TYPED_ARRAY_POOL.UINT_32[i].length = 0;
      TYPED_ARRAY_POOL.UINT_64[i].length = 0;

      TYPED_ARRAY_POOL.FLOAT_32[i].length = 0;
      TYPED_ARRAY_POOL.FLOAT_64[i].length = 0;
    }
  }
}
