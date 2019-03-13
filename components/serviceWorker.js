// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/serviceWorker.js');
// }

const ACTIVE_CACHE_NAME = 'V1';
const ACTIVE_CACHE_FILES = [];
const ACTIVE_CACHES = [ACTIVE_CACHE_NAME];

// Install and activate
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(ACTIVE_CACHE_NAME)
      .then(cache => cache.addAll(ACTIVE_CACHE_FILES))
      .then(() => self.skipWaiting())
  );
});

// Clean up any old caches and claim ownership (prevents from having to reload)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => cacheNames.filter(cacheName => !ACTIVE_CACHES.includes(cacheName)))
      .then(cachesToDelete =>
        Promise.all(cachesToDelete.map(cacheToDelete => caches.delete(cacheToDelete)))
      )
      .then(() => self.clients.claim())
  );
});

// Cache first and fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
