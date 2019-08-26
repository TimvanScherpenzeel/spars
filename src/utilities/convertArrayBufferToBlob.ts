/**
 * Convert ArrayBuffer to Blob
 *
 * @param buffer Buffer to convert
 * @param type MIME type of ArrayBuffer to store
 */
export const convertArrayBufferToBlob = (buffer: ArrayBuffer, type: string = ''): Blob =>
  new Blob([buffer], { type });
