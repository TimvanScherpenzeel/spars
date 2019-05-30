/**
 * Tests for inline web worker support
 */
export default (() => {
  try {
    // @ts-ignore missing type definition
    const URL = window.URL || window.webkitURL;

    // @ts-ignore missing type definition
    if (URL === undefined || window.Blob === undefined || window.Worker === undefined) {
      return false;
    }

    const blob = new Blob(['']);
    const oURL = URL.createObjectURL(blob);
    const worker = new Worker(oURL);

    URL.revokeObjectURL(oURL);

    if (worker) {
      worker.terminate();
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
})();
