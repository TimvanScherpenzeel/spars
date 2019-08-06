// Utilities
import { getQueryParameters } from '../utilities/getQueryParameters';

const defaultSettings = {
  debug: process.env.NODE_ENV === 'development',
};

export const settings = ((): any => {
  const queryParameters: any = Object.assign(defaultSettings, getQueryParameters());

  const keywords = {
    false: false,
    null: null,
    true: true,
    undefined,
  };

  Object.keys(queryParameters).map(key => {
    let value: any = queryParameters[key];

    // Convert number strings to numbers (integers, floats, hexadecimals)
    if (/^\d+\.\d+$/.test(value) || /0x[0-9A-Fa-f]{6}/g.test(value)) {
      value = Number(value);
    }

    // Convert built-in types to their corresponding types
    if (value in keywords) {
      value = (keywords as any)[value];
    }

    queryParameters[key] = value;
  });

  return queryParameters;
})();
