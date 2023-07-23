<template>
  <NavBar></NavBar>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view />
  </div>
</template>

<script>
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'
import axios from 'axios'
import NavBar from '../components/NavBar.vue'
export default {
  components: {
    NavBar,
    ToastMessages
  },
  provide() {
    return {
      emitter
    }
  },
  created() {
    // 取得 cookie方法
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hextoken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )

    axios.defaults.headers.common.Authorization = token

    const api = `${process.env.VUE_APP_API}api/user/check`

    axios.post(api, this.user).then((res) => {
      if (!res.data.success) {
        // alert('已登出')
        this.$router.push('/loginPage')
      }
      //   console.log(res)
    })
  }
}
</script>
