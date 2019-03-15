// Source
import { convertArrayBufferToBlob } from '../../src/utilities/convertArrayBufferToBlob';
import { convertBlobToArrayBuffer } from '../../src/utilities/convertBlobToArrayBuffer';

describe('convertBlobToArrayBuffer', () => {
  it('should correctly construct a Blob from an ArrayBuffer', () => {
    const PNG_MIME_TYPE = 'image/png';
    const EMPTY_ARRAY_BUFFER = new ArrayBuffer(100);

    const blob = convertArrayBufferToBlob(EMPTY_ARRAY_BUFFER, PNG_MIME_TYPE);
    const arrayBuffer = convertBlobToArrayBuffer(blob);

    arrayBuffer.then(buffer => {
      expect.assertions(1);

      expect(buffer).toBeInstanceOf(ArrayBuffer);
    });
  });
});
