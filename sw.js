/* Echoes of the Voice — service worker
 * Makes the soundboard work offline after the first load.
 *
 * Strategy:
 *   - On install, pre-cache the app shell (HTML/CSS/JS/icon/manifest).
 *   - At runtime, cache-first for same-origin GET requests, and store a copy
 *     of anything fetched successfully (including audio clips). So once a
 *     location's sounds have played online, they are available offline too.
 *
 * Bump CACHE_VERSION whenever the shell files change to refresh the cache.
 */
var CACHE_VERSION = 'eotv-v3';

var SHELL = [
  './',
  './index.html',
  './styles.css',
  './sounds.config.js',
  './app.js',
  './connections.config.js',
  './connections.js',
  './manifest.webmanifest',
  './icon.svg'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(function (cache) {
      // Cache shell files individually so one missing file can't break install.
      return Promise.all(SHELL.map(function (url) {
        return cache.add(url).catch(function () {});
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        if (key !== CACHE_VERSION) return caches.delete(key);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;

  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // let cross-origin (fonts) pass through

  event.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) return cached;
      return fetch(req).then(function (res) {
        // Cache successful, complete responses for next time (incl. audio).
        if (res && res.status === 200 && res.type === 'basic') {
          var copy = res.clone();
          caches.open(CACHE_VERSION).then(function (cache) { cache.put(req, copy); });
        }
        return res;
      }).catch(function () {
        // Offline fallback: serve the app shell for navigations.
        if (req.mode === 'navigate') return caches.match('./index.html');
        return new Response('', { status: 504, statusText: 'Offline' });
      });
    })
  );
});
