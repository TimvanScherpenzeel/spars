# Alpine Toolkit

![](http://img.badgesize.io/TimvanScherpenzeel/alpine-toolkit/master/dist/alpine-toolkit.cjs.js.svg?compression=gzip&maxAge=60)
[![npm version](https://badge.fury.io/js/alpine-toolkit.svg)](https://badge.fury.io/js/alpine-toolkit)

A general toolkit for creating interactive web experiences.

## Statement

Alpine Toolkit is not a framework but a minimalistic toolkit that has a strong focus on creating progressivily enhanced interactive experiences on a wide range of consumer devices. The goal of the toolkit is to empower the developer to focus on the creative process and less on implementation details, repetitive work and browser specific workarounds. The components in the core of the library are things you will likely need when developing an interactive experience, handle edge-cases (like vendor prefixing, experimental feature support testing and fallbacks) or are things that should inspire the developer to make use of more advanced optimisations that one normally does not have the time to implement and test under short deadlines.

## API

### Generated

Contains automatically generated GPU benchmarking data. This is done by scraping the latest version of `https://www.notebookcheck.net/`.

### Analytics

Contains code to help you set up Google Analytics tracking and reporting of individual events. The reporting of events are optionally throttled using `requestIdleCallback` which guarantees no interference with higher priority code.

### Audio

Contains code to help you with audio autoplay unlocking.

### Cache

Contains code to set up persistent caching using IndexedDB and with an in-memory cache as fallback.

### Config

Contains code to enable and disable global configuration settings e.g. logging verbosity.

### Events

Contains code to handle network connection changes, device orietation changes, document visibility changes and window size changes. It also exposes an `EventEmitter` wrapper around [mitt](https://github.com/developit/mitt).

### Features

Contains code to check the support of various browser features, test for browser settings and check for certain hardware features.

### Loaders

Contains code for an `AssetLoader` class for preloading any commonly used image (including GPU compressed formats), bitmaps, video, audio, fonts, WebAssembly, JSON, SVG, etc..).

### Logger

Contains code to wrap logging statements which can be conditionally turned on or off by setting the earlier mentioned global configuration.

### Polyfills

Contains a fullscreen and pointerlock polyfill that can be used without having to worry about vendor prefixes.

### Threads

Contains code to dynamically create a worker for a specific function. Inspired by [greenlet](https://github.com/developit/greenlet).

### Utilities

Contains some commonly used utilities (assertions, UUID, query parameters, etc..).

## Browser support

Alpine Toolkit supports the latest two versions of `evergreen` browsers and `Internet Explorer 11`:

- Edge
- Firefox
- Chrome
- Chrome Android
- Safari
- iOS Safari

Alpine Toolkit does not include any polyfills. It is recommended to use the [polyfill.io](https://polyfill.io/v3/) service in your application.

## Installation

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
 $ npm install alpine-toolkit
```

## Development

```sh
$ yarn start

$ yarn lint

$ yarn test

$ yarn build
```

## Licence

My work is released under the [MIT license](https://raw.githubusercontent.com/TimvanScherpenzeel/alpine-toolkit/master/LICENSE).
