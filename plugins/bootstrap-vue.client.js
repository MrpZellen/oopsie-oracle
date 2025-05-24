import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import BootstrapVue3 from 'bootstrap-vue-3'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(BootstrapVue3)
})