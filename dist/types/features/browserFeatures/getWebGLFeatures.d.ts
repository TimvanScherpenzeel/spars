declare const _default: false | {
    base: {
        renderer: any;
        rendererUnmasked: any;
        shaderVersion: any;
        vendor: any;
        vendorUnmasked: any;
        version: any;
    };
    general: {
        aliasedLineWidthRange: any;
        aliasedPointSizeRange: any;
        alphaBits: any;
        antialias: boolean;
        blueBits: any;
        depthBits: any;
        greenBits: any;
        maxCombinedTextureImageUnits: any;
        maxCubeMapTextureSize: any;
        maxFragmentUniformVectors: any;
        maxRenderBufferSize: any;
        maxTextureImageUnits: any;
        maxTextureSize: any;
        maxVaryingVectors: any;
        maxVertexAttributes: any;
        maxVertexTextureImageUnits: any;
        maxVertexUniformVectors: any;
        maxViewportDimensions: any;
        precision: {
            fragmentShaderHighPrecision: string;
            fragmentShaderLowPrecision: string;
            fragmentShaderMediumPrecision: string;
            vertexShaderHighPrecision: string;
            vertexShaderLowPrecision: string;
            vertexShaderMediumPrecision: string;
        };
        redBits: any;
        stencilBits: any;
        subPixelBits: any;
    };
    extensions: {
        maxAnisotropy: any;
        maxDrawBuffers: any;
        supportedExtensions: string[] | null;
        compressedTextureASTCExtension: WEBGL_compressed_texture_astc | null;
        compressedTextureATCExtension: any;
        compressedTextureETC1Extension: any;
        compressedTextureETCExtension: any;
        compressedTexturePVRTCExtension: any;
        compressedTextureS3TCExtension: WEBGL_compressed_texture_s3tc | null;
        compressedTextureS3TCSRGBExtension: WEBGL_compressed_texture_s3tc_srgb | null;
    };
};
/**
 * Collect and structure all major device and browser specific WebGL features
 */
export default _default;
