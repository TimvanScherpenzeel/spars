# Spar

🌲 A general toolkit for creating interactive web experiences.

## Statement

`Spar` is not a framework but a minimalistic toolkit that has a strong focus on creating progressivily enhanced interactive experiences on a wide range of consumer devices. The goal of the toolkit is to empower the developer to focus on the creative process and less on implementation details, repetitive work and browser specific workarounds. The components in the core of the library are things you will likely need when developing an interactive experience, handle edge-cases (like vendor prefixing, experimental feature support testing and fallbacks) or are things that should inspire the developer to make use of more advanced optimisations that one normally does not have the time to implement and test under short deadlines.

## Roadmap

- Add getUserMedia polyfill (https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia & https://medium.com/samsung-internet-dev/web-audio-on-different-platforms-67fc9ffc2c4e)
- Add tween library (animejs?)
- Add audio manager and audio filter chain
- Add shake sensor (acceleration)
- Add audio synthesizer / toolchain
- Add webcam and microphone support
- Add Generic Sensor API to geolocation sensor
- Comment sensors/RelativeOrientationSensor, threadPool, frameScheduler
- Add screen lock API polyfill
- Add accelerometer / device orientation / motion API

- Look into creating native bindings (doesn't make sense yet without native clients)
- Look more into the latest Hydra experience release of Active Theory
- Add GUI support
- Add common data structures
- Hot reloading shaders

## API

### Analytics

Contains code to help you set up Google Analytics tracking and reporting of individual events. The reporting of events are optionally throttled using `requestIdleCallback` which guarantees no interference with higher priority code.

### AssetLoader

Contains code for an `AssetLoader` used for preloading commonly used assets like images, GPU compressed images, bitmaps, video, audio, fonts, WebAssembly, JSON, SVG, etc..).

### Audio

Contains code to help you with audio autoplay unlocking in the browser.

### Cache

Contains code to set up persistent caching using IndexedDB and with an in-memory cache as fallback.

### Events

Contains code to handle network connection changes, device orietation changes, document visibility changes, keyboard key changes and window size changes. It also exposes an `EventEmitter` wrapper around [mitt](https://github.com/developit/mitt).

### Features

Contains code to check the support of various browser features, test for browser settings and check for certain hardware features.

### FrameScheduler

Contains a scheduler to schedule tasks over multiple frames to avoid dropping below 16 frames per second.

### FrameTicker

Global requestAnimationFrame ticker, fires `SPAR::ANIMATION_FRAME` event.

### Polyfills

Contains a fullscreen and pointerlock polyfill that can be used without having to worry about vendor prefixes.

### Sensors

Features an ambientLightSensor, geolocationSensor and relativeOrientationSensor (including a sensor fusion fallback based on Cardboard VR).

### ThreadPool

_Does not work on Internet Explorer 11_

A small module to run arbitrary tasks efficiently off of the main thread. The module is heavily based on the [Task Worklet polyfill](https://github.com/developit/task-worklet/) by [Jason Miller](https://github.com/developit).

`Sticky threads` allow you to use re-usable generic `worklets` (modularized web workers) retrieved from a centralized `sticky thread pool`. In order to maximize concurrency and minimize transfer overhead the library distributes work across multiple threads through an implicit data flow graph that is formed based on how the different tasks are linked.

Results from one task can be directly passed into another task but instead of pulling the result of the first task back to the main thread and sending it to the thread running the second task the second task will instead be routed to the thread that already has the first result ready.

```ts
(async () => {
  // Create a new thread pool (highly recommended to only create a single instance)
  // Pass a number with the maximum size of the pool which defaults to CPU cores with a maximum of 4 threads.
  const pool = new ThreadPool();

  // Add a new executable module to the thread pool
  await pool.add(
    // Executable module name
    'sum',
    // Method to execute (must be named process)
    /* ts */ `
    process(a, b) {
      return a + b;
    }
  `
  );

  // Execute a task
  const sum1Task = pool.run('sum', 1, 2);

  // Keep the result of sum1Task on the same thread as it is a dependency
  // which reduces unnecessary threadhops
  const sum2Task = pool.run('sum', sum1Task, 2);

  // Get the result of the executed task
  const sum2TaskResult = await sum2Task.get();

  console.log(sum2TaskResult); // -> 5
)();
```

### Utilities

Contains some commonly used utilities (assertions, query parameters, etc..).

## Browser support

`Spar` supports the latest two versions of `evergreen` browsers and `Internet Explorer 11`:

- Edge
- Firefox
- Chrome
- Chrome Android
- Safari
- iOS Safari

`Spar` does not include any polyfills. It is recommended to use the [polyfill.io](https://polyfill.io/v3/) service in your application.

## Development

```sh
$ yarn start

$ yarn lint

$ yarn test

$ yarn build
```

## Licence

My work is released under the [MIT license](https://raw.githubusercontent.com/TimvanScherpenzeel/alpine-toolkit/master/LICENSE).
