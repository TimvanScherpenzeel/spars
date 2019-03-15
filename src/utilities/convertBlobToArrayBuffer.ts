/**
 * Convert Blob to ArrayBuffer
 *
 * @param blob Blob to convert
 */
export const convertBlobToArrayBuffer = (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('loadend', (event: Event) => {
      // @ts-ignore
      resolve(reader.result);
    });

    reader.addEventListener('error', reject);
    reader.readAsArrayBuffer(blob);
  });
};
