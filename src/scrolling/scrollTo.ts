// Features
import getBrowserType from '../features/browserFeatures/getBrowserType';

const easeInOutQuad = (
  time: number,
  beginValue: number,
  changeInValue: number,
  duration: number
): number => {
  time /= duration / 2;

  if (time < 1) {
    return (changeInValue / 2) * time * time + beginValue;
  }

  return (-changeInValue / 2) * (--time * (time - 2) - 1) + beginValue;
};

const preventInteraction = (event: Event): void => {
  if (event.cancelable) {
    event.preventDefault();
  }
};

const scrollElement = getBrowserType.isFirefox
  ? window.document.documentElement
  : window.document.scrollingElement
  ? window.document.scrollingElement
  : window.document.body;

/**
 * Smooth scroll to a specific Y-position
 *
 * @param destinationY Target Y-position
 * @param duration Time it should take to scroll to that position
 * @param stepSize Amount of steps it should take to scroll to that position
 */
export const scrollTo = ({
  destinationY = 0,
  duration = 1250,
}: {
  destinationY: number;
  duration: number;
}): Promise<void> =>
  new Promise((resolve): void => {
    const startY =
      window.pageYOffset !== undefined
        ? window.pageYOffset
        : document.documentElement.clientHeight !== undefined
        ? document.documentElement.scrollTop
        : document.body.scrollTop;

    let frameID = 0;
    let currentTime = 0;
    const stepSize = 16.6667;
    const distance = destinationY - startY;

    const scroll = (): void => {
      currentTime += stepSize;
      scrollElement.scrollTop = easeInOutQuad(currentTime, startY, distance, duration);

      if (currentTime < duration) {
        frameID = window.requestAnimationFrame(scroll);
      } else {
        window.cancelAnimationFrame(frameID);

        window.removeEventListener('wheel', preventInteraction);
        window.removeEventListener('touchmove', preventInteraction);
        window.removeEventListener('keydown', preventInteraction);

        resolve();
      }
    };

    window.addEventListener('wheel', preventInteraction, false);
    window.addEventListener('touchmove', preventInteraction, false);
    window.addEventListener('keydown', preventInteraction, false);

    scroll();
  });
