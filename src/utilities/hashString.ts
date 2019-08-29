// Utilities
import { assert } from './assert';

/**
 * Hash a string (memoized)
 *
 * 32-bit, DJB2
 *
 * Node (v10.6.0) - 2834.177ms - Collisions: 0.000% (0/100000)
 * Chrome (74.0.3729.157, 64-bit) - 3099.947021484375ms - Collisions: 0.000% (0/100000)
 * Safari (12.0.3) - 1716.174ms - Collisions: 0.000% (0/100000)
 * Firefox 67.0 (64-bits) - 10423ms - Collisions: 0.001% (1/100000)
 *
 * @param str String to hash
 *
 * SEE: https://github.com/darkskyapp/string-hash
 * SEE: https://jsperf.com/string-hash-speed
 * SEE: https://github.com/darkskyapp/string-hash/issues/10#issuecomment-422020290
 */
export const hashString = (str: string): number => {
  // Verify that the input string only has ASCII characters (negligible overhead)
  assert(/^[\x00-\x7F]*$/.test(str), 'HashString -> String contains non-ASCII characters');

  let hash = 5381;
  const stringLength = str.length;

  for (let i = 0; i < stringLength; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }

  return hash >>> 0;
};
