<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/user/cart">購物車</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ product.title }}
        </li>
      </ol>
    </nav>
    <div class="row justify-content-center">
      <article class="col-8">
        <h2>{{ product.title }}</h2>
        <div>{{ product.content }}</div>
        <div>{{ product.description }}</div>
        <img :src="product.imageUrl" alt="" class="img-fluid mb-3" />
      </article>
      <div class="col-4">
        <div class="h5" v-if="!product.price">
          {{ product.origin_price }} 元
        </div>
        <del class="h6" v-if="product.price"
          >原價 {{ product.origin_price }} 元</del
        >
        <div class="h5" v-if="product.price">
          現在只要 {{ product.price }} 元
        </div>
        <hr />
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="addToCart(product.id)"
        >
          加到購物車
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      productId: '',
      product: {},
      isLoading: false
    }
  },
  methods: {
    getProduct() {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.productId}`
      axios.get(url).then((res) => {
        console.log(res)
        this.isLoading = false

        this.product = res.data.product
      })
    }
  },
  created() {
    // 利用 $route.params 取得動態 id
    this.productId = this.$route.params.id
    this.getProduct()
  }
}
</script>
