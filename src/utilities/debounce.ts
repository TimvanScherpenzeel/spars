/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered.
 * The function will be called after it stops being called for n milliseconds
 *
 * @param func Function to execute
 * @param wait Amount of milliseconds to wait
 * @param immediate Trigger function on the leader edge instead of the trailing
 */
export const debounce = (func: any, wait: number, immediate: boolean = false) => {
  let timeout: any;

  return function executedFunction() {
    // @ts-ignore this implicitly has any type, (this as any) does not fix it
    const context = this;
    const args = arguments;

    const later = () => {
      timeout = null;

      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
};
