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

// AssetLoader
// -----------

// Spar.eventEmitter.on(Spar.EVENTS.ASSET_LOADED, event => {
//   console.log(event);
// });

// Spar.eventEmitter.on(Spar.EVENTS.ASSETS_LOADED, event => {
//   console.log(event);
// });

// const { isDesktop, isTablet, isMobile } = Spar.features.browserFeatures.browserType;

Spar.assetLoader
  .loadAssets([
    // isDesktop && {
    //   loader: 'ImageBitmap',
    //   loaderOptions: {
    //     sx: 0,
    //     sy: 0,
    //     sw: 25,
    //     sh: 25,
    //   },
    //   src: './assets/1.png',
    // },
    // isTablet && { src: './assets/2.png' },
    // isMobile && { src: './assets/3.png' },
    // { src: './assets/example.binpack' },
    // { src: './assets/example.audiopack' },
    // { src: './assets/audio.mp3', loader: 'ArrayBuffer', persistent: true },
    // { src: './assets/audio.mp3', loader: 'Blob', persistent: true },
    // { src: './assets/video.mp4' },
    // { src: './assets/text.txt' },
    // { src: './assets/MJeans1TEX_Lores.dds' },
    // { src: './assets/audio.ogg' },
    // { src: './assets/icon-twitter.svg' },
    // { src: './assets/xml.html' },
    // { src: './assets/xml.xml' },
    // // Does not require a src but can use it for automatic loader detection
    // // { id: 'Antonio', loader: 'Font' },
    // { id: 'Antonio', src: './assets/antonio-bold-webfont.woff2' },
    // {
    //   src: './assets/simple.wasm',
    //   loaderOptions: {
    //     importObject: {
    //       imports: {
    //         imported_func: arg => console.log(arg),
    //       },
    //     },
    //   },
    // },
    // {
    //   id: './assets/1-device.png',
    //   src: Spar.assetLoader.byDeviceType({
    //     DESKTOP: './assets/1-desktop.png',
    //     TABLET: './assets/1-tablet.png',
    //     MOBILE: './assets/1-mobile.png',
    //   }),
    // },
    // {
    //   id: './assets/example.ktx',
    //   src: Spar.assetLoader.bySupportedCompressedTexture({
    //     ASTC: './assets/example-astc-4x4.ktx',
    //     ETC: './assets/example-etc2.ktx',
    //     PVRTC: './assets/example-pvrtc4BPP.ktx',
    //     S3TC: './assets/example-dxt5.ktx',
    //     FALLBACK: './assets/example.png',
    //   }),
    // },
    // {
    //   id: './assets/example-mipmaps.ktx',
    //   src: Spar.assetLoader.bySupportedCompressedTexture({
    //     ASTC: './assets/example-astc-4x4-mipmaps.ktx',
    //     ETC: './assets/example-etc2-mipmaps.ktx',
    //     PVRTC: './assets/example-pvrtc4BPP-mipmaps.ktx',
    //     S3TC: './assets/example-dxt5-mipmaps.ktx',
    //     FALLBACK: './assets/example.png',
    //   }),
    // },
    // (isMobile || isTablet) && {
    //   src: './assets/green_point_park_4k_sh.bin',
    // },
    // isDesktop && {
    //   id: './assets/green_point_park_4k_ibl.ktx',
    //   src: Spar.assetLoader.bySupportedCompressedTexture({
    //     ASTC: './assets/green_point_park_4k_ibl_astc.ktx',
    //     ETC: './assets/green_point_park_4k_ibl_etc.ktx',
    //     S3TC: './assets/green_point_park_4k_ibl_s3tc.ktx',
    //     FALLBACK: './assets/green_point_park_4k_ibl_none.ktx',
    //   }),
    // },
    // isDesktop && {
    //   id: './assets/green_point_park_4k_skybox.ktx',
    //   src: Spar.assetLoader.bySupportedCompressedTexture({
    //     ASTC: './assets/green_point_park_4k_skybox_astc.ktx',
    //     ETC: './assets/green_point_park_4k_skybox_etc.ktx',
    //     S3TC: './assets/green_point_park_4k_skybox_s3tc.ktx',
    //     FALLBACK: './assets/green_point_park_4k_skybox_none.ktx',
    //   }),
    // },
  ])
  .then(assets => {
    new App(assets);
  });

class App {
  constructor(assets) {
    // const list = assets.get('./assets/example.binpack');
    // console.log(list['buttontray.png'], list);
    // const { audio, data } = assets.get('./assets/example.audiopack');
    // console.log(audio, data);
    // document.body.appendChild(audio);
    // audio.play();
    // console.log(assets.get('./assets/example.audiopack'));
    // console.log(assets);
    // console.log(assets.get('./assets/green_point_park_4k_skybox.ktx'));
    // assets.get('./assets/simple.wasm').instance.exports.exported_func();
  }
}

// Audio
// -----

// Spar.assetLoader.loadAssets([{ src: './assets/audio.mp3', loader: 'ArrayBuffer' }]).then(assets => {
//   console.log(assets);

//   Spar.audioManager.load('./assets/audio.mp3', assets.get('./assets/audio.mp3')).then(sound => {
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

//   if (Spar.isAutoplayAllowed()) {
//     console.log('allowed!');
//   } else {
//     console.log('not allowed, waiting for user interaction');

//     Spar.checkAutoplay(button)
//       .then(unlocked => {
//         console.log('allowed!');
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }

// Spar.assetLoader
//   .loadAssets([
//     {
//       src: './assets/audio.mp3',
//       loader: 'ArrayBuffer',
//     },
//   ])
//   .then(assets => {
//     console.log(assets);

//     Spar.checkAutoplay()
//       .then(() => {
//         Spar.audioManager
//           .load('./assets/audio.mp3', assets.get('./assets/audio.mp3'), {
//             loop: true,
//           })
//           .then(source => {
//             source.play();
//             // source.setVolume(0.1);

//             // Spar.audioManager.muteAll();

//             // setTimeout(() => {
//             //   Spar.audioManager.unmuteAll();
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

//             // Spar.audioManager.muteAll(1000);

//             // setTimeout(() => {
//             //   Spar.audioManager.unmuteAll(1000);
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

// Cookie
// ------

// Spar.setCookie('key1', true);
// Spar.setCookie('key2', 0.14);
// Spar.setCookie('key3', null);
// Spar.setCookie('key4', undefined);
// Spar.setCookie('key5', 's');
// console.log(document.cookie);

// console.log(Spar.getCookie('key1'));
// console.log(Spar.getCookie('key2'));
// console.log(Spar.getCookie('key3'));
// console.log(Spar.getCookie('key4'));
// console.log(Spar.getCookie('key5'));

// Spar.deleteCookie('key1');
// console.log(document.cookie);

// Spar.deleteCookie('key2');
// console.log(document.cookie);

// Spar.deleteCookie('key3');
// Spar.deleteCookie('key4');
// Spar.deleteCookie('key5');
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

// const connectionChangeHandler = event => {
//   console.log(event);

//   Spar.eventEmitter.off(Spar.EVENTS.CONNECTION_CHANGE, connectionChangeHandler);
// };

// Spar.eventEmitter.on(Spar.EVENTS.CONNECTION_CHANGE, connectionChangeHandler);

// const orientationChangeHandler = event => {
//   console.log(event);

//   Spar.eventEmitter.off(Spar.EVENTS.ORIENTATION_CHANGE);

//   document.getElementById('root').appendChild(document.createTextNode(event.angle));
// };

// Spar.eventEmitter.on(Spar.EVENTS.ORIENTATION_CHANGE, orientationChangeHandler);

// const visibilityChangeHandler = event => {
//   console.log(event);

//   Spar.eventEmitter.off(Spar.EVENTS.VISIBILITY_CHANGE);
// };

// Spar.eventEmitter.on(Spar.EVENTS.VISIBILITY_CHANGE, visibilityChangeHandler);

// const windowSizeChangeHandler = event => {
//   console.log(event);

//   Spar.eventEmitter.off(Spar.EVENTS.WINDOW_SIZE_CHANGE);
// };

// Spar.eventEmitter.on(Spar.EVENTS.WINDOW_SIZE_CHANGE, windowSizeChangeHandler);

// Features
// --------

console.log(Spar.features);

// FrameScheduler
// --------------

// const result = [];

// Spar.scheduleFrame(
//   () => {
//     result.push('A');
//   },
//   { priority: Spar.schedulePriorities.LOW }
// );

// Spar.scheduleFrame(
//   () => {
//     result.push('C');
//   },
//   { priority: Spar.schedulePriorities.IMPORTANT }
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

// FrameTicker
// ---------

// Spar.frameTicker.on();

// const tickHandler = event => {
//   console.log(event);
// };

// Spar.eventEmitter.on(Spar.EVENTS.FRAME_TICK, tickHandler);

// Spar.frameTicker.off();

// PersistentCache
// ---------------

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

// Scrolling
// ---------

// const scrollTopElement = document.getElementById('scroll-top');

// scrollTopElement.addEventListener('click', () => {
//   Spar.scrollTo({
//     destinationY: 0,
//     duration: 1250,
//   }).then(() => console.log('done'));
// });

// Spar.scrollToTopOnReload();

// Social
// -----

// Spar.shareFacebook('https://www.random.studio', 'a design studio', 300, 400);
// Spar.shareLinkedIn('https://www.random.studio', 'a design studio', 500, 1000)
// Spar.shareTwitter('https://www.random.studio', 'a design studio')

// ThreadPool
// ----------

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

// Utilities
// console.log(Spar.getUUID());
