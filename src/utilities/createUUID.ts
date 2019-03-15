/**
 * Creates a single interface around the Crypto API (IE 11 requires a `ms` prefix)
 *
 * For current browser support please refer to: https://caniuse.com/#search=crypto
 */

const getRandomValuesInterface =
  (typeof crypto !== 'undefined' &&
    crypto.getRandomValues &&
    crypto.getRandomValues.bind(crypto)) ||
  // @ts-ignore msCrypto does not have a type entry but is valid in IE 11
  (typeof msCrypto !== 'undefined' &&
    // @ts-ignore msCrypto does not have a type entry but is valid in IE 11
    typeof window.msCrypto.getRandomValues === 'function' &&
    // @ts-ignore msCrypto does not have a type entry but is valid in IE 11
    msCrypto.getRandomValues.bind(msCrypto));

/**
 * Get a 16 random byte values array either using the Crypto API or the Math.random() fallback
 */
export const getRandomValues = () => {
  if (getRandomValuesInterface) {
    const data = new Uint8Array(16);

    getRandomValuesInterface(data);

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
 * Pre-computed byte to hexadecimal array
 *
 * export const hex: string[] = [];
 *
 * for (let i = 0; i < 256; i++) {
 *   hex[i] = (i + 0x100).toString(16).substr(1);
 * }
 */

// prettier-ignore
export const hex = [
  '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '0a', '0b', '0c', '0d', '0e', '0f',
  '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '1a', '1b', '1c', '1d', '1e', '1f',
  '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '2a', '2b', '2c', '2d', '2e', '2f',
  '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '3a', '3b', '3c', '3d', '3e', '3f',
  '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '4a', '4b', '4c', '4d', '4e', '4f',
  '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '5a', '5b', '5c', '5d', '5e', '5f',
  '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '6a', '6b', '6c', '6d', '6e', '6f',
  '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '7a', '7b', '7c', '7d', '7e', '7f',
  '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '8a', '8b', '8c', '8d', '8e', '8f',
  '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '9a', '9b', '9c', '9d', '9e', '9f',
  'a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'aa', 'ab', 'ac', 'ad', 'ae', 'af',
  'b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'ba', 'bb', 'bc', 'bd', 'be', 'bf',
  'c0', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'ca', 'cb', 'cc', 'cd', 'ce', 'cf',
  'd0', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'da', 'db', 'dc', 'dd', 'de', 'df',
  'e0', 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'ea', 'eb', 'ec', 'ed', 'ee', 'ef',
  'f0', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'fa', 'fb', 'fc', 'fd', 'fe', 'ff',
];

/**
 * Create a 32 character RFC-compliant V4 unique identifier
 *
 * https://www.ietf.org/rfc/rfc4122.txt
 */
export const createUUID = () => {
  const r = getRandomValues();

  /**
   * Convert array of 16 byte values to UUID string format of the form:
   * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   */

  // Per V4.4, set bits for version and `clock_seq_hi_and_reserved`
  r[6] = (r[6] & 0x0f) | 0x40;
  r[8] = (r[8] & 0x3f) | 0x80;

  // Possibly necessary to work out a memory issue in Chrome and Node
  // https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  // return [
  //   hex[r[0]],
  //   hex[r[1]],
  //   hex[r[2]],
  //   hex[r[3]],
  //   '-',
  //   hex[r[4]],
  //   hex[r[5]],
  //   '-',
  //   hex[r[6]],
  //   hex[r[7]],
  //   '-',
  //   hex[r[8]],
  //   hex[r[9]],
  //   '-',
  //   hex[r[10]],
  //   hex[r[11]],
  //   hex[r[12]],
  //   hex[r[13]],
  //   hex[r[14]],
  //   hex[r[15]],
  // ].join('');

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
