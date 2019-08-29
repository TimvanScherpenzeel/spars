/**
 * Convert Blob to ArrayBuffer
 *
 * TODO: memoization does not work properly here
 *
 * @param blob Blob to convert
 */
export const convertBlobToArrayBuffer = (blob: Blob): Promise<void> => {
  return new Promise((resolve, reject): void => {
    const reader = new FileReader();

    reader.addEventListener('loadend', (event: Event) => {
      resolve((reader as any).result);
    });

    reader.addEventListener('error', reject);
    reader.readAsArrayBuffer(blob);
  });
};
