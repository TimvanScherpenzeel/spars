/**
 * Get search parameters from URL
 *
 * ?isDebug=false&isGUI=true would result in { isDebug: false, isGUI: true }
 *
 * @param url query parameters
 */
export const getQueryParameters = (url = window.location.search) =>
  url
    // Remove ?
    .slice(1)
    // Split by &
    .split('&')
    // Find parameters
    .map(param => param.split('='))
    // Construct { key: value } pairs
    .reduce((values, [key, value]) => {
      (values as any)[key] = value;
      return values;
    }, {});
