// Source
import { convertArrayBufferToBlob } from '../../src/utilities/convertArrayBufferToBlob';
import { convertBlobToArrayBuffer } from '../../src/utilities/convertBlobToArrayBuffer';

// Suite
describe('convertArrayBufferToBlob', () => {
  it('should convert an ArrayBuffer to a blob succesfully', async () => {
    expect.assertions(5);

    const smallArr = new Uint8Array([...Array(10)]);
    const smallBlob = convertArrayBufferToBlob(smallArr.buffer, 'application/octet-stream');

    expect(smallArr.buffer.byteLength).toStrictEqual(smallArr.length);
    expect(smallBlob).toBeInstanceOf(Blob);
    expect(smallBlob.size).toStrictEqual(smallArr.buffer.byteLength);

    await convertBlobToArrayBuffer(smallBlob).then(buffer => {
      expect(buffer).toStrictEqual(smallArr.buffer);
      expect(new Uint8Array(buffer as any, 0)).toStrictEqual(smallArr);
    });
  });
});
