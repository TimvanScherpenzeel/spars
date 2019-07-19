// Vendor
import * as AlpineToolkit from '../dist/alpine-toolkit.umd';

// Analytics
// ---------

// AlpineToolkit.registerAnalytics('UA-71404844-4');
// AlpineToolkit.recordAnalyticsEvent({
//   hitType: 'event',
//   eventCategory: 'string',
//   eventAction: 'play',
//   eventLabel: 'Fall Campaign',
// });

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

//   if (AlpineToolkit.isAutoplayAllowed()) {
//     console.log('allowed!');
//   } else {
//     console.log('not allowed, waiting for user interaction');

//     AlpineToolkit.unlockAutoplay(button)
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

// const persistentCache = new AlpineToolkit.PersistentCache();

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

// AlpineToolkit.setCookie('key1', 'value1');
// AlpineToolkit.setCookie('key2', 'value2');
// console.log(document.cookie);

// const exampleKeyCookie = AlpineToolkit.getCookie('key1');
// console.log(exampleKeyCookie);

// AlpineToolkit.deleteCookie('key1');
// console.log(document.cookie);

// AlpineToolkit.deleteCookie('key2');
// console.log(document.cookie);

// Events
// ------

// class Test extends AlpineToolkit.EventEmitter {
//   constructor() {
//     super();

//     console.log(this);
//   }
// }

// new Test();

// AlpineToolkit.listenToConnectionChange();

// const connectionChangeHandler = event => {
//   console.log(event);

//   AlpineToolkit.eventEmitter.off('ALPINE::CONNECTION_CHANGE', connectionChangeHandler);
//   AlpineToolkit.stopListeningToConnectionChange();
// };

// AlpineToolkit.eventEmitter.on('ALPINE::CONNECTION_CHANGE', connectionChangeHandler);

// AlpineToolkit.listenToKeyChange();

// const keyChangeDownHandler = event => {
//   console.log(`keyDown: ${event.key}`);

//   document.getElementById('root').appendChild(document.createTextNode(event.key));

//   // AlpineToolkit.eventEmitter.off('ALPINE::KEY_DOWN_CHANGE', keyChangeDownHandler);
//   // AlpineToolkit.stopListeningToKeyChange();
// };

// const keyChangeUpHandler = event => {
//   console.log(`keyUp: ${event.key}`);

//   document.getElementById('root').appendChild(document.createTextNode(event.key));

//   // AlpineToolkit.eventEmitter.off('ALPINE::KEY_UP_CHANGE', keyChangeDownHandler);
//   // AlpineToolkit.stopListeningToKeyChange();
// };

// AlpineToolkit.eventEmitter.on('ALPINE::KEY_DOWN_CHANGE', keyChangeDownHandler);
// AlpineToolkit.eventEmitter.on('ALPINE::KEY_UP_CHANGE', keyChangeUpHandler);

// document.getElementById('root').appendChild(document.createElement('textarea'));

// AlpineToolkit.listenToOrientationChange();

// const orientationChangeHandler = event => {
//   console.log(event);

//   AlpineToolkit.eventEmitter.off('ALPINE::ORIENTATION_CHANGE');
//   AlpineToolkit.stopListeningToOrientationChange();
// };

// AlpineToolkit.eventEmitter.on('ALPINE::ORIENTATION_CHANGE', orientationChangeHandler);

AlpineToolkit.listenToPointerChange();

const pointerChangeHandler = event => {
  console.log(event);
};

AlpineToolkit.eventEmitter.on('ALPINE::POINTER_CHANGE', pointerChangeHandler);

// AlpineToolkit.listenToVisibilityChange();

// const visibilityChangeHandler = event => {
//   console.log(event);

//   AlpineToolkit.eventEmitter.off('ALPINE::VISIBILITY_CHANGE');
//   AlpineToolkit.stopListeningToVisibilityChange();
// };

// AlpineToolkit.eventEmitter.on('ALPINE::VISIBILITY_CHANGE', visibilityChangeHandler);

// AlpineToolkit.listenToWindowSizeChange();

// const windowSizeChangeHandler = event => {
//   console.log(event);

//   AlpineToolkit.eventEmitter.off('ALPINE::WINDOW_SIZE_CHANGE');
//   AlpineToolkit.stopListeningToWindowSizeChange();
// };

// AlpineToolkit.eventEmitter.on('ALPINE::WINDOW_SIZE_CHANGE', windowSizeChangeHandler);

// Features
// --------

console.log(AlpineToolkit.features);

// Loaders
// -------

// AlpineToolkit.eventEmitter.on('ALPINE::ASSET_LOADED', event => {
//   console.log(event);
// });

// const { isDesktop, isTablet, isMobile } = AlpineToolkit.features.browserFeatures.browserType;

// const assetLoader = new AlpineToolkit.AssetLoader();

// assetLoader
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
//       src: AlpineToolkit.AssetLoader.byDeviceType({
//         DESKTOP: './assets/1-desktop.png',
//         TABLET: './assets/1-tablet.png',
//         MOBILE: './assets/1-mobile.png',
//       }),
//     },

//     {
//       id: './assets/example.ktx',
//       src: AlpineToolkit.AssetLoader.bySupportedCompressedTexture({
//         ASTC: './assets/example-astc-4x4.ktx',
//         ETC: './assets/example-etc2.ktx',
//         PVRTC: './assets/example-pvrtc4BPP.ktx',
//         S3TC: './assets/example-dxt5.ktx',
//         FALLBACK: './assets/example.png',
//       }),
//     },

//     {
//       id: './assets/example-mipmaps.ktx',
//       src: AlpineToolkit.AssetLoader.bySupportedCompressedTexture({
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
//       src: AlpineToolkit.AssetLoader.bySupportedCompressedTexture({
//         ASTC: './assets/green_point_park_4k_ibl_astc.ktx',
//         ETC: './assets/green_point_park_4k_ibl_etc.ktx',
//         S3TC: './assets/green_point_park_4k_ibl_s3tc.ktx',
//         FALLBACK: './assets/green_point_park_4k_ibl_none.ktx',
//       }),
//     },

//     isDesktop && {
//       id: './assets/green_point_park_4k_skybox.ktx',
//       src: AlpineToolkit.AssetLoader.bySupportedCompressedTexture({
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
//   if (AlpineToolkit.fullScreen.fullscreenSupported) {
//     if (AlpineToolkit.fullScreen.fullscreenElement) {
//       AlpineToolkit.fullScreen.exitFullscreen();
//     } else {
//       AlpineToolkit.fullScreen.requestFullscreen(element);
//     }
//   }
// };

// console.log(AlpineToolkit.fullScreen);

// Pointer lock

// const element = document.getElementById('root');

// let pointerLockEnabled = false;

// element.onclick = () => {
//   if (pointerLockEnabled) {
//     pointerLockEnabled = false;
//     AlpineToolkit.pointerLock.exitPointerLock();
//   } else {
//     pointerLockEnabled = true;
//     AlpineToolkit.pointerLock.requestPointerLock(element);
//   }
// };

// console.log(AlpineToolkit.pointerLock);
