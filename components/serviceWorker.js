// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/serviceWorker.js');
// }

const CACHE_NAME = 'V1';
const CACHE_FILES = [];

// Install and activate
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(CACHE_FILES))
      .then(() => self.skipWaiting())
  );
});

// Clean up any old caches and claim ownership (prevents from having to reload)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        )
      )
      .then(self.clients.claim())
  );
});

// Cache first and fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
