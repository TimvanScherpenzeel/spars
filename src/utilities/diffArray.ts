// Types
import { TNullable } from '../types';

/**
 * Find all the array elements that are different in arrayB compared to arrayA
 *
 * @param arrayA First array
 * @param arrayB Second array
 */
export const diffArray = (arrayA: any[], arrayB: any[]): TNullable<any[]> => {
  if (!Array.isArray(arrayA) || !Array.isArray(arrayB)) {
    return null;
  }

  return arrayB.filter(x => !arrayA.includes(x));
};
