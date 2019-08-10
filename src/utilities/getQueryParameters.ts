/**
 * Get search parameters from URL
 *
 * ?isDebug=false&isGUI=true&pi=3.141592653589793 would result in { isDebug: false, isGUI: true, pi: 3.141592653589793 }
 *
 * ?isBackground&isBlack would result in { isBackground: true, isBlack: true }
 *
 * ?mainColor=blue&subColor=0xFFFFFF would result in { mainColor: "blue", subColor: 16777215 }
 *
 * @param url query parameters
 */
export const getQueryParameters = (url = window.location.search): { [parameter: string]: string } =>
  url
    // Remove ?
    .slice(1)

    // Split by &
    .split('&')

    // Find parameters
    .map(param => param.split('='))

    // Remove any empty string entries
    .filter(param => param[0] !== '')

    // If any keys didn't have a value, automatically use Boolean true for value
    .map(param => (param.length === 1 ? [param.toString(), 'true'] : param))

    // Construct { key: value } pairs
    .reduce((values, [key, value]) => {
      (values as any)[key] = value;

      return values;
    }, {});
