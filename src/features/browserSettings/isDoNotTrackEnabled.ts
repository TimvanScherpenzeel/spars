/**
 * Checks if the user has DoNotTrack enabled
 * This is useful for adhering to user wishes regarding analytics tracking
 *
 * @returns {boolean}
 */
export default (() => {
  const doNotTrack = navigator.doNotTrack || false;

  if (!!doNotTrack && doNotTrack !== 'unspecified') {
    return true;
  }

  return false;
})();
