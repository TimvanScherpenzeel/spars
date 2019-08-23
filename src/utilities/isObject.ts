/**
 * Test if the item is an object
 *
 * @param item Any item to test
 */
export const isObject = (item: any): boolean => {
  return item === undefined || item === null
    ? false
    : item && typeof item === 'object' && !Array.isArray(item);
};
