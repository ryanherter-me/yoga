const staticAssets = [
    './',
    './app.js',
    './manifest.json',
    './sw.js',
]

self.addEventListener('install', async event => {
    const cache = await caches.open('app-static');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
    console.log('done');
    const req = event.request;
    const url = new URL(req.url);
    event.respondWith(cacheFirst(req));
})

async function cacheFirst(req) {
    const cacheResponse = await caches.match(req);
    return cacheResponse || fetch(req);
}

async function networkFirst(req) {
    const cache = await caches.open('app-dynamic');
    try {
        const req = await fetch(req);
        cache.put(req, res.clone());
        return res
    } catch (error) {
        return await cache.match(req);
    }
}
