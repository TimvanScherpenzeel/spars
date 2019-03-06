// @ts-check

// Source
import { config, getConfigEntry, setConfigEntry } from '../../src/config';

describe('config', () => {
  it('has a default configuration', () => {
    expect.assertions(1);

    expect(config).toEqual({
      LOG_VERBOSITY: 0,
    });
  });

  it('can get the entry stored in the config by name', () => {
    expect.assertions(1);

    expect(getConfigEntry('LOG_VERBOSITY')).toEqual(0);
  });

  it('can set a update an entry stored in the config', () => {
    expect.assertions(1);

    expect(setConfigEntry('LOG_VERBOSITY', 3)).toEqual(3);
  });

  it('can get the updated entry stored in the config by name', () => {
    expect.assertions(1);

    expect(getConfigEntry('LOG_VERBOSITY')).toEqual(3);
  });

  it('can add a new custom entry to the config', () => {
    expect.assertions(1);

    expect(setConfigEntry('CUSTOM_ENTRY', true)).toEqual(true);
  });

  it('can get the custom entry stored in the config by name', () => {
    expect.assertions(1);

    expect(getConfigEntry('CUSTOM_ENTRY')).toEqual(true);
  });

  it('has an updated configuration', () => {
    expect.assertions(1);

    expect(config).toEqual({
      CUSTOM_ENTRY: true,
      LOG_VERBOSITY: 3,
    });
  });
});
