const key = {
  fullscreenEnabled: 0,
  // tslint:disable-next-line:object-literal-sort-keys
  fullscreenElement: 1,
  requestFullscreen: 2,
  exitFullscreen: 3,
  fullscreenchange: 4,
  fullscreenerror: 5,
};

const webkit = [
  'webkitFullscreenEnabled',
  'webkitFullscreenElement',
  'webkitRequestFullscreen',
  'webkitExitFullscreen',
  'webkitfullscreenchange',
  'webkitfullscreenerror',
];

const moz = [
  'mozFullScreenEnabled',
  'mozFullScreenElement',
  'mozRequestFullScreen',
  'mozCancelFullScreen',
  'mozfullscreenchange',
  'mozfullscreenerror',
];

const ms = [
  'msFullscreenEnabled',
  'msFullscreenElement',
  'msRequestFullscreen',
  'msExitFullscreen',
  'MSFullscreenChange',
  'MSFullscreenError',
];

const prefix =
  ('fullscreenEnabled' in document && Object.keys(key)) ||
  (webkit[0] in document && webkit) ||
  (moz[0] in document && moz) ||
  (ms[0] in document && ms) ||
  [];

export const fullScreen = {
  requestFullscreen: (element: HTMLElement) => (element as any)[prefix[key.requestFullscreen]](),

  get exitFullscreen() {
    return (document as any)[prefix[key.exitFullscreen]].bind(document);
  },

  addEventListener: (type: string, handler: () => void, options?: any) =>
    document.addEventListener(prefix[(key as any)[type]], handler, options),

  removeEventListener: (type: string, handler: () => void, options?: any) =>
    document.removeEventListener(prefix[(key as any)[type]], handler, options),

  get fullscreenSupported() {
    return Boolean((document as any)[prefix[key.fullscreenEnabled]]);
  },

  // tslint:disable-next-line:no-empty
  set fullscreenSupported(val) {},

  get fullscreenElement() {
    return (document as any)[prefix[key.fullscreenElement]];
  },

  // tslint:disable-next-line:no-empty
  set fullscreenElement(val) {},

  get onfullscreenchange() {
    return (document as any)[`on${prefix[key.fullscreenchange]}`.toLowerCase()];
  },

  set onfullscreenchange(handler) {
    (document as any)[`on${prefix[key.fullscreenchange]}`.toLowerCase()] = handler;
  },

  get onfullscreenerror() {
    return (document as any)[`on${prefix[key.fullscreenerror]}`.toLowerCase()];
  },

  set onfullscreenerror(handler) {
    (document as any)[`on${prefix[key.fullscreenerror]}`.toLowerCase()] = handler;
  },
};
