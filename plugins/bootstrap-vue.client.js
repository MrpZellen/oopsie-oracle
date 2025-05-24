import { createBootstrap } from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.min.css'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(createBootstrap)
})