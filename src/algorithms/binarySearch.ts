/**
 * Efficiently find the index of a value in a provided array
 *
 * @param items Array of items to search
 * @param value Value to search for in the array of items
 */
export const binarySearch = (items: any[], value: any): number /* O(log(n)) */ => {
  let startIndex = 0;
  let stopIndex = items.length - 1;
  let middleIndex = (stopIndex + startIndex) >> 1;

  while (items[middleIndex] !== value && startIndex < stopIndex) {
    if (value < items[middleIndex]) {
      stopIndex = middleIndex - 1;
    } else if (value > items[middleIndex]) {
      startIndex = middleIndex + 1;
    }

    middleIndex = (stopIndex + startIndex) >> 1;
  }

  return items[middleIndex] !== value ? -1 : middleIndex;
};
