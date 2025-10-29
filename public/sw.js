const CACHE_NAME = "img-cache-v1";

self.addEventListener("install", (e) => {
   e.waitUntil(caches.open(CACHE_NAME));
});

self.addEventListener("fetch", (e) => {
   const url = new URL(e.request.url);
   const isCdnImage =
      url.origin === "https://cdn.dummyjson.com" &&
      url.pathname.includes("/product-images/");
   if (!isCdnImage) return;

   e.respondWith(
      (async () => {
         const cache = await caches.open(CACHE_NAME);
         const cached = await cache.match(e.request);
         const network = fetch(e.request)
            .then((res) => {
               cache.put(e.request, res.clone());
               return res;
            })
            .catch(() => cached);
         return cached || network;
      })()
   );
});
