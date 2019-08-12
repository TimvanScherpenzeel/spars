// Features
import isCryptoSupported from '../features/browserFeatures/isCryptoSupported';

/**
 * Get a 16 random byte values array either using the Crypto API or the Math.random() fallback
 */
export const getRandomValues = (): Uint8Array | number[] => {
  if (isCryptoSupported) {
    const data = new Uint8Array(16);

    window.crypto.getRandomValues(data);

    return data;
  } else {
    const data = new Array(16);

    let r = 0;

    for (let i = 0; i < 16; i++) {
      if ((i & 0x03) === 0) {
        r = Math.random() * 0x100000000;
      }

      data[i] = (r >>> ((i & 0x03) << 3)) & 0xff;
    }

    return data;
  }
};

/**
 * Compute byte to hexadecimal array
 */
export const hex: string[] = [];

for (let i = 0; i < 256; i++) {
  hex[i] = (i + 0x100).toString(16).substr(1);
}

/**
 * Create a 32 character RFC-compliant V4 unique identifier
 *
 * https://www.ietf.org/rfc/rfc4122.txt
 */
export const getUUID = (): string => {
  const r = getRandomValues();

  /**
   * Convert array of 16 byte values to UUID string format of the form:
   * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   */

  // Per V4.4, set bits for version and `clock_seq_hi_and_reserved`
  r[6] = (r[6] & 0x0f) | 0x40;
  r[8] = (r[8] & 0x3f) | 0x80;

  return (
    hex[r[0]] +
    hex[r[1]] +
    hex[r[2]] +
    hex[r[3]] +
    '-' +
    hex[r[4]] +
    hex[r[5]] +
    '-' +
    hex[r[6]] +
    hex[r[7]] +
    '-' +
    hex[r[8]] +
    hex[r[9]] +
    '-' +
    hex[r[10]] +
    hex[r[11]] +
    hex[r[12]] +
    hex[r[13]] +
    hex[r[14]] +
    hex[r[15]]
  );
};
