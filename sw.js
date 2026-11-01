// Artha Service Worker - Offline Cache & Fast Performance
const CACHE_NAME = 'artha-cache-v7';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/style.css',
  './js/config.js',
  './js/portfolio.js',
  './js/supabase.js',
  './js/market.js',
  './js/ui.js',
  './js/app.js',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Try network first, then cache fallback
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
