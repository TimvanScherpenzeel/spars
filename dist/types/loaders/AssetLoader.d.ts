import { IByDeviceTypeOptions, IBySupportedCompressedTextureOptions, ILoadItem } from './types';
/**
 * Asynchronous asset preloader
 */
export declare class AssetLoader {
    /**
     * Load conditionally based on device type
     */
    static byDeviceType: (data: IByDeviceTypeOptions) => string | undefined;
    /**
     * Load conditionally based on supported compressed texture
     */
    static bySupportedCompressedTexture: (data: IBySupportedCompressedTextureOptions) => string | undefined;
    /**
     * DOMParser instance for the XML loader
     */
    private static domParser;
    /**
     * Get a file extension from a full asset path
     *
     * @param path Path to asset
     */
    private static getFileExtension;
    /**
     * Retrieve mime type from extension
     *
     * @param loaderKey Loader key
     * @param extension extension
     */
    private static getMimeType;
    /**
     * Retrieve loader key from extension (when the loader option isn't specified)
     *
     * @param path File path
     */
    private static getLoaderByFileExtension;
    /**
     * Fetch wrapper for loading an item, to be processed by a specific loader afterwards
     *
     * @param item Item to fetch
     */
    private static fetchItem;
    /**
     * Load an item and parse the Response as arrayBuffer
     *
     * @param item Item to load
     */
    private static loadArrayBuffer;
    /**
     * Load an item and parse the Response as <audio> element
     *
     * @param item Item to load
     */
    private static loadAudio;
    /**
     * Load an item and parse the Response as blob
     *
     * @param item Item to load
     */
    private static loadBlob;
    /**
     * Load an item and parse the Response as a FontFace
     *
     * @param item Item to load
     */
    private static loadFont;
    /**
     * Load an item and parse the Response as <image> element
     *
     * @param item Item to load
     */
    private static loadImage;
    /**
     * Load an item and parse the Response as ImageBitmap element
     *
     * NOTE: Please be cautious when using loadImageBitmap as browser support is still spotty and unreliable
     *
     *  See:
     * - https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html#dom-createimagebitmap
     * - https://caniuse.com/createimagebitmap
     * - https://bugzilla.mozilla.org/show_bug.cgi?id=1335594
     * - https://bugzilla.mozilla.org/show_bug.cgi?id=1363861
     *
     * @param item Item to load
     */
    private static loadImageBitmap;
    /**
     * Load an item and parse the Response as compressed image (KTX container)
     *
     * @param item Item to load
     */
    private static loadImageCompressed;
    /**
     * Load an item and parse the Response as JSON
     *
     * @param item Item to load
     */
    private static loadJSON;
    /**
     * Load an item and parse the Response as plain text
     *
     * @param item Item to load
     */
    private static loadText;
    /**
     * Load an item and parse the Response as <video> element
     *
     * @param item Item to load
     */
    private static loadVideo;
    /**
     * Load an item and parse the Response as ArrayBuffer (ready to instantiate)
     *
     * @param item Item to load
     */
    private static loadWebAssembly;
    /**
     * Load an item and parse the Response as XML
     *
     * @param item Item to load
     */
    private static loadXML;
    assets: Map<string, Promise<Response>>;
    /**
     * Load the specified manifest (array of items)
     *
     * @param items Items to load
     */
    loadAssets: (items: ILoadItem[]) => Promise<Map<any, any>>;
}
