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
import 'bootstrap-icons/font/bootstrap-icons.css'
import { currency, date } from './methods/filters'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

// 定義驗證規則
defineRule('required', required)
defineRule('email', email)
defineRule('min', min)

// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系

  validateOnInput: true // 當輸入任何內容直接進行驗證
})

// 設定預設語系
setLocale('zh_TW')

const app = createApp(App)
// 任何地方都能夠使用千分位方法
app.config.globalProperties.$filters = {
  currency,
  date
}
app.use(router, store, axios, VueAxios)
app.component('Loading', Loading)
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
