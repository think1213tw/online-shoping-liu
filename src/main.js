import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
// Import component
import Loading from 'vue3-loading-overlay'
// Import stylesheet
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import { currency } from './methods/filters'

const app = createApp(App)
// 任何地方都能夠使用千分位方法
app.config.globalProperties.$filters = {
  currency
}
app.use(router, store, axios, VueAxios)
app.component('Loading', Loading)
app.mount('#app')
