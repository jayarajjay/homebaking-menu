const CACHE_NAME = "bakery-menu-cache-v2";
const ASSETS = [
  "index.html",
  "admin.html",
  "styles.css",
  "site.js",
  "admin.js",
  "pin-lock.js",
  "storage.js",
  "menu-data.js",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first: always try to fetch the newest version. Only fall
// back to the offline cache if the network request fails (e.g. no
// signal). This means visitors always see the latest update as soon
// as they have a connection, and the cache exists purely so the site
// still opens when they're offline.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});
