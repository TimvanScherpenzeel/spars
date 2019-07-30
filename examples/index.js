// Vendor
import * as Spar from '../dist/spar.umd';

// Analytics
// ---------

// Spar.registerAnalytics('UA-71404844-4');
// Spar.recordAnalyticsEvent({
//   hitType: 'event',
//   eventCategory: 'string',
//   eventAction: 'play',
//   eventLabel: 'Fall Campaign',
// });

// Animation
// ---------

Spar.ticker.on();

const tickHandler = event => {
  console.log(event);
};

Spar.eventEmitter.on('SPAR::ANIMATION_FRAME', tickHandler);

// Spar.ticker.off();

// Audio
// -----

// let button;

// if (!document.getElementById('audio-unlock')) {
//   button = document.createElement('button');
//   button.id = 'audio-unlock';
//   button.width = '50px';
//   button.height = '50px';
//   button.innerHTML = 'unlock audio';
//   document.getElementById('root').appendChild(button);

//   if (Spar.isAutoplayAllowed()) {
//     console.log('allowed!');
//   } else {
//     console.log('not allowed, waiting for user interaction');

//     Spar.unlockAutoplay(button)
//       .then(unlocked => {
//         console.log('allowed!');
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }

// Cache
// -----

// Spar.persistentCache.set('key1', 'value1');
// Spar.persistentCache.set('key2', 'value2');
// Spar.persistentCache.get('key1').then(key => console.log(key));
// Spar.persistentCache.getKeys().then(keys => {
//   console.log(keys);
//   Spar.persistentCache.delete('key1');

//   Spar.persistentCache.getKeys().then(keys => {
//     console.log(keys);
//     Spar.persistentCache.clear();

//     Spar.persistentCache.getKeys().then(keys => {
//       console.log(keys);
//     });
//   });
// });

// Cookie
// ------

// Spar.setCookie('key1', 'value1');
// Spar.setCookie('key2', 'value2');
// console.log(document.cookie);

// const exampleKeyCookie = Spar.getCookie('key1');
// console.log(exampleKeyCookie);

// Spar.deleteCookie('key1');
// console.log(document.cookie);

// Spar.deleteCookie('key2');
// console.log(document.cookie);

// Events
// ------

// class Test extends Spar.EventEmitter {
//   constructor() {
//     super();

//     console.log(this);
//   }
// }

// new Test();

// Spar.onConnectionChange();

// const connectionChangeHandler = event => {
//   console.log(event);

//   Spar.eventEmitter.off('SPAR::CONNECTION_CHANGE', connectionChangeHandler);
//   Spar.offConnectionChange();
// };

// Spar.eventEmitter.on('SPAR::CONNECTION_CHANGE', connectionChangeHandler);

// Spar.onKeyChange();

// const keyChangeDownHandler = event => {
//   console.log(`keyDown: ${event.key}`);

//   document.getElementById('root').appendChild(document.createTextNode(event.key));

//   // Spar.eventEmitter.off('SPAR::KEY_DOWN_CHANGE', keyChangeDownHandler);
//   // Spar.offKeyChange();
// };

// const keyChangeUpHandler = event => {
//   console.log(`keyUp: ${event.key}`);

//   document.getElementById('root').appendChild(document.createTextNode(event.key));

//   // Spar.eventEmitter.off('SPAR::KEY_UP_CHANGE', keyChangeDownHandler);
//   // Spar.offKeyChange();
// };

// Spar.eventEmitter.on('SPAR::KEY_DOWN_CHANGE', keyChangeDownHandler);
// Spar.eventEmitter.on('SPAR::KEY_UP_CHANGE', keyChangeUpHandler);

// document.getElementById('root').appendChild(document.createElement('textarea'));

// Spar.onOrientationChange();

// const orientationChangeHandler = event => {
//   console.log(event);

//   Spar.eventEmitter.off('SPAR::ORIENTATION_CHANGE');
//   Spar.offOrientationChange();

//   document.getElementById('root').appendChild(document.createTextNode(event.angle));
// };

// Spar.eventEmitter.on('SPAR::ORIENTATION_CHANGE', orientationChangeHandler);

// Spar.onVisibilityChange();

// const visibilityChangeHandler = event => {
//   console.log(event);

//   Spar.eventEmitter.off('SPAR::VISIBILITY_CHANGE');
//   Spar.offVisibilityChange();
// };

// Spar.eventEmitter.on('SPAR::VISIBILITY_CHANGE', visibilityChangeHandler);

// Spar.onWindowSizeChange();

// const windowSizeChangeHandler = event => {
//   console.log(event);

//   Spar.eventEmitter.off('SPAR::WINDOW_SIZE_CHANGE');
//   Spar.offWindowSizeChange();
// };

// Spar.eventEmitter.on('SPAR::WINDOW_SIZE_CHANGE', windowSizeChangeHandler);

// Features
// --------

console.log(Spar.features);

// Loaders
// -------

// Spar.eventEmitter.on('SPAR::ASSET_LOADED', event => {
//   console.log(event);
// });

// const { isDesktop, isTablet, isMobile } = Spar.features.browserFeatures.browserType;

// Spar.assetLoader
//   .loadAssets([
//     isDesktop && {
//       loader: 'ImageBitmap',
//       loaderOptions: {
//         sx: 0,
//         sy: 0,
//         sw: 25,
//         sh: 25,
//       },
//       src: './assets/1.png',
//     },
//     isTablet && { src: './assets/2.png' },
//     isMobile && { src: './assets/3.png' },

//     { src: './assets/audio.mp3' },
//     { src: './assets/video.mp4' },
//     { src: './assets/text.txt' },
//     { src: './assets/MJeans1TEX_Lores.dds' },
//     { src: './assets/audio.ogg' },

//     { src: './assets/icon-twitter.svg' },
//     { src: './assets/xml.html' },
//     { src: './assets/xml.xml' },

//     // Does not require a src but can use it for automatic loader detection
//     // { id: 'Antonio', loader: 'Font' },
//     { id: 'Antonio', src: './assets/antonio-bold-webfont.woff2' },

//     {
//       src: './assets/simple.wasm',
//       loaderOptions: {
//         importObject: {
//           imports: {
//             imported_func: arg => console.log(arg),
//           },
//         },
//       },
//     },

//     {
//       id: './assets/1-device.png',
//       src: Spar.AssetLoader.byDeviceType({
//         DESKTOP: './assets/1-desktop.png',
//         TABLET: './assets/1-tablet.png',
//         MOBILE: './assets/1-mobile.png',
//       }),
//     },

//     {
//       id: './assets/example.ktx',
//       src: Spar.AssetLoader.bySupportedCompressedTexture({
//         ASTC: './assets/example-astc-4x4.ktx',
//         ETC: './assets/example-etc2.ktx',
//         PVRTC: './assets/example-pvrtc4BPP.ktx',
//         S3TC: './assets/example-dxt5.ktx',
//         FALLBACK: './assets/example.png',
//       }),
//     },

//     {
//       id: './assets/example-mipmaps.ktx',
//       src: Spar.AssetLoader.bySupportedCompressedTexture({
//         ASTC: './assets/example-astc-4x4-mipmaps.ktx',
//         ETC: './assets/example-etc2-mipmaps.ktx',
//         PVRTC: './assets/example-pvrtc4BPP-mipmaps.ktx',
//         S3TC: './assets/example-dxt5-mipmaps.ktx',
//         FALLBACK: './assets/example.png',
//       }),
//     },

//     (isMobile || isTablet) && {
//       src: './assets/green_point_park_4k_sh.bin',
//     },

//     isDesktop && {
//       id: './assets/green_point_park_4k_ibl.ktx',
//       src: Spar.AssetLoader.bySupportedCompressedTexture({
//         ASTC: './assets/green_point_park_4k_ibl_astc.ktx',
//         ETC: './assets/green_point_park_4k_ibl_etc.ktx',
//         S3TC: './assets/green_point_park_4k_ibl_s3tc.ktx',
//         FALLBACK: './assets/green_point_park_4k_ibl_none.ktx',
//       }),
//     },

//     isDesktop && {
//       id: './assets/green_point_park_4k_skybox.ktx',
//       src: Spar.AssetLoader.bySupportedCompressedTexture({
//         ASTC: './assets/green_point_park_4k_skybox_astc.ktx',
//         ETC: './assets/green_point_park_4k_skybox_etc.ktx',
//         S3TC: './assets/green_point_park_4k_skybox_s3tc.ktx',
//         FALLBACK: './assets/green_point_park_4k_skybox_none.ktx',
//       }),
//     },
//   ])
//   .then(assets => {
//     new App(assets);
//   });

// class App {
//   constructor(assets) {
//     console.log('app init!');

//     console.log(assets);

//     console.log(assets.get('./assets/green_point_park_4k_skybox.ktx'));
//     assets.get('./assets/simple.wasm').instance.exports.exported_func();
//   }
// }

// Polyfills
// ---------

// Fullscreen

// const element = document.getElementById('root');

// element.onclick = () => {
//   if (Spar.fullScreen.fullscreenSupported) {
//     if (Spar.fullScreen.fullscreenElement) {
//       Spar.fullScreen.exitFullscreen();
//     } else {
//       Spar.fullScreen.requestFullscreen(element);
//     }
//   }
// };

// console.log(Spar.fullScreen);

// Pointer lock

// const element = document.getElementById('root');

// let pointerLockEnabled = false;

// element.onclick = () => {
//   if (pointerLockEnabled) {
//     pointerLockEnabled = false;
//     Spar.pointerLock.exitPointerLock();
//   } else {
//     pointerLockEnabled = true;
//     Spar.pointerLock.requestPointerLock(element);
//   }
// };

// console.log(Spar.pointerLock);

// Scheduler
// ---------

// const result = [];

// Spar.scheduleFrame(
//   () => {
//     result.push('A');
//   },
//   { priority: Spar.priorities.LOW }
// );

// Spar.scheduleFrame(
//   () => {
//     result.push('C');
//   },
//   { priority: Spar.priorities.IMPORTANT }
// );

// Spar.scheduleFrame(
//   () => {
//     result.push('D');
//   },
//   { priority: 1000 }
// );

// Spar.scheduleFrame(() => {
//   result.push('B');
// });

// setTimeout(() => {
//   console.log(result); // -> ["D", "C", "B", "A"]
// }, 1000);

// Threads
// -------

// (async () => {
//   const pool = Spar.threadPool;

//   console.time('synchronous');
//   await pool.add(
//     'sum',
//     /* ts */ `
//     process(a, b) {
//         return a + b;
//     }
//   `
//   );

//   const sum1Task = pool.run('sum', 1, 2);
//   const sum2Task = pool.run('sum', sum1Task, 2);
//   const sum3Task = pool.run('sum', sum2Task, 5);
//   const sum4Task = pool.run('sum', 20, 5);

//   // @ts-ignore
//   const sumTask2Result = await sum2Task.get();

//   document.getElementById('synchronous').appendChild(document.createTextNode(sumTask2Result));

//   // @ts-ignore
//   const sumTask3Result = await sum3Task.get();

//   document.getElementById('synchronous').appendChild(document.createTextNode(sumTask3Result));

//   // @ts-ignore
//   const sumTask4Result = await sum4Task.get();

//   // console.log(sumTask3Result, sumTask4Result, sumTask5Result, sumTask6Result);

//   document.getElementById('synchronous').appendChild(document.createTextNode(sumTask4Result));
//   console.timeEnd('synchronous');

//   console.time('asynchronous');
//   await pool.add(
//     'fetch',
//     /* ts */ `
//     async process(url) {
//       return await new Promise((resolve, reject) => {
//         fetch(url).then((response) => response.json()).then((json) => resolve(json)).catch((err) => reject(new Error(err)));
//       });
//     }
//   `
//   );

//   const fetchTask = pool.run('fetch', 'https://jsonplaceholder.typicode.com/todos/1');

//   // @ts-ignore
//   const fetchTaskResult = await fetchTask.get();

//   document
//     .getElementById('asynchronous')
//     .appendChild(document.createTextNode(fetchTaskResult.title));

//   console.timeEnd('asynchronous');

//   console.time('wasm');
//   await pool.add(
//     'wasm',
//     /* ts */ `
//       async process(wasm) {
//         return await new Promise((resolve, reject) => {
//           fetch(wasm)
//             .then((response) => response.arrayBuffer())
//             .then((bytes) => WebAssembly.compile(bytes))
//             .then((module) => new WebAssembly.Instance(module))
//             .then(instance => {
//               const { sum, memory, malloc } = instance.exports;

//               const jsArray = [1, 2, 3, 4, 5, 6];

//               const cArrayPointer = malloc(jsArray.length * 4);

//               const cArray = new Uint32Array(memory.buffer, cArrayPointer, jsArray.length);

//               // Copy the values from JS to C.
//               cArray.set(jsArray);

//               // Run the function, passing the starting address and length.
//               resolve(sum(cArrayPointer, cArray.length));
//             })
//             .catch((err) => reject(new Error(err)));
//         });
//       }
//     `
//   );

//   const wasmTask = pool.run(
//     'wasm',
//     'data:application/octet-stream;base64,AGFzbQEAAAABEwRgAABgAX8Bf2ABfwBgAn9/AX8DBQQAAQIDBQQBAIEBBhsEfwBBkIiABAt/AEGECAt/AEGACAt/AEGACAsHbQkGbWVtb3J5AgARX193YXNtX2NhbGxfY3RvcnMAAAtfX2hlYXBfYmFzZQMACl9fZGF0YV9lbmQDAQxfX2Rzb19oYW5kbGUDAgZtYWxsb2MAAQRmcmVlAAIDc3VtAAMMYnVtcF9wb2ludGVyAwMKSwQDAAELFQBBgAggAEGACCgCACIAajYCACAACwMAAQsrAQF/IAFBAU4EQANAIAAoAgAgAmohAiAAQQRqIQAgAUF/aiIBDQALCyACCwsKAQBBgAgLAxAEgA=='
//   );

//   const wasmTaskResult = await wasmTask.get();

//   document.getElementById('webassembly').appendChild(document.createTextNode(wasmTaskResult));
//   console.timeEnd('wasm');

//   // pool.dispose();
// })();
