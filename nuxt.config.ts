// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  modules: ['@pinia/nuxt', '@nuxt/content'],
  ssr: false,
  runtimeConfig: {
    // Override it with environment variables starting with NUXT, _ as separator
    // except public ones, these variables can only be read from the server
    IsServer: true, // to detect if in the server side or not, because the browser can not read it
    public: {
      // public constants can be universally accessed, in both browser and server
    },
  },
})
