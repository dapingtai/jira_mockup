// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@nuxt/icon', '@vee-validate/nuxt'],

  css: [
    '@unocss/reset/tailwind.css'
  ],

  devtools: { enabled: true },

  app: {
    baseURL: process.env.NUXT_PUBLIC_SITE_URL
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      env: process.env.NUXT_PUBLIC_ENV,
      appTitle: process.env.NUXT_PUBLIC_APP_TITLE
    }
  },

  compatibilityDate: '2025-01-27'
})