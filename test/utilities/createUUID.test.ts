// Source
import { createUUID, getRandomValues, hex } from '../../src/utilities/createUUID';

// Regular expression used for basic parsing of the uuid.
const UUIDRegexPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Extracts the version from the UUID, which is (by definition) the M in
 * xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
 */
const extractVersion = (uuid: string) => {
  // @ts-ignore The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type
  return uuid.charAt(14) | 0;
};

// Suite
describe('UUID', () => {
  it('should create a new UUID with a length of 32, plus 4 including dashes, characters', () => {
    expect.assertions(1);

    const uuid = createUUID();

    expect(uuid.length).toStrictEqual(32 + 4);
  });

  it('should create 16 random values', () => {
    expect.assertions(1);

    const r = getRandomValues();

    expect(r.length).toStrictEqual(16);
  });

  it('should use a pre-calculated hex array of 256 characters', () => {
    expect.assertions(1);

    expect(hex.length).toStrictEqual(256);
  });

  it('should create a valid and V4 spec compliant UUID', () => {
    expect.assertions(1000);

    for (let i = 0; i < 1000; i++) {
      const uuid = createUUID();

      expect(UUIDRegexPattern.test(uuid)).toStrictEqual(true);
    }
  });

  it('should correctly extract a version number from the UUID', () => {
    expect.assertions(1000);

    for (let i = 0; i < 1000; i++) {
      const uuid = createUUID();

      expect(extractVersion(uuid)).toStrictEqual(4);
    }
  });

  it('should correctly specify a variant', () => {
    expect.assertions(1000);

    for (let i = 0; i < 1000; i++) {
      const uuid = createUUID();

      expect(['8', '9', 'a', 'b'].indexOf(uuid.charAt(19))).not.toStrictEqual(-1);
    }
  });
});
