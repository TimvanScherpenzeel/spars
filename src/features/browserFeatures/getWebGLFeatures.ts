// Vendor
import {
  GL_ALIASED_LINE_WIDTH_RANGE,
  GL_ALIASED_POINT_SIZE_RANGE,
  GL_ALPHA_BITS,
  GL_BLUE_BITS,
  GL_DEPTH_BITS,
  GL_FRAGMENT_SHADER,
  GL_GREEN_BITS,
  GL_HIGH_FLOAT,
  GL_LOW_FLOAT,
  GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS,
  GL_MAX_CUBE_MAP_TEXTURE_SIZE,
  GL_MAX_FRAGMENT_UNIFORM_VECTORS,
  GL_MAX_RENDERBUFFER_SIZE,
  GL_MAX_TEXTURE_IMAGE_UNITS,
  GL_MAX_TEXTURE_SIZE,
  GL_MAX_VARYING_VECTORS,
  GL_MAX_VERTEX_ATTRIBS,
  GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS,
  GL_MAX_VERTEX_UNIFORM_VECTORS,
  GL_MAX_VIEWPORT_DIMS,
  GL_MEDIUM_FLOAT,
  GL_RED_BITS,
  GL_RENDERER,
  GL_SHADING_LANGUAGE_VERSION,
  GL_STENCIL_BITS,
  GL_STENCIL_TEST,
  GL_SUBPIXEL_BITS,
  GL_VENDOR,
  GL_VERSION,
  GL_VERTEX_SHADER,
} from 'webgl-constants';

/**
 * Collect and structure all major device and browser specific WebGL features
 */
export default (() => {
  const attributes = {
    stencil: true,
  };

  const canvas = document.createElement('canvas');
  const gl =
    canvas.getContext('webgl', attributes) || canvas.getContext('experimental-webgl', attributes);

  if (!gl || !(gl instanceof WebGLRenderingContext)) {
    return false;
  }

  const glExtensionDebugRendererInfo = gl.getExtension('WEBGL_debug_renderer_info');

  // Enable features
  gl.enable(GL_STENCIL_TEST);

  // Enable extensions
  const glAnisotropicExtension =
    gl.getExtension('EXT_texture_filter_anisotropic') ||
    gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') ||
    gl.getExtension('MOZ_EXT_texture_filter_anisotropic');
  const glDrawBufferExtension = gl.getExtension('WEBGL_draw_buffers');

  const features = {
    // Base
    base: {
      renderer: gl.getParameter(GL_RENDERER),
      rendererUnmasked:
        glExtensionDebugRendererInfo &&
        gl.getParameter(glExtensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL),
      shaderVersion: gl.getParameter(GL_SHADING_LANGUAGE_VERSION),
      vendor: gl.getParameter(GL_VENDOR),
      vendorUnmasked:
        glExtensionDebugRendererInfo &&
        gl.getParameter(glExtensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL),
      version: gl.getParameter(GL_VERSION),
    },

    // General
    general: {
      aliasedLineWidthRange: gl.getParameter(GL_ALIASED_LINE_WIDTH_RANGE).toString(),
      aliasedPointSizeRange: gl.getParameter(GL_ALIASED_POINT_SIZE_RANGE).toString(),
      alphaBits: gl.getParameter(GL_ALPHA_BITS),
      // @ts-ignore
      antialias: !!gl.getContextAttributes().antialias,
      blueBits: gl.getParameter(GL_BLUE_BITS),
      depthBits: gl.getParameter(GL_DEPTH_BITS),
      greenBits: gl.getParameter(GL_GREEN_BITS),
      maxCombinedTextureImageUnits: gl.getParameter(GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS),
      maxCubeMapTextureSize: gl.getParameter(GL_MAX_CUBE_MAP_TEXTURE_SIZE),
      maxFragmentUniformVectors: gl.getParameter(GL_MAX_FRAGMENT_UNIFORM_VECTORS),
      maxRenderBufferSize: gl.getParameter(GL_MAX_RENDERBUFFER_SIZE),
      maxTextureImageUnits: gl.getParameter(GL_MAX_TEXTURE_IMAGE_UNITS),
      maxTextureSize: gl.getParameter(GL_MAX_TEXTURE_SIZE),
      maxVaryingVectors: gl.getParameter(GL_MAX_VARYING_VECTORS),
      maxVertexAttributes: gl.getParameter(GL_MAX_VERTEX_ATTRIBS),
      maxVertexTextureImageUnits: gl.getParameter(GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS),
      maxVertexUniformVectors: gl.getParameter(GL_MAX_VERTEX_UNIFORM_VECTORS),
      maxViewportDimensions: gl.getParameter(GL_MAX_VIEWPORT_DIMS).toString(),
      precision: {
        fragmentShaderHighPrecision: [
          // @ts-ignore
          gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_HIGH_FLOAT).rangeMin,
          // @ts-ignore
          gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_HIGH_FLOAT).rangeMax,
          // @ts-ignore
          gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_HIGH_FLOAT).precision,
        ].toString(),

        fragmentShaderLowPrecision: [
          // @ts-ignore
          gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_LOW_FLOAT).rangeMin,
          // @ts-ignore
          gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_LOW_FLOAT).rangeMax,
          // @ts-ignore
          gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_LOW_FLOAT).precision,
        ].toString(),

        fragmentShaderMediumPrecision: [
          // @ts-ignore
          gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_MEDIUM_FLOAT).rangeMin,
          // @ts-ignore
          gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_MEDIUM_FLOAT).rangeMax,
          // @ts-ignore
          gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_MEDIUM_FLOAT).precision,
        ].toString(),

        vertexShaderHighPrecision: [
          // @ts-ignore
          gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_HIGH_FLOAT).rangeMin,
          // @ts-ignore
          gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_HIGH_FLOAT).rangeMax,
          // @ts-ignore
          gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_HIGH_FLOAT).precision,
        ].toString(),

        vertexShaderLowPrecision: [
          // @ts-ignore
          gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_LOW_FLOAT).rangeMin,
          // @ts-ignore
          gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_LOW_FLOAT).rangeMax,
          // @ts-ignore
          gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_LOW_FLOAT).precision,
        ].toString(),

        vertexShaderMediumPrecision: [
          // @ts-ignore
          gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_MEDIUM_FLOAT).rangeMin,
          // @ts-ignore
          gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_MEDIUM_FLOAT).rangeMax,
          // @ts-ignore
          gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_MEDIUM_FLOAT).precision,
        ].toString(),
      },
      redBits: gl.getParameter(GL_RED_BITS),
      stencilBits: gl.getParameter(GL_STENCIL_BITS),
      subPixelBits: gl.getParameter(GL_SUBPIXEL_BITS),
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
      compressedTexturePVRTCExtension:
        gl.getExtension('WEBGL_compressed_texture_pvrtc') ||
        gl.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc') ||
        null,
      compressedTextureS3TCExtension: gl.getExtension('WEBGL_compressed_texture_s3tc') || null,
      compressedTextureS3TCSRGBExtension:
        gl.getExtension('WEBGL_compressed_texture_s3tc_srgb') || null,
    },
  };

  return features;
})();
