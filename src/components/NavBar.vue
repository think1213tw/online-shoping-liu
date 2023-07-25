<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand">購物網作品</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <!-- <ul class="navbar-nav"> -->
        <!-- <li class="nav-item"> -->
        <!-- <a class="nav-link active" aria-current="page" href="#">產品</a> -->
        <!-- </li> -->
        <!-- <li class="nav-item"> -->
        <!-- <a class="nav-link active" aria-current="page" href="#">訂單</a> -->
        <!-- </li> -->
        <!-- <li class="nav-item"> -->
        <!-- <a class="nav-link" href="#">優惠卷</a> -->
        <!-- </li> -->
        <!-- <li class="nav-item"> -->
        <!-- <a class="nav-link" href="#" @click.prevent="logout">登出</a> -->
        <!-- </li> -->
        <!-- </ul> -->
        <div class="navbar-nav">
          <router-link to="/dashBoard/productList" class="nav-link"
            >產品</router-link
          >
          <router-link to="/dashBoard/order" class="nav-link">訂單</router-link>
          <router-link to="/dashBoard/coupons" class="nav-link"
            >優惠卷</router-link
          >
          <a class="nav-link" href="#" @click.prevent="logout">登出</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API}logout`
      axios.post(api).then((res) => {
        if (res.data.success) {
          console.log('登出訊息', res)
          this.$router.push('/loginPage')
        }
      })
    }
  }
}
</script>
