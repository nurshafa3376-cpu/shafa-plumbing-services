const CACHE = "shafa-invoice-v2";
const SHELL = ["/invoice/manifest.webmanifest", "/invoice/icons/icon-192.png", "/invoice/icons/icon-512.png", "/assets/logo.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // Firebase/Google APIs always go to network
  // Pages (HTML): network first so app updates always arrive; cache is only a fallback offline.
  if (e.request.mode === "navigate" || url.pathname.endsWith(".html") || url.pathname.endsWith("/invoice/") || url.pathname.endsWith("/invoice")) {
    e.respondWith(fetch(e.request).catch(() => caches.match("/invoice/index.html")));
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
