// Source
import { convertArrayBufferToBlob } from '../../src/utilities/convertArrayBufferToBlob';
import { convertBlobToArrayBuffer } from '../../src/utilities/convertBlobToArrayBuffer';

// Suite
describe('convertBlobToArrayBuffer', () => {
  it('should convert a blob to an ArrayBuffer succesfully', async () => {
    expect.assertions(15);

    const smallArr = new Uint8Array([...Array(10)]);
    const smallBlob = convertArrayBufferToBlob(smallArr.buffer, 'application/octet-stream');

    expect(smallArr.buffer.byteLength).toStrictEqual(smallArr.length);
    expect(smallBlob).toBeInstanceOf(Blob);
    expect(smallBlob.size).toStrictEqual(smallArr.buffer.byteLength);

    await convertBlobToArrayBuffer(smallBlob).then(buffer => {
      expect(buffer).toStrictEqual(smallArr.buffer);
      expect(new Uint8Array(buffer as any, 0)).toStrictEqual(smallArr);
    });

    const largeArr = new Uint8Array([...Array(100000)]);
    const largeBlob = convertArrayBufferToBlob(largeArr.buffer, 'application/octet-stream');

    expect(largeArr.buffer.byteLength).toStrictEqual(largeArr.length);
    expect(largeBlob).toBeInstanceOf(Blob);
    expect(largeBlob.size).toStrictEqual(largeArr.buffer.byteLength);

    await convertBlobToArrayBuffer(largeBlob).then(buffer => {
      expect(buffer).toStrictEqual(largeArr.buffer);
      expect(new Uint8Array(buffer as any, 0)).toStrictEqual(largeArr);
    });

    const wrongMimeTypeArr = new Uint8Array([...Array(10)]);
    const wrongMimeTypeBlob = convertArrayBufferToBlob(wrongMimeTypeArr.buffer, 'image/jpeg');

    expect(wrongMimeTypeArr.buffer.byteLength).toStrictEqual(wrongMimeTypeArr.length);
    expect(wrongMimeTypeBlob).toBeInstanceOf(Blob);
    expect(wrongMimeTypeBlob.size).toStrictEqual(wrongMimeTypeArr.buffer.byteLength);

    await convertBlobToArrayBuffer(wrongMimeTypeBlob).then(buffer => {
      expect(buffer).toStrictEqual(wrongMimeTypeArr.buffer);
      expect(new Uint8Array(buffer as any, 0)).toStrictEqual(wrongMimeTypeArr);
    });
  });
});
