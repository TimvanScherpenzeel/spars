/**
 * Tests for InputEvent support
 */
export default ((): boolean => {
  try {
    const inputEvent = new (window as any).InputEvent('input', {
      data: 'xyz',
      inputType: 'deleteContentForward',
    });

    let isSupported = false;

    const inputElement = document.createElement('input');
    inputElement.addEventListener('input', (event: any) => {
      if (event.inputType === 'deleteContentForward') {
        isSupported = true;
      }
    });

    inputElement.dispatchEvent(inputEvent);

    return isSupported;
  } catch (err) {
    return false;
  }
})();
