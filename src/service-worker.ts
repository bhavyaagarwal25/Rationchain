/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope

type SWFetchEvent = Event & {
  request: Request
  respondWith(response: Promise<Response>): void
}

const CACHE_NAME = 'smart-ration-cache-v1'

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(['/', '/index.html'])
    )
  )
})

self.addEventListener('fetch', (event: Event) => {
  const fetchEvent = event as SWFetchEvent

  if (fetchEvent.request.method !== 'GET') return

  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(
      (response) => response || fetch(fetchEvent.request)
    )
  )
})
