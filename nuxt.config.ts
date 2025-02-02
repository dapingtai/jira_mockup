// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  ssr: false,

  nitro: {
    output: {
      publicDir: 'docs' // 讓 Nuxt 產出的靜態檔案存到 `docs/`
    }
  },

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

  compatibilityDate: '2025-01-27',

  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  }
})