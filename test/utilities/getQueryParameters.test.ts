// Source
import { getQueryParameters } from '../../src/utilities/getQueryParameters';

// Suite
describe('getQueryParameters', () => {
  it('can create a valid { key: value } pair', () => {
    expect.assertions(1);

    const params = getQueryParameters('?key=value');
    expect(params).toEqual({ key: 'value' });
  });

  it('can handle empty { key: value } pairs', () => {
    expect.assertions(1);

    const params = getQueryParameters('');
    expect(params).toEqual({});
  });

  it('can create multiple { key: value } pairs, sorted alphabetically', () => {
    expect.assertions(1);

    const params = getQueryParameters('?foo=false&bar=true');
    expect(params).toEqual({ bar: 'true', foo: 'false' });
  });

  it('can handle duplicate query parameters', () => {
    expect.assertions(1);

    const params = getQueryParameters('?foo=false&foo=true');
    expect(params).toEqual({ foo: 'true' });
  });

  it('can handle unexpected characters', () => {
    expect.assertions(1);

    const params = getQueryParameters('?\f%!>|0=#2?*@&foo=bar');
    expect(params).toEqual({ '\f%!>|0': '#2?*@', foo: 'bar' });
  });
});
