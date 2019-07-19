// Create vendor agnostic API (inspired by https://github.com/rafrex/fscreen)
const key = {
  pointerlockElement: 0,
  requestPointerLock: 1,
  // tslint:disable-next-line:object-literal-sort-keys
  exitPointerLock: 2,
  pointerlockchange: 3,
  pointerlockerror: 4,
};

const webkit = [
  'webkitPointerLockElement',
  'webkitRequestPointerLock',
  'webkitExitPointerLock',
  'webkitpointerlockchange',
  'webkitpointerlockerror',
];

const moz = [
  'mozPointerLockElement',
  'mozRequestPointerLock',
  'mozExitPointerLock',
  'mozpointerlockchange',
  'mozpointerlockerror',
];

const ms = [
  'msPointerLockElement',
  'msRequestPointerLock',
  'msExitPointerLock',
  'mspointerlockchange',
  'mspointerlockerror',
];

const prefix =
  ('pointerLockElement' in document && Object.keys(key)) ||
  (webkit[0] in document && webkit) ||
  (moz[0] in document && moz) ||
  (ms[0] in document && ms) ||
  [];

export const pointerLock = {
  requestPointerLock: (element: HTMLElement): void =>
    (element as any)[prefix[key.requestPointerLock]](),

  get exitPointerLock(): void {
    return (document as any)[prefix[key.exitPointerLock]].bind(document);
  },

  addEventListener: (type: string, handler: () => void, options?: any): void =>
    document.addEventListener(prefix[(key as any)[type]], handler, options),

  removeEventListener: (type: string, handler: () => void, options?: any): void =>
    document.removeEventListener(prefix[(key as any)[type]], handler, options),

  get pointerlockEnabled(): boolean {
    return Boolean(
      'pointerLockElement' in document ||
        webkit[0] in document ||
        moz[0] in document ||
        ms[0] in document
    );
  },

  // tslint:disable-next-line:no-empty
  set pointerlockEnabled(val) {},

  get pointerLockElement(): void {
    return (document as any)[prefix[(key as any).pointerLockElement]];
  },

  // tslint:disable-next-line:no-empty
  set pointerLockElement(val) {},

  get onpointerlockchange(): void {
    return (document as any)[`on${prefix[key.pointerlockchange]}`.toLowerCase()];
  },

  set onpointerlockchange(handler) {
    (document as any)[`on${prefix[key.pointerlockchange]}`.toLowerCase()] = handler;
  },

  get onpointerlockerror(): void {
    return (document as any)[`on${prefix[key.pointerlockerror]}`.toLowerCase()];
  },

  set onpointerlockerror(handler) {
    (document as any)[`on${prefix[key.pointerlockerror]}`.toLowerCase()] = handler;
  },
};
