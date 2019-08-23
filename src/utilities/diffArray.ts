// Types
import { TNullable } from '../types';

/**
 * Find the difference between two arrays
 *
 * @param arrayA First array
 * @param arrayB Second array
 */
export const diffArray = (arrayA: any[], arrayB: any[]): TNullable<any[]> => {
  if (!Array.isArray(arrayA) || !Array.isArray(arrayB)) {
    return null;
  }

  return arrayA.filter(x => !arrayB.includes(x)).concat(arrayB.filter(x => !arrayA.includes(x)));
};
