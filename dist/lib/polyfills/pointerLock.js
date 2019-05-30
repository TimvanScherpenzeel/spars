"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Create vendor agnostic API (inspired by https://github.com/rafrex/fscreen)
var key = {
    pointerlockElement: 0,
    requestPointerLock: 1,
    // tslint:disable-next-line:object-literal-sort-keys
    exitPointerLock: 2,
    pointerlockchange: 3,
    pointerlockerror: 4,
};
var webkit = [
    'webkitPointerLockElement',
    'webkitRequestPointerLock',
    'webkitExitPointerLock',
    'webkitpointerlockchange',
    'webkitpointerlockerror',
];
var moz = [
    'mozPointerLockElement',
    'mozRequestPointerLock',
    'mozExitPointerLock',
    'mozpointerlockchange',
    'mozpointerlockerror',
];
var ms = [
    'msPointerLockElement',
    'msRequestPointerLock',
    'msExitPointerLock',
    'mspointerlockchange',
    'mspointerlockerror',
];
var prefix = ('pointerLockElement' in document && Object.keys(key)) ||
    (webkit[0] in document && webkit) ||
    (moz[0] in document && moz) ||
    (ms[0] in document && ms) ||
    [];
exports.pointerLock = {
    // @ts-ignore implicit any, has no index structure
    requestPointerLock: function (element) { return element[prefix[key.requestPointerLock]](); },
    get exitPointerLock() {
        // @ts-ignore implicit any, has no index structure
        return document[prefix[key.exitPointerLock]].bind(document);
    },
    addEventListener: function (type, handler, options) {
        // @ts-ignore implicit any, has no index structure
        return document.addEventListener(prefix[key[type]], handler, options);
    },
    removeEventListener: function (type, handler, options) {
        // @ts-ignore implicit any, has no index structure
        return document.removeEventListener(prefix[key[type]], handler, options);
    },
    get pointerlockEnabled() {
        // @ts-ignore implicit any, has no index structure
        return Boolean('pointerLockElement' in document ||
            webkit[0] in document ||
            moz[0] in document ||
            ms[0] in document);
    },
    // tslint:disable-next-line:no-empty
    set pointerlockEnabled(val) { },
    get pointerLockElement() {
        // @ts-ignore implicit any, has no index structure
        return document[prefix[key.pointerLockElement]];
    },
    // tslint:disable-next-line:no-empty
    set pointerLockElement(val) { },
    get onpointerlockchange() {
        // @ts-ignore implicit any, has no index structure
        return document[("on" + prefix[key.pointerlockchange]).toLowerCase()];
    },
    set onpointerlockchange(handler) {
        // @ts-ignore implicit any, has no index structure
        return (document[("on" + prefix[key.pointerlockchange]).toLowerCase()] = handler);
    },
    get onpointerlockerror() {
        // @ts-ignore implicit any, has no index structure
        return document[("on" + prefix[key.pointerlockerror]).toLowerCase()];
    },
    set onpointerlockerror(handler) {
        // @ts-ignore implicit any, has no index structure
        document[("on" + prefix[key.pointerlockerror]).toLowerCase()] = handler;
    },
};
//# sourceMappingURL=pointerLock.js.map