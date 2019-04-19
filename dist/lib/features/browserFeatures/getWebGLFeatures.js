"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Vendor
var webgl_constants_1 = require("webgl-constants");
/**
 * Collect and structure all major device and browser specific WebGL features
 */
exports.default = (function () {
    var attributes = {
        stencil: true,
    };
    var canvas = document.createElement('canvas');
    var gl = canvas.getContext('webgl', attributes) || canvas.getContext('experimental-webgl', attributes);
    if (!gl || !(gl instanceof WebGLRenderingContext)) {
        return false;
    }
    var glExtensionDebugRendererInfo = gl.getExtension('WEBGL_debug_renderer_info');
    // Enable features
    gl.enable(webgl_constants_1.GL_STENCIL_TEST);
    // Enable extensions
    var glAnisotropicExtension = gl.getExtension('EXT_texture_filter_anisotropic') ||
        gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') ||
        gl.getExtension('MOZ_EXT_texture_filter_anisotropic');
    var glDrawBufferExtension = gl.getExtension('WEBGL_draw_buffers');
    var features = {
        // Base
        base: {
            renderer: gl.getParameter(webgl_constants_1.GL_RENDERER),
            rendererUnmasked: glExtensionDebugRendererInfo &&
                gl.getParameter(glExtensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL),
            shaderVersion: gl.getParameter(webgl_constants_1.GL_SHADING_LANGUAGE_VERSION),
            vendor: gl.getParameter(webgl_constants_1.GL_VENDOR),
            vendorUnmasked: glExtensionDebugRendererInfo &&
                gl.getParameter(glExtensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL),
            version: gl.getParameter(webgl_constants_1.GL_VERSION),
        },
        // General
        general: {
            aliasedLineWidthRange: gl.getParameter(webgl_constants_1.GL_ALIASED_LINE_WIDTH_RANGE).toString(),
            aliasedPointSizeRange: gl.getParameter(webgl_constants_1.GL_ALIASED_POINT_SIZE_RANGE).toString(),
            alphaBits: gl.getParameter(webgl_constants_1.GL_ALPHA_BITS),
            // @ts-ignore
            antialias: !!gl.getContextAttributes().antialias,
            blueBits: gl.getParameter(webgl_constants_1.GL_BLUE_BITS),
            depthBits: gl.getParameter(webgl_constants_1.GL_DEPTH_BITS),
            greenBits: gl.getParameter(webgl_constants_1.GL_GREEN_BITS),
            maxCombinedTextureImageUnits: gl.getParameter(webgl_constants_1.GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS),
            maxCubeMapTextureSize: gl.getParameter(webgl_constants_1.GL_MAX_CUBE_MAP_TEXTURE_SIZE),
            maxFragmentUniformVectors: gl.getParameter(webgl_constants_1.GL_MAX_FRAGMENT_UNIFORM_VECTORS),
            maxRenderBufferSize: gl.getParameter(webgl_constants_1.GL_MAX_RENDERBUFFER_SIZE),
            maxTextureImageUnits: gl.getParameter(webgl_constants_1.GL_MAX_TEXTURE_IMAGE_UNITS),
            maxTextureSize: gl.getParameter(webgl_constants_1.GL_MAX_TEXTURE_SIZE),
            maxVaryingVectors: gl.getParameter(webgl_constants_1.GL_MAX_VARYING_VECTORS),
            maxVertexAttributes: gl.getParameter(webgl_constants_1.GL_MAX_VERTEX_ATTRIBS),
            maxVertexTextureImageUnits: gl.getParameter(webgl_constants_1.GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS),
            maxVertexUniformVectors: gl.getParameter(webgl_constants_1.GL_MAX_VERTEX_UNIFORM_VECTORS),
            maxViewportDimensions: gl.getParameter(webgl_constants_1.GL_MAX_VIEWPORT_DIMS).toString(),
            precision: {
                fragmentShaderHighPrecision: [
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(webgl_constants_1.GL_FRAGMENT_SHADER, webgl_constants_1.GL_HIGH_FLOAT).rangeMin,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(webgl_constants_1.GL_FRAGMENT_SHADER, webgl_constants_1.GL_HIGH_FLOAT).rangeMax,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(webgl_constants_1.GL_FRAGMENT_SHADER, webgl_constants_1.GL_HIGH_FLOAT).precision,
                ].toString(),
                fragmentShaderLowPrecision: [
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(webgl_constants_1.GL_FRAGMENT_SHADER, webgl_constants_1.GL_LOW_FLOAT).rangeMin,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(webgl_constants_1.GL_FRAGMENT_SHADER, webgl_constants_1.GL_LOW_FLOAT).rangeMax,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(webgl_constants_1.GL_FRAGMENT_SHADER, webgl_constants_1.GL_LOW_FLOAT).precision,
                ].toString(),
                fragmentShaderMediumPrecision: [
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(webgl_constants_1.GL_FRAGMENT_SHADER, webgl_constants_1.GL_MEDIUM_FLOAT).rangeMin,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(webgl_constants_1.GL_FRAGMENT_SHADER, webgl_constants_1.GL_MEDIUM_FLOAT).rangeMax,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(webgl_constants_1.GL_FRAGMENT_SHADER, webgl_constants_1.GL_MEDIUM_FLOAT).precision,
                ].toString(),
                vertexShaderHighPrecision: [
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(webgl_constants_1.GL_VERTEX_SHADER, webgl_constants_1.GL_HIGH_FLOAT).rangeMin,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(webgl_constants_1.GL_VERTEX_SHADER, webgl_constants_1.GL_HIGH_FLOAT).rangeMax,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(webgl_constants_1.GL_VERTEX_SHADER, webgl_constants_1.GL_HIGH_FLOAT).precision,
                ].toString(),
                vertexShaderLowPrecision: [
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(webgl_constants_1.GL_VERTEX_SHADER, webgl_constants_1.GL_LOW_FLOAT).rangeMin,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(webgl_constants_1.GL_VERTEX_SHADER, webgl_constants_1.GL_LOW_FLOAT).rangeMax,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(webgl_constants_1.GL_VERTEX_SHADER, webgl_constants_1.GL_LOW_FLOAT).precision,
                ].toString(),
                vertexShaderMediumPrecision: [
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(webgl_constants_1.GL_VERTEX_SHADER, webgl_constants_1.GL_MEDIUM_FLOAT).rangeMin,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(webgl_constants_1.GL_VERTEX_SHADER, webgl_constants_1.GL_MEDIUM_FLOAT).rangeMax,
                    // @ts-ignore
                    gl.getShaderPrecisionFormat(webgl_constants_1.GL_VERTEX_SHADER, webgl_constants_1.GL_MEDIUM_FLOAT).precision,
                ].toString(),
            },
            redBits: gl.getParameter(webgl_constants_1.GL_RED_BITS),
            stencilBits: gl.getParameter(webgl_constants_1.GL_STENCIL_BITS),
            subPixelBits: gl.getParameter(webgl_constants_1.GL_SUBPIXEL_BITS),
        },
        // Extensions
        extensions: {
            maxAnisotropy: glAnisotropicExtension
                ? gl.getParameter(glAnisotropicExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
                : 0,
            maxDrawBuffers: glDrawBufferExtension
                ? gl.getParameter(glDrawBufferExtension.MAX_DRAW_BUFFERS_WEBGL)
                : 0,
            supportedExtensions: gl.getSupportedExtensions(),
            // Compressed texture extensions
            compressedTextureASTCExtension: gl.getExtension('WEBGL_compressed_texture_astc') || null,
            compressedTextureATCExtension: gl.getExtension('WEBGL_compressed_texture_atc') || null,
            compressedTextureETC1Extension: gl.getExtension('WEBGL_compressed_texture_etc1') || null,
            compressedTextureETCExtension: gl.getExtension('WEBGL_compressed_texture_etc') || null,
            compressedTexturePVRTCExtension: gl.getExtension('WEBGL_compressed_texture_pvrtc') ||
                gl.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc') ||
                null,
            compressedTextureS3TCExtension: gl.getExtension('WEBGL_compressed_texture_s3tc') || null,
            compressedTextureS3TCSRGBExtension: gl.getExtension('WEBGL_compressed_texture_s3tc_srgb') || null,
        },
    };
    return features;
})();
//# sourceMappingURL=getWebGLFeatures.js.map