// Features
import getGPUTier from '../features/hardwareFeatures/getGPUTier';

// Utilities
import { getQueryParameters } from '../utilities/getQueryParameters';

const defaultSettings = {
  GPUTier: Number(getGPUTier.tier.split('TIER_')[1]),
  debug: process.env.NODE_ENV === 'development',
  devicePixelRatio: window.devicePixelRatio,
};

export const settings = ((): {
  [setting: string]: boolean | undefined | null | number | string;
} => {
  const queryParameters: any = Object.assign(defaultSettings, getQueryParameters());

  const keywords = {
    false: false,
    null: null,
    true: true,
    undefined,
  };

  Object.keys(queryParameters).map(key => {
    let value = queryParameters[key];

    // Convert number strings to numbers (integers, floats, hexadecimals)
    if (/^\d+\.\d+$/.test(value) || /0[xX0-9A-Fa-f]{6}/g.test(value)) {
      value = Number(value);
    }

    // Convert built-in types to their corresponding types
    if (value in keywords) {
      value = (keywords as any)[value];
    }

    queryParameters[key] = value;
  });

  if (queryParameters.debug) {
    console.log(`⚙ Settings:`, queryParameters);
  }

  return queryParameters;
})();
