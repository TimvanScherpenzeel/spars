/**
 * Creates a single interface around the Crypto API (IE 11 requires a `ms` prefix)
 *
 * For current browser support please refer to: https://caniuse.com/#search=crypto
 */
/**
 * Get a 16 random byte values array either using the Crypto API or the Math.random() fallback
 */
export declare const getRandomValues: () => any[] | Uint8Array;
/**
 * Compute byte to hexadecimal array
 */
export declare const hex: string[];
/**
 * Create a 32 character RFC-compliant V4 unique identifier
 *
 * https://www.ietf.org/rfc/rfc4122.txt
 */
export declare const createUUID: () => string;
