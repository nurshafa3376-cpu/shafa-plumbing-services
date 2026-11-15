const CACHE = "shafa-invoice-v1";
const SHELL = ["/invoice/", "/invoice/index.html", "/invoice/manifest.webmanifest", "/invoice/icons/icon-192.png", "/invoice/icons/icon-512.png", "/assets/logo.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // Firebase/Google APIs always go to network
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
