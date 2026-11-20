const CACHE_NAME = 'ticha-anglictina-v11';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './fonts/nunito-latin.woff2',
  './fonts/nunito-latin-ext.woff2',
  './fonts/plus-jakarta-sans-latin.woff2',
  './fonts/plus-jakarta-sans-latin-ext.woff2',
  './data.js',
  './extra_phrases_templates.js',
  './vocabulary_part_1.js',
  './vocabulary_part_2.js',
  './vocabulary_part_3.js',
  './vocabulary_part_4.js',
  './vocab-bank.js',
  './vocab-p1.js',
  './vocab-p2.js',
  './vocab-p3.js',
  './vocab-p4.js',
  './app.js',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Network-first: online vždy načte nejnovější verzi, offline použije cache
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request, { cache: 'no-cache' })
      .then((response) => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() =>
        caches.match(event.request, { ignoreSearch: true }).then((cached) => cached || caches.match('./index.html'))
      )
  );
});
