// Types
import { TVoidable } from '../types';

/**
 * Test an assertion for its truthiness
 *
 * @param condition Assertion condition
 * @param message Error message if the assertion has failed
 */
export const assert = (condition: any, message: string): TVoidable<Error> => {
  if (!condition) {
    throw new Error(`Assert -> Assertion failed${message ? `: ${message}` : ''}`);
  }
};
