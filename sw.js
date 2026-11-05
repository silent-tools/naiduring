/* Näiduring 1.2.0: rakenduse failid salvestatakse esimesel avamisel telefoni, siis avaneb see ka ilma levita. */
const V = "naiduring-1.2.0";
const APP = ["./", "index.html", "manifest.webmanifest", "naiduring-fonts.css", "icon-180.png", "icon-192.png", "icon-512.png", "xlsx.full.min.js", "qrcode.js", "jszip.min.js", "jsQR.js", "atkinson-hyperlegible-latin-400-normal.woff2", "atkinson-hyperlegible-latin-700-normal.woff2", "atkinson-hyperlegible-latin-ext-400-normal.woff2", "atkinson-hyperlegible-latin-ext-700-normal.woff2", "atkinson-hyperlegible-mono-latin-500-normal.woff2", "atkinson-hyperlegible-mono-latin-700-normal.woff2", "atkinson-hyperlegible-mono-latin-ext-500-normal.woff2", "atkinson-hyperlegible-mono-latin-ext-700-normal.woff2"];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => c.addAll(APP)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("naiduring-") && k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const r = e.request; if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith(caches.open(V).then(async c => {
    const hit = await c.match(r, {ignoreSearch: true});
    const net = fetch(r).then(res => { if (res.ok) c.put(r, res.clone()); return res; }).catch(() => hit || Response.error());
    return hit || net;
  }));
});
