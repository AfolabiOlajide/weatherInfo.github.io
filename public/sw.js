// cacheName sww == service worker weather app
const cacheName = 'swwa'

// install service worker
self.addEventListener('install', e => {
    console.log('Service Worker: Installed')
})

// activate service worker
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated')
    e.waitUntil(
        caches.keys()
        .then( cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        caches.delete(cache);
                    }
                })
            )
        })
    )
})

// fetch cache and update service worker
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetched')
    e.respondWith(
        fetch(e.request)
        .then(res => {
            // make a clone of the response
            const resClone = res.clone();
            // open a cache
            caches.open(cacheName)
            .then(cache => {
                // add response to cache
                cache.put(e.request, resClone)
            });
            return res;
        }).catch(err => caches.match(e.request).then( res => res))
    )
})