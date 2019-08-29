/**
 * Set of constants used throughout the testing suite
 */
export enum TEST_CONSTANTS {
  Ax,
  Ay,
  Az,
  Aw,
  Bx,
  By,
  Bz,
  Bw,
}

export const SAMPLE_STRING = /* glsl */ `
precision lowp sampler3D;

in vec3 vUv;

uniform sampler3D uTexture;
uniform float uTime;

out vec4 fragColor;

void main() {
  float alpha = texture(uTexture, vUv + vec3(0.0, 0.0, uTime)).r * 0.03;
  fragColor = vec4(fract(vUv) * alpha, alpha);
}
`;
