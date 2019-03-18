const CURRENT_ACTIVE_CACHE_NAME = 'V1';
const CURRENT_ACTIVE_CACHE_FILES = [];

// Current active cache name including previously cached versions you still want to keep alive
const ACTIVE_CACHE_NAMES = [CURRENT_ACTIVE_CACHE_NAME];

// Install and activate
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CURRENT_ACTIVE_CACHE_NAME)
      .then(cache => cache.addAll(ACTIVE_CACHE_FILES))
      .then(() => self.skipWaiting())
  );
});

// Clean up any old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => cacheNames.filter(cacheName => !ACTIVE_CACHES.includes(cacheName)))
      .then(cachesToDelete =>
        Promise.all(cachesToDelete.map(cacheToDelete => caches.delete(cacheToDelete)))
      )
      // Claim ownership (prevents page from having to reload to use the new service worker)
      .then(() => self.clients.claim())
  );
});

// Cache first and fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
