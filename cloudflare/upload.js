import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'

const DEBUG = true

addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    } else {
      // eslint-disable-next-line no-console
      console.error('[error]', e.stack)
    }
  }
})

async function handleEvent(event) {
  const request = event.request
  const url = new URL(request.url)

  if (request.method === 'GET') {
    try {
      const assetResponse = await getAssetFromKV(event)

      if (assetResponse) {
        return assetResponse
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('[error]', e.stack)
    }
  } else if (request.method === 'PUT') {
    try {
      const assetResponse = await mapRequestToAsset(event)

      if (assetResponse) {
        return assetResponse
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('[error]', e.stack)
    }
  }

  return new Response('not found', { status: 404 })
}