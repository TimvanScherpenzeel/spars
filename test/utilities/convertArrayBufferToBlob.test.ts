// Source
import { convertArrayBufferToBlob } from '../../src/utilities/convertArrayBufferToBlob';

describe('convertArrayBufferToBlob', () => {
  it('should correctly construct a Blob from an ArrayBuffer', () => {
    expect.assertions(1);

    const PNG_MIME_TYPE = 'image/png';
    const EMPTY_ARRAY_BUFFER = new ArrayBuffer(100);

    expect(convertArrayBufferToBlob(EMPTY_ARRAY_BUFFER, PNG_MIME_TYPE)).toBeInstanceOf(Blob);
  });
});
