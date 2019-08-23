// Utilities
import { isObject } from './isObject';

// Types
import { TNullable } from '../types';

/**
 * Find the difference between two objects
 *
 * @param objectA First object
 * @param objectB Second object
 */
export const diffObject = (objectA: any, objectB: any): TNullable<any> => {
  if (!isObject(objectA) || !isObject(objectB)) {
    return null;
  }

  let output: any = null;

  // tslint:disable-next-line:forin
  for (const key in objectB) {
    const aProp = objectA[key];
    const bProp = objectB[key];

    if (aProp !== bProp && !isObject(aProp) && !isObject(bProp)) {
      if (!output) {
        output = {};
      }
      output[key] = bProp;
    } else if (isObject(aProp) && isObject(bProp)) {
      const deepObjDif = diffObject(aProp, bProp);

      if (deepObjDif) {
        if (!output) {
          output = {};
        }
        output[key] = deepObjDif;
      }
    }
  }

  return output;
};
