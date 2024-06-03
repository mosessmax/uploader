import { useNuxtApp } from '#app'

export const useCloudflare = () => {
  const nuxtApp = useNuxtApp()
  // return useState('cloudflare', () => nuxtApp.$cloudflare)
  return nuxtApp.$cloudflare
}