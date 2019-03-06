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
  GL_MAX_3D_TEXTURE_SIZE,
  GL_MAX_ARRAY_TEXTURE_LAYERS,
  GL_MAX_CLIENT_WAIT_TIMEOUT_WEBGL,
  GL_MAX_COLOR_ATTACHMENTS,
  GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS,
  GL_MAX_COMBINED_UNIFORM_BLOCKS,
  GL_MAX_CUBE_MAP_TEXTURE_SIZE,
  GL_MAX_DRAW_BUFFERS,
  GL_MAX_ELEMENT_INDEX,
  GL_MAX_ELEMENTS_INDICES,
  GL_MAX_ELEMENTS_VERTICES,
  GL_MAX_FRAGMENT_INPUT_COMPONENTS,
  GL_MAX_FRAGMENT_UNIFORM_BLOCKS,
  GL_MAX_FRAGMENT_UNIFORM_COMPONENTS,
  GL_MAX_FRAGMENT_UNIFORM_VECTORS,
  GL_MAX_PROGRAM_TEXEL_OFFSET,
  GL_MAX_RENDERBUFFER_SIZE,
  GL_MAX_SAMPLES,
  GL_MAX_SERVER_WAIT_TIMEOUT,
  GL_MAX_TEXTURE_IMAGE_UNITS,
  GL_MAX_TEXTURE_LOD_BIAS,
  GL_MAX_TEXTURE_SIZE,
  GL_MAX_UNIFORM_BLOCK_SIZE,
  GL_MAX_UNIFORM_BUFFER_BINDINGS,
  GL_MAX_VARYING_COMPONENTS,
  GL_MAX_VARYING_VECTORS,
  GL_MAX_VERTEX_ATTRIBS,
  GL_MAX_VERTEX_OUTPUT_COMPONENTS,
  GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS,
  GL_MAX_VERTEX_UNIFORM_BLOCKS,
  GL_MAX_VERTEX_UNIFORM_COMPONENTS,
  GL_MAX_VERTEX_UNIFORM_VECTORS,
  GL_MAX_VIEWPORT_DIMS,
  GL_MEDIUM_FLOAT,
  GL_MIN_PROGRAM_TEXEL_OFFSET,
  GL_RED_BITS,
  GL_RENDERER,
  GL_SHADING_LANGUAGE_VERSION,
  GL_STENCIL_BITS,
  GL_STENCIL_TEST,
  GL_SUBPIXEL_BITS,
  GL_UNIFORM_BUFFER_OFFSET_ALIGNMENT,
  GL_VENDOR,
  GL_VERSION,
  GL_VERTEX_SHADER,
} from 'webgl-constants';

/**
 * Collect and structure all major device and browser specific WebGL2 features
 *
 * @returns {Object} Returns browser supported WebGL features
 */
export default () => {
  const attributes = {
    stencil: true,
  };

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2', attributes);

  // @ts-ignore
  if (!gl || !(gl instanceof WebGL2RenderingContext)) {
    return false;
  }

  // @ts-ignore
  const glExtensionDebugRendererInfo = gl.getExtension('WEBGL_debug_renderer_info');

  // Enable features
  // @ts-ignore
  gl.enable(GL_STENCIL_TEST);

  // Enable extensions
  // @ts-ignore
  const glAnisotropicExtension =
    // @ts-ignore
    gl.getExtension('EXT_texture_filter_anisotropic') ||
    // @ts-ignore
    gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') ||
    // @ts-ignore
    gl.getExtension('MOZ_EXT_texture_filter_anisotropic');

  const features = {
    // Base
    base: {
      // @ts-ignore
      // @ts-ignore
      renderer: gl.getParameter(GL_RENDERER),
      rendererUnmasked:
        glExtensionDebugRendererInfo &&
        // @ts-ignore
        gl.getParameter(glExtensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL),
      // @ts-ignore
      shaderVersion: gl.getParameter(GL_SHADING_LANGUAGE_VERSION),
      // @ts-ignore
      vendor: gl.getParameter(GL_VENDOR),
      vendorUnmasked:
        glExtensionDebugRendererInfo &&
        // @ts-ignore
        gl.getParameter(glExtensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL),
      // @ts-ignore
      version: gl.getParameter(GL_VERSION),
    },

    // General
    general: {
      // @ts-ignore
      aliasedLineWidthRange: gl.getParameter(GL_ALIASED_LINE_WIDTH_RANGE).toString(),
      // @ts-ignore
      aliasedPointSizeRange: gl.getParameter(GL_ALIASED_POINT_SIZE_RANGE).toString(),
      // @ts-ignore
      alphaBits: gl.getParameter(GL_ALPHA_BITS),
      // @ts-ignore
      antialias: !!gl.getContextAttributes().antialias,
      // @ts-ignore
      blueBits: gl.getParameter(GL_BLUE_BITS),
      // @ts-ignore
      depthBits: gl.getParameter(GL_DEPTH_BITS),
      // @ts-ignore
      greenBits: gl.getParameter(GL_GREEN_BITS),
      // @ts-ignore
      maxCombinedTextureImageUnits: gl.getParameter(GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS),
      // @ts-ignore
      maxCubeMapTextureSize: gl.getParameter(GL_MAX_CUBE_MAP_TEXTURE_SIZE),
      // @ts-ignore
      maxFragmentUniformVectors: gl.getParameter(GL_MAX_FRAGMENT_UNIFORM_VECTORS),
      // @ts-ignore
      maxRenderBufferSize: gl.getParameter(GL_MAX_RENDERBUFFER_SIZE),
      // @ts-ignore
      maxTextureImageUnits: gl.getParameter(GL_MAX_TEXTURE_IMAGE_UNITS),
      // @ts-ignore
      maxTextureSize: gl.getParameter(GL_MAX_TEXTURE_SIZE),
      // @ts-ignore
      maxVaryingVectors: gl.getParameter(GL_MAX_VARYING_VECTORS),
      // @ts-ignore
      maxVertexAttributes: gl.getParameter(GL_MAX_VERTEX_ATTRIBS),
      // @ts-ignore
      maxVertexTextureImageUnits: gl.getParameter(GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS),
      // @ts-ignore
      maxVertexUniformVectors: gl.getParameter(GL_MAX_VERTEX_UNIFORM_VECTORS),
      // @ts-ignore
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
      // @ts-ignore
      redBits: gl.getParameter(GL_RED_BITS),
      // @ts-ignore
      stencilBits: gl.getParameter(GL_STENCIL_BITS),
      // @ts-ignore
      subPixelBits: gl.getParameter(GL_SUBPIXEL_BITS),
    },

    // Extensions
    extensions: {
      // prettier-ignore
      maxAnisotropy: glAnisotropicExtension
      // @ts-ignore
        ? gl.getParameter(glAnisotropicExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
        : 0,
      // @ts-ignore
      supportedExtensions: gl.getSupportedExtensions(),

      // Compressed texture extensions
      // @ts-ignore
      compressedTextureASTCExtension: gl.getExtension('WEBGL_compressed_texture_astc') || null,
      // @ts-ignore
      compressedTextureATCExtension: gl.getExtension('WEBGL_compressed_texture_atc') || null,
      // @ts-ignore
      compressedTextureETC1Extension: gl.getExtension('WEBGL_compressed_texture_etc1') || null,
      // @ts-ignore
      compressedTextureETCExtension: gl.getExtension('WEBGL_compressed_texture_etc') || null,
      compressedTexturePVRTCExtension:
        // @ts-ignore
        gl.getExtension('WEBGL_compressed_texture_pvrtc') ||
        // @ts-ignore
        gl.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc') ||
        null,
      // @ts-ignore
      compressedTextureS3TCExtension: gl.getExtension('WEBGL_compressed_texture_s3tc') || null,
      compressedTextureS3TCSRGBExtension:
        // @ts-ignore
        gl.getExtension('WEBGL_compressed_texture_s3tc_srgb') || null,
    },

    // WebGL2 specific
    specific: {
      // @ts-ignore
      max3DTextureSize: gl.getParameter(GL_MAX_3D_TEXTURE_SIZE),
      // @ts-ignore
      maxArrayTextureLayers: gl.getParameter(GL_MAX_ARRAY_TEXTURE_LAYERS),
      // @ts-ignore
      maxClientWaitTimeout: gl.getParameter(GL_MAX_CLIENT_WAIT_TIMEOUT_WEBGL),
      // @ts-ignore
      maxColorAttachments: gl.getParameter(GL_MAX_COLOR_ATTACHMENTS),
      // @ts-ignore
      maxCombinedFragmentUniformComponents: gl.getParameter(
        // @ts-ignore
        gl.MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS
      ),
      // @ts-ignore
      maxCombinedUniformBlocks: gl.getParameter(GL_MAX_COMBINED_UNIFORM_BLOCKS),
      // @ts-ignore
      maxCombinedVertexUniformComponents: gl.getParameter(
        // @ts-ignore
        gl.MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS
      ),
      // @ts-ignore
      maxDrawBuffers: gl.getParameter(GL_MAX_DRAW_BUFFERS),
      // @ts-ignore
      maxElementIndex: gl.getParameter(GL_MAX_ELEMENT_INDEX),
      // @ts-ignore
      maxElementsIndices: gl.getParameter(GL_MAX_ELEMENTS_INDICES),
      // @ts-ignore
      maxElementsVertices: gl.getParameter(GL_MAX_ELEMENTS_VERTICES),
      // @ts-ignore
      maxFragmentInputComponents: gl.getParameter(GL_MAX_FRAGMENT_INPUT_COMPONENTS),
      // @ts-ignore
      maxFragmentUniformBlocks: gl.getParameter(GL_MAX_FRAGMENT_UNIFORM_BLOCKS),
      // @ts-ignore
      maxFragmentUniformComponents: gl.getParameter(GL_MAX_FRAGMENT_UNIFORM_COMPONENTS),
      // @ts-ignore
      maxProgramTexelOffset: gl.getParameter(GL_MAX_PROGRAM_TEXEL_OFFSET),
      // @ts-ignore
      maxSamples: gl.getParameter(GL_MAX_SAMPLES),
      // @ts-ignore
      maxServerWaitTimeout: gl.getParameter(GL_MAX_SERVER_WAIT_TIMEOUT),
      // @ts-ignore
      maxTextureLODBias: gl.getParameter(GL_MAX_TEXTURE_LOD_BIAS),
      // @ts-ignore
      maxTransformFeedbackInterleavedComponents: gl.getParameter(
        // @ts-ignore
        gl.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS
      ),
      // @ts-ignore
      maxTransformFeedbackSeparateAttribs: gl.getParameter(
        // @ts-ignore
        gl.MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS
      ),
      // @ts-ignore
      maxTransformFeedbackSeparateComponents: gl.getParameter(
        // @ts-ignore
        gl.MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS
      ),
      // @ts-ignore
      maxUniformBlockSize: gl.getParameter(GL_MAX_UNIFORM_BLOCK_SIZE),
      // @ts-ignore
      maxUniformBufferBindings: gl.getParameter(GL_MAX_UNIFORM_BUFFER_BINDINGS),
      // @ts-ignore
      maxVaryingComponents: gl.getParameter(GL_MAX_VARYING_COMPONENTS),
      // @ts-ignore
      maxVertexOutputComponents: gl.getParameter(GL_MAX_VERTEX_OUTPUT_COMPONENTS),
      // @ts-ignore
      maxVertexUniformBlocks: gl.getParameter(GL_MAX_VERTEX_UNIFORM_BLOCKS),
      // @ts-ignore
      maxVertexUniformComponents: gl.getParameter(GL_MAX_VERTEX_UNIFORM_COMPONENTS),
      // @ts-ignore
      minProgramTexelOffset: gl.getParameter(GL_MIN_PROGRAM_TEXEL_OFFSET),
      // @ts-ignore
      uniformBufferOffsetAlignment: gl.getParameter(GL_UNIFORM_BUFFER_OFFSET_ALIGNMENT),
    },
  };

  return features;
};
