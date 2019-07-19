// Types
import { TNullable } from '../../types';

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

    const handler = (event: any): void => {
      if (event.inputType === 'deleteContentForward') {
        isSupported = true;
      }
    };

    let inputElement: TNullable<HTMLInputElement> = document.createElement('input');
    inputElement.addEventListener('input', (event: any) => handler(event), false);
    inputElement.dispatchEvent(inputEvent);
    inputElement.removeEventListener('input', handler, false);
    inputElement.remove();
    inputElement = null;

    return isSupported;
  } catch (err) {
    return false;
  }
})();
