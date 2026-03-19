const OFFLINE_CACHE_NAME = 'wemu-offline-v1';
const APP_INDEX_PATH = new URL('index.html', self.registration.scope).pathname;

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.open(OFFLINE_CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request, { ignoreSearch: true });
      if (cached) {
        return cached;
      }

      try {
        return await fetch(request);
      } catch (error) {
        if (request.mode === 'navigate') {
          const fallback = await cache.match(APP_INDEX_PATH, { ignoreSearch: true });
          if (fallback) {
            return fallback;
          }
        }

        throw error;
      }
    })
  );
});
