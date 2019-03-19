// Vendor
import * as Ridge from '../dist/ridge.umd';

// Override config
Ridge.setConfigEntry('LOG_VERBOSITY', 3);

// Analytics
// ---------

// Ridge.registerAnalytics('UA-71404844-4');
// Ridge.recordAnalyticsEvent({
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

//   if (Ridge.isAutoplayAllowed()) {
//     console.log('allowed!');
//   } else {
//     console.log('not allowed, waiting for user interaction');

//     Ridge.unlockAutoplay(button)
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

// const persistentCache = new Ridge.PersistentCache();

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

// Ridge.setCookie('key1', 'value1');
// Ridge.setCookie('key2', 'value2');
// console.log(document.cookie);

// const exampleKeyCookie = Ridge.getCookie('key1');
// console.log(exampleKeyCookie);

// Ridge.deleteCookie('key1');
// console.log(document.cookie);

// Ridge.deleteCookie('key2');
// console.log(document.cookie);

// Events
// ------

// class Test extends Ridge.EventEmitter {
//   constructor() {
//     super();

//     console.log(this);
//   }
// }

// new Test();

// Ridge.listenToConnectionChange();
// Ridge.listenToOrientationChange();
// Ridge.listenToVisibilityChange();
// Ridge.listenToWindowSizeChange();

// const connectionChangeHandler = event => {
//   console.log(event);

//   Ridge.eventEmitter.off('RIDGE::CONNECTION_CHANGE', connectionChangeHandler);
//   Ridge.stopListeningToConnectionChange();
// };

// Ridge.eventEmitter.on('RIDGE::CONNECTION_CHANGE', connectionChangeHandler);

// const orientationChangeHandler = event => {
//   console.log(event);

//   Ridge.eventEmitter.off('RIDGE::ORIENTATION_CHANGE');
//   Ridge.stopListeningToOrientationChange();
// };

// Ridge.eventEmitter.on('RIDGE::ORIENTATION_CHANGE', orientationChangeHandler);

// const visibilityChangeHandler = event => {
//   console.log(event);

//   Ridge.eventEmitter.off('RIDGE::VISIBILITY_CHANGE');
//   Ridge.stopListeningToVisibilityChange();
// };

// Ridge.eventEmitter.on('RIDGE::VISIBILITY_CHANGE', visibilityChangeHandler);

// const windowSizeChangeHandler = event => {
//   console.log(event);

//   Ridge.eventEmitter.off('RIDGE::WINDOW_SIZE_CHANGE');
//   Ridge.stopListeningToWindowSizeChange();
// };

// Ridge.eventEmitter.on('RIDGE::WINDOW_SIZE_CHANGE', windowSizeChangeHandler);

// Features
// --------

console.log(Ridge.features);

// Loaders
// -------

Ridge.eventEmitter.on('RIDGE::ASSET_LOADED', event => {
  console.log(event);
});

const { isDesktop, isTablet, isMobile } = Ridge.features.browserFeatures.browserType;

const assetLoader = new Ridge.AssetLoader();

// assetLoader
//   .loadAsset({
//     src: './assets/1.png',
//   })
//   .then(asset => {
//     document.body.appendChild(asset.item);
//   });

assetLoader
  .loadAssets([
    isDesktop && {
      loader: 'ImageBitmap',
      loaderOptions: {
        sx: 0,
        sy: 0,
        sw: 25,
        sh: 25,
      },
      src: './assets/1.png',
    },
    isTablet && { src: './assets/2.png' },
    isMobile && { src: './assets/3.png' },

    { src: './assets/audio.mp3' },
    { src: './assets/video.mp4' },
    { src: './assets/text.txt' },
    { src: './assets/MJeans1TEX_Lores.dds' },
    { src: './assets/audio.ogg' },

    // { src: './assets/icon-twitter.svg' },
    // { src: './assets/xml.html' },
    // { src: './assets/xml.xml' },
    // { id: 'Antonio', src: 'antonio-bold-webfont.woff2' },

    {
      src: './assets/simple.wasm',
      loaderOptions: {
        importObject: {
          imports: {
            imported_func: arg => console.log(arg),
          },
        },
      },
    },

    {
      id: 'assets',
      src: Ridge.AssetLoader.byDeviceType({
        DESKTOP: './assets/1-desktop.png',
        TABLET: './assets/1-tablet.png',
        MOBILE: './assets/1-mobile.png',
      }),
    },

    {
      id: 'example',
      src: Ridge.AssetLoader.bySupportedCompressedTexture({
        ASTC: './assets/example-astc-4x4.ktx',
        ETC: './assets/example-etc2.ktx',
        PVRTC: './assets/example-pvrtc4BPP.ktx',
        S3TC: './assets/example-dxt5.ktx',
        FALLBACK: './assets/example.png',
      }),
    },

    {
      id: 'example-mipmaps',
      src: Ridge.AssetLoader.bySupportedCompressedTexture({
        ASTC: './assets/example-astc-4x4-mipmaps.ktx',
        ETC: './assets/example-etc2-mipmaps.ktx',
        PVRTC: './assets/example-pvrtc4BPP-mipmaps.ktx',
        S3TC: './assets/example-dxt5-mipmaps.ktx',
        FALLBACK: './assets/example.png',
      }),
    },

    (isMobile || isTablet) && {
      id: 'green_point_park_4k_sh',
      src: './assets/green_point_park_4k_sh.bin',
    },

    isDesktop && {
      id: 'green_point_park_4k_ibl',
      src: Ridge.AssetLoader.bySupportedCompressedTexture({
        ASTC: './assets/green_point_park_4k_ibl_astc.ktx',
        ETC: './assets/green_point_park_4k_ibl_etc.ktx',
        S3TC: './assets/green_point_park_4k_ibl_s3tc.ktx',
        FALLBACK: './assets/green_point_park_4k_ibl_none.ktx',
      }),
    },

    isDesktop && {
      id: 'green_point_park_4k_skybox',
      src: Ridge.AssetLoader.bySupportedCompressedTexture({
        ASTC: './assets/green_point_park_4k_skybox_astc.ktx',
        ETC: './assets/green_point_park_4k_skybox_etc.ktx',
        S3TC: './assets/green_point_park_4k_skybox_s3tc.ktx',
        FALLBACK: './assets/green_point_park_4k_skybox_none.ktx',
      }),
    },
  ])
  .then(assets => {
    console.log(assets);

    // Call WebAssembly function
    if (assets[6].item) {
      assets[6].item.instance.exports.exported_func();
    }
  });

// Logger
// ------

// Ridge.log('example log');
// Ridge.warn('example warning');
// Ridge.error('example error');

// Threads
// -------

// let getName = new Ridge.Thread(username => {
//   return new Promise(resolve => {
//     let url = `https://api.github.com/users/${username}`;

//     fetch(url)
//       .then(response => response.json())
//       .then(profile => resolve(profile.name));
//   });
// });

// getName('timvanscherpenzeel').then(
//   log => {
//     document.write(log);
//   },
//   err => {
//     return console.error(err);
//   }
// );
