// Vendor
import * as Spars from '../dist/spars.umd';

// Analytics
// ---------

// Spars.registerAnalytics('UA-71404844-4');
// Spars.recordAnalyticsEvent({
//   hitType: 'event',
//   eventCategory: 'string',
//   eventAction: 'play',
//   eventLabel: 'Fall Campaign',
// });

// Audio
// -----

// Spars.assetLoader.loadAssets([{ src: './assets/audio.mp3', loader: 'ArrayBuffer' }]).then(assets => {
//   console.log(assets);

//   Spars.audioManager.load('./assets/audio.mp3', assets.get('./assets/audio.mp3')).then(sound => {
//     console.log(sound);

//     sound.start();

//     console.log(sound);

//     setTimeout(() => {
//       sound.stop();

//       console.log(sound);

//       setTimeout(() => {
//         sound.start();

//         console.log(sound);
//       }, 2500);
//     }, 2500);

//     // sound.start();

//     // console.log(sound);
//   });
// });

// let button;

// if (!document.getElementById('audio-unlock')) {
//   button = document.createElement('button');
//   button.id = 'audio-unlock';
//   button.width = '50px';
//   button.height = '50px';
//   button.innerHTML = 'unlock audio';
//   document.getElementById('root').appendChild(button);

//   if (Spars.isAutoplayAllowed()) {
//     console.log('allowed!');
//   } else {
//     console.log('not allowed, waiting for user interaction');

//     Spars.checkAutoplay(button)
//       .then(unlocked => {
//         console.log('allowed!');
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }

// Spars.assetLoader
//   .loadAssets([
//     {
//       src: './assets/audio.mp3',
//       loader: 'ArrayBuffer',
//     },
//   ])
//   .then(assets => {
//     console.log(assets);

//     Spars.checkAutoplay()
//       .then(() => {
//         Spars.audioManager
//           .load('./assets/audio.mp3', assets.get('./assets/audio.mp3'), {
//             loop: true,
//           })
//           .then(source => {
//             source.play();
//             // source.setVolume(0.1);

//             // Spars.audioManager.muteAll();

//             // setTimeout(() => {
//             //   Spars.audioManager.unmuteAll();
//             //   //   source.stop();

//             //   //   setTimeout(() => {
//             //   //     source.play();

//             //   //     setTimeout(() => {
//             //   //       source.stop();
//             //   //     }, 1000);
//             //   //   }, 1000);
//             // }, 5000);

//             // source.play();

//             // source.stop();

//             // source.play();

//             // Spars.audioManager.muteAll(1000);

//             // setTimeout(() => {
//             //   Spars.audioManager.unmuteAll(1000);
//             // }, 5000);

//             // setTimeout(() => {
//             //   source.pause();

//             //   console.log(source.pausedAt);

//             //   setTimeout(() => {
//             //     source.play();

//             //     console.log(source.startedAt);
//             //   }, 2000);
//             // }, 2000);
//           });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   });

// Caching
// -------

// const persistentCache = new Spars.PersistentCache();

// persistentCache.set('key1', 'value1');
// persistentCache.set('key2', 'value2');
// persistentCache.get('key1').then(key => console.log(key));
// persistentCache.getKeys().then(keys => {
//   console.log(keys);
//   persistentCache.delete('key1');

//   persistentCache.getKeys().then(keys => {
//     console.log(keys);
//     persistentCache.clear();

//     persistentCache.getKeys().then(keys => {
//       console.log(keys);
//     });
//   });
// });

// Cookie
// ------

// Spars.setCookie('key1', true);
// Spars.setCookie('key2', false);
// Spars.setCookie('key3', 0.14);
// Spars.setCookie('key4', null);
// Spars.setCookie('key5', undefined);
// Spars.setCookie('key6', 's');
// Spars.setCookie('key7', 6);
// console.log(document.cookie);

// console.log(typeof Spars.getCookie('key1'), Spars.getCookie('key1'));
// console.log(typeof Spars.getCookie('key2'), Spars.getCookie('key2'));
// console.log(typeof Spars.getCookie('key3'), Spars.getCookie('key3'));
// console.log(typeof Spars.getCookie('key4'), Spars.getCookie('key4'));
// console.log(typeof Spars.getCookie('key5'), Spars.getCookie('key5'));
// console.log(typeof Spars.getCookie('key6'), Spars.getCookie('key6'));
// console.log(typeof Spars.getCookie('key7'), Spars.getCookie('key7'));

// Spars.deleteCookie('key1');
// console.log(document.cookie);

// Spars.deleteCookie('key2');
// console.log(document.cookie);

// Spars.deleteCookie('key3');
// Spars.deleteCookie('key4');
// Spars.deleteCookie('key5');
// console.log(document.cookie);

// Events
// ------

// class Test extends Spars.EventEmitter {
//   constructor() {
//     super();

//     console.log(this);
//   }
// }

// new Test();

// const connectionChangeHandler = event => {
//   console.log(event);

//   Spars.eventEmitter.off(Spars.CONNECTION_CHANGE, connectionChangeHandler);
// };

// Spars.eventEmitter.on(Spars.CONNECTION_CHANGE, connectionChangeHandler);

// const orientationChangeHandler = event => {
//   console.log(event);

//   Spars.eventEmitter.off(Spars.ORIENTATION_CHANGE);

//   document.getElementById('root').appendChild(document.createTextNode(event.angle));
// };

// Spars.eventEmitter.on(Spars.ORIENTATION_CHANGE, orientationChangeHandler);

// const visibilityChangeHandler = event => {
//   console.log(event);

//   Spars.eventEmitter.off(Spars.VISIBILITY_CHANGE);
// };

// Spars.eventEmitter.on(Spars.VISIBILITY_CHANGE, visibilityChangeHandler);

// const windowSizeChangeHandler = event => {
//   console.log(event);

//   Spars.eventEmitter.off(Spars.WINDOW_SIZE_CHANGE);
// };

// Spars.eventEmitter.on(Spars.WINDOW_SIZE_CHANGE, windowSizeChangeHandler);

// Features
// --------

console.log(Spars.features);

// FrameScheduler
// --------------

// const result = [];

// Spars.scheduleFrame(
//   () => {
//     result.push('A');
//   },
//   { priority: Spars.schedulePriorities.LOW }
// );

// Spars.scheduleFrame(
//   () => {
//     result.push('C');
//   },
//   { priority: Spars.schedulePriorities.IMPORTANT }
// );

// Spars.scheduleFrame(
//   () => {
//     result.push('D');
//   },
//   { priority: 1000 }
// );

// Spars.scheduleFrame(() => {
//   result.push('B');
// });

// setTimeout(() => {
//   console.log(result); // -> ["D", "C", "B", "A"]
// }, 1000);

// FrameTicker
// ---------

// Spars.frameTicker.on();

// const tickHandler = event => {
//   console.log(event);
// };

// Spars.eventEmitter.on(Spars.FRAME_TICK, tickHandler);

// Spars.frameTicker.off();

// AssetLoader
// -----------

// Spars.eventEmitter.on(Spars.ASSET_LOADED, event => {
//   console.log(event);
// });

// Spars.eventEmitter.on(Spars.ASSETS_LOADED, event => {
//   console.log(event);
// });

// const { isDesktop, isTablet, isMobile } = Spars.features.browserFeatures.browserType;

// const persistentCache = new Spars.PersistentCache();
// const assetLoader = new Spars.AssetLoader({ persistentCache });

// assetLoader
//   .loadAssets([
//     // isDesktop && {
//     //   loader: 'ImageBitmap',
//     //   loaderOptions: {
//     //     sx: 0,
//     //     sy: 0,
//     //     sw: 25,
//     //     sh: 25,
//     //   },
//     //   src: './assets/1.png',
//     // },
//     // isTablet && { src: './assets/2.png' },
//     // isMobile && { src: './assets/3.png' },
//     // { src: './assets/example.binpack' },
//     // { src: './assets/example.audiopack' },
//     { src: './assets/audio.mp3', loader: 'ArrayBuffer', persistent: true },
//     // { src: './assets/audio.mp3', loader: 'Blob', persistent: true },
//     // { src: './assets/video.mp4' },
//     // { src: './assets/text.txt' },
//     // { src: './assets/MJeans1TEX_Lores.dds' },
//     // { src: './assets/audio.ogg' },
//     // { src: './assets/icon-twitter.svg' },
//     // { src: './assets/xml.html' },
//     // { src: './assets/xml.xml' },
//     // // Does not require a src but can use it for automatic loader detection
//     // // { id: 'Antonio', loader: 'Font' },
//     // { id: 'Antonio', src: './assets/antonio-bold-webfont.woff2' },
//     // {
//     //   src: './assets/simple.wasm',
//     //   loaderOptions: {
//     //     importObject: {
//     //       imports: {
//     //         imported_func: arg => console.log(arg),
//     //       },
//     //     },
//     //   },
//     // },
//     // {
//     //   id: './assets/1-device.png',
//     //   src: Spars.assetLoader.byDeviceType({
//     //     DESKTOP: './assets/1-desktop.png',
//     //     TABLET: './assets/1-tablet.png',
//     //     MOBILE: './assets/1-mobile.png',
//     //   }),
//     // },
//     // {
//     //   id: './assets/example.ktx',
//     //   src: Spars.assetLoader.bySupportedCompressedTexture({
//     //     ASTC: './assets/example-astc-4x4.ktx',
//     //     ETC: './assets/example-etc2.ktx',
//     //     PVRTC: './assets/example-pvrtc4BPP.ktx',
//     //     S3TC: './assets/example-dxt5.ktx',
//     //     FALLBACK: './assets/example.png',
//     //   }),
//     // },
//     // {
//     //   id: './assets/example-mipmaps.ktx',
//     //   src: Spars.assetLoader.bySupportedCompressedTexture({
//     //     ASTC: './assets/example-astc-4x4-mipmaps.ktx',
//     //     ETC: './assets/example-etc2-mipmaps.ktx',
//     //     PVRTC: './assets/example-pvrtc4BPP-mipmaps.ktx',
//     //     S3TC: './assets/example-dxt5-mipmaps.ktx',
//     //     FALLBACK: './assets/example.png',
//     //   }),
//     // },
//     // (isMobile || isTablet) && {
//     //   src: './assets/green_point_park_4k_sh.bin',
//     // },
//     // isDesktop && {
//     //   id: './assets/green_point_park_4k_ibl.ktx',
//     //   src: Spars.assetLoader.bySupportedCompressedTexture({
//     //     ASTC: './assets/green_point_park_4k_ibl_astc.ktx',
//     //     ETC: './assets/green_point_park_4k_ibl_etc.ktx',
//     //     S3TC: './assets/green_point_park_4k_ibl_s3tc.ktx',
//     //     FALLBACK: './assets/green_point_park_4k_ibl_none.ktx',
//     //   }),
//     // },
//     // isDesktop && {
//     //   id: './assets/green_point_park_4k_skybox.ktx',
//     //   src: Spars.assetLoader.bySupportedCompressedTexture({
//     //     ASTC: './assets/green_point_park_4k_skybox_astc.ktx',
//     //     ETC: './assets/green_point_park_4k_skybox_etc.ktx',
//     //     S3TC: './assets/green_point_park_4k_skybox_s3tc.ktx',
//     //     FALLBACK: './assets/green_point_park_4k_skybox_none.ktx',
//     //   }),
//     // },
//   ])
//   .then(assets => {
//     new App(assets);
//   });

// class App {
//   constructor(assets) {
//     // const list = assets.get('./assets/example.binpack');
//     // console.log(list['buttontray.png'], list);
//     // const { audio, data } = assets.get('./assets/example.audiopack');
//     // console.log(audio, data);
//     // document.body.appendChild(audio);
//     // audio.play();
//     // console.log(assets.get('./assets/example.audiopack'));
//     // console.log(assets);
//     // console.log(assets.get('./assets/green_point_park_4k_skybox.ktx'));
//     // assets.get('./assets/simple.wasm').instance.exports.exported_func();
//   }
// }

// Polyfills
// ---------

// Fullscreen

// const element = document.getElementById('root');

// element.onclick = () => {
//   if (Spars.fullScreen.fullscreenSupported) {
//     if (Spars.fullScreen.fullscreenElement) {
//       Spars.fullScreen.exitFullscreen();
//     } else {
//       Spars.fullScreen.requestFullscreen(element);
//     }
//   }
// };

// console.log(Spars.fullScreen);

// Pointer lock

// const element = document.getElementById('root');

// let pointerLockEnabled = false;

// element.onclick = () => {
//   if (pointerLockEnabled) {
//     pointerLockEnabled = false;
//     Spars.pointerLock.exitPointerLock();
//   } else {
//     pointerLockEnabled = true;
//     Spars.pointerLock.requestPointerLock(element);
//   }
// };

// console.log(Spars.pointerLock);

// Scrolling
// ---------

// const scrollTopElement = document.getElementById('scroll-top');

// scrollTopElement.addEventListener('click', () => {
//   Spars.scrollTo({
//     destinationY: 0,
//     duration: 1250,
//   }).then(() => console.log('done'));
// });

// Spars.scrollToTopOnReload();

// ThreadPool
// ----------

// (async () => {
//   const pool = Spars.threadPool;

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

// Utilities
// console.log(Spars.getUUID());
