/**
 * Convert ArrayBuffer to Blob
 *
 * @param buffer Buffer to convert
 * @param type MIME type of ArrayBuffer to store
 */
export const convertArrayBufferToBlob = (buffer: ArrayBuffer, type: string) =>
  new Blob([buffer], { type });
