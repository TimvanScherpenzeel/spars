/**
 * Test an assertion for its truthiness
 *
 * @param {any} condition Assertion condition
 * @param {string} message Error message if the assertion has failed
 */
export const assert = (condition: any, message: string) => {
  if (!condition) {
    throw new Error(`Assert -> Assertion failed${message ? `: ${message}` : ''}`);
  }
};
