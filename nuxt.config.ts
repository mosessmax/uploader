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
  }
})