const CACHE_NAME = 'casamento-memorial-v1'
const ASSETS_TO_CACHE = [
  '/',
  '/manifest.json',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {
        // Falha silenciosa se algum asset não existir
      })
    })
  )
})

self.addEventListener('fetch', (event) => {
  // Apenas cache GET requests
  if (event.request.method !== 'GET') return

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response

      return fetch(event.request).then((response) => {
        // Não cache responses que não são OK
        if (!response || response.status !== 200 || response.type === 'error') {
          return response
        }

        // Clone a response antes de cachear
        const responseToCache = response.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache).catch(() => {})
        })

        return response
      }).catch(() => {
        // Offline fallback
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('/')
        }
      })
    })
  )
})
