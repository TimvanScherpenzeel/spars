/**
 * Scroll to the top of the page upon page reload
 */
export const scrollToTopOnReload = (): void => {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  } else {
    window.addEventListener('beforeunload', () => {
      window.scrollTo(0, 0);
    });
  }
};
