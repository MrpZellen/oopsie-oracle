  // https://nuxt.com/docs/api/configuration/nuxt-config
  export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },

    css: [
      '~/assets/scss/main.scss'
    ],

    vite: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@import "@/assets/scss/_variables.scss";`
          }
        }
      }
    },
    modules: ['nuxt-auth-utils', "nuxt-server-utils"]
  })