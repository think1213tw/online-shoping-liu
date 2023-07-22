<template>
  <NavBar></NavBar>
  <div class="container-fluid">
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from '../components/NavBar.vue'
export default {
  components: {
    NavBar
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
