// Source
import { hashString } from '../../src/utilities/hashString';

const SAMPLE_STRING = /* glsl */ `
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

// Suite
describe('hashString', () => {
  it('hashes a string', () => {
    expect.assertions(13);

    expect(hashString('')).toBe(5381);
    expect(hashString('h')).toBe(177613);
    expect(hashString('he')).toBe(5861128);
    expect(hashString('hel')).toBe(193417316);
    expect(hashString('hell')).toBe(2087804040);
    expect(hashString('hello')).toBe(178056679);
    expect(hashString('hello ')).toBe(1580903143);
    expect(hashString('hello w')).toBe(630196144);
    expect(hashString('hello wo')).toBe(3616603615);
    expect(hashString('hello wor')).toBe(3383802317);
    expect(hashString('hello worl')).toBe(4291293953);
    expect(hashString('hello world')).toBe(4173747013);
    expect(
      hashString(
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.'
      )
    ).toBe(1122617945);
  });

  it('fails to hash a non-UTF8 string', () => {
    expect.assertions(2);

    expect(() => hashString('🦄🌈')).toThrow();
    expect(() => hashString('👌😎')).toThrow();
  });

  it('hashes the same string multiple times and returns the same positive numerical hash multiple times', () => {
    expect.assertions(6);

    expect(hashString(SAMPLE_STRING)).toBe(1476373835);
    expect(hashString(SAMPLE_STRING)).toBe(1476373835);
    expect(hashString(SAMPLE_STRING)).toBe(1476373835);
    expect(hashString(SAMPLE_STRING)).toBe(1476373835);
    expect(hashString(SAMPLE_STRING)).toBe(1476373835);
    expect(hashString(SAMPLE_STRING)).toBeGreaterThanOrEqual(0);
  });

  it('hashes differently on minute string changes', () => {
    expect.assertions(1);

    expect(hashString(SAMPLE_STRING + ' ')).toBe(1475696267);
  });
});
