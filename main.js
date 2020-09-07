// Service Worker Registeration
if(navigator.serviceWorker){
    window.addEventListener('load', _ => {
        navigator.serviceWorker
        .register('sw.js')
        .then(_ => console.log('Service worker: Registered'))
        .catch( err => console.log(`Service Worker Error: ${err}`))
    })
}

// Global Script