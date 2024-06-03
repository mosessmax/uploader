// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'nuxt-headlessui'],
  headlessui: {
    prefix: 'Headless',
},
headlessui: {
  /**
   * Directory that the component lives in.
   * @default "./components/ui"
   */
},
  devtools: { enabled: true },
  experimental: {
    renderJsonPayloads: false
  },
  runtimeConfig: {
    public: {
      CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
      CLOUDFLARE_BUCKET_NAME: process.env.CLOUDFLARE_BUCKET_NAME,
      CLOUDFLARE_ACCESS_KEY: process.env.CLOUDFLARE_ACCESS_KEY,
    },
  },
})