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
 */
// TODO: add proper type definition
export default (): any => {
  const attributes = {
    stencil: true,
  };

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2', attributes);

  if (!gl || !(gl instanceof WebGL2RenderingContext)) {
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
      // @ts-ignore gl.getContextAttributes could return null
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
          // @ts-ignore gl.getShaderPrecisionFormat could return null
          gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_HIGH_FLOAT).rangeMin,
          // @ts-ignore gl.getShaderPrecisionFormat could return null
          gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_HIGH_FLOAT).rangeMax,
          // @ts-ignore gl.getShaderPrecisionFormat could return null
          gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_HIGH_FLOAT).precision,
        ].toString(),

        fragmentShaderLowPrecision: [
          // @ts-ignore gl.getShaderPrecisionFormat could return null
          gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_LOW_FLOAT).rangeMin,
          // @ts-ignore gl.getShaderPrecisionFormat could return null
          gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_LOW_FLOAT).rangeMax,
          // @ts-ignore gl.getShaderPrecisionFormat could return null
          gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_LOW_FLOAT).precision,
        ].toString(),

        fragmentShaderMediumPrecision: [
          // @ts-ignore gl.getShaderPrecisionFormat could return null
          gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_MEDIUM_FLOAT).rangeMin,
          // @ts-ignore gl.getShaderPrecisionFormat could return null
          gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_MEDIUM_FLOAT).rangeMax,
          // @ts-ignore gl.getShaderPrecisionFormat could return null
          gl.getShaderPrecisionFormat(GL_FRAGMENT_SHADER, GL_MEDIUM_FLOAT).precision,
        ].toString(),

        vertexShaderHighPrecision: [
          // @ts-ignore gl.getShaderPrecisionFormat could return null
          gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_HIGH_FLOAT).rangeMin,
          // @ts-ignore gl.getShaderPrecisionFormat could return null
          gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_HIGH_FLOAT).rangeMax,
          // @ts-ignore gl.getShaderPrecisionFormat could return null
          gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_HIGH_FLOAT).precision,
        ].toString(),

        vertexShaderLowPrecision: [
          // @ts-ignore gl.getShaderPrecisionFormat could return null
          gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_LOW_FLOAT).rangeMin,
          // @ts-ignore gl.getShaderPrecisionFormat could return null
          gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_LOW_FLOAT).rangeMax,
          // @ts-ignore gl.getShaderPrecisionFormat could return null
          gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_LOW_FLOAT).precision,
        ].toString(),

        vertexShaderMediumPrecision: [
          // @ts-ignore gl.getShaderPrecisionFormat could return null
          gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_MEDIUM_FLOAT).rangeMin,
          // @ts-ignore gl.getShaderPrecisionFormat could return null
          gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_MEDIUM_FLOAT).rangeMax,
          // @ts-ignore gl.getShaderPrecisionFormat could return null
          gl.getShaderPrecisionFormat(GL_VERTEX_SHADER, GL_MEDIUM_FLOAT).precision,
        ].toString(),
      },
      redBits: gl.getParameter(GL_RED_BITS),
      stencilBits: gl.getParameter(GL_STENCIL_BITS),
      subPixelBits: gl.getParameter(GL_SUBPIXEL_BITS),
    },

    // Extensions
    extensions: {
      // prettier-ignore
      maxAnisotropy: glAnisotropicExtension

        ? gl.getParameter(glAnisotropicExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
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

    // WebGL2 specific
    specific: {
      max3DTextureSize: gl.getParameter(GL_MAX_3D_TEXTURE_SIZE),
      maxArrayTextureLayers: gl.getParameter(GL_MAX_ARRAY_TEXTURE_LAYERS),
      maxClientWaitTimeout: gl.getParameter(GL_MAX_CLIENT_WAIT_TIMEOUT_WEBGL),
      maxColorAttachments: gl.getParameter(GL_MAX_COLOR_ATTACHMENTS),
      maxCombinedFragmentUniformComponents: gl.getParameter(
        gl.MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS
      ),
      maxCombinedUniformBlocks: gl.getParameter(GL_MAX_COMBINED_UNIFORM_BLOCKS),
      maxCombinedVertexUniformComponents: gl.getParameter(
        gl.MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS
      ),
      maxDrawBuffers: gl.getParameter(GL_MAX_DRAW_BUFFERS),
      maxElementIndex: gl.getParameter(GL_MAX_ELEMENT_INDEX),
      maxElementsIndices: gl.getParameter(GL_MAX_ELEMENTS_INDICES),
      maxElementsVertices: gl.getParameter(GL_MAX_ELEMENTS_VERTICES),
      maxFragmentInputComponents: gl.getParameter(GL_MAX_FRAGMENT_INPUT_COMPONENTS),
      maxFragmentUniformBlocks: gl.getParameter(GL_MAX_FRAGMENT_UNIFORM_BLOCKS),
      maxFragmentUniformComponents: gl.getParameter(GL_MAX_FRAGMENT_UNIFORM_COMPONENTS),
      maxProgramTexelOffset: gl.getParameter(GL_MAX_PROGRAM_TEXEL_OFFSET),
      maxSamples: gl.getParameter(GL_MAX_SAMPLES),
      maxServerWaitTimeout: gl.getParameter(GL_MAX_SERVER_WAIT_TIMEOUT),
      maxTextureLODBias: gl.getParameter(GL_MAX_TEXTURE_LOD_BIAS),
      maxTransformFeedbackInterleavedComponents: gl.getParameter(
        gl.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS
      ),
      maxTransformFeedbackSeparateAttribs: gl.getParameter(
        gl.MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS
      ),
      maxTransformFeedbackSeparateComponents: gl.getParameter(
        gl.MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS
      ),
      maxUniformBlockSize: gl.getParameter(GL_MAX_UNIFORM_BLOCK_SIZE),
      maxUniformBufferBindings: gl.getParameter(GL_MAX_UNIFORM_BUFFER_BINDINGS),
      maxVaryingComponents: gl.getParameter(GL_MAX_VARYING_COMPONENTS),
      maxVertexOutputComponents: gl.getParameter(GL_MAX_VERTEX_OUTPUT_COMPONENTS),
      maxVertexUniformBlocks: gl.getParameter(GL_MAX_VERTEX_UNIFORM_BLOCKS),
      maxVertexUniformComponents: gl.getParameter(GL_MAX_VERTEX_UNIFORM_COMPONENTS),
      minProgramTexelOffset: gl.getParameter(GL_MIN_PROGRAM_TEXEL_OFFSET),
      uniformBufferOffsetAlignment: gl.getParameter(GL_UNIFORM_BUFFER_OFFSET_ALIGNMENT),
    },
  };

  return features;
};
