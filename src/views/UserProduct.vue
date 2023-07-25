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
          :disabled="status.loginItem === product.id"
        >
          加到購物車
          <div
            class="spinner-border text-primary spinner-grow-sm"
            role="status"
            v-if="status.loginItem === product.id"
          >
            <!-- <span class="visually-hidden">Loading...</span> -->
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { API_ADD_CART, API_PRODUCT_DETAIL } from '@/methods/apiUrl'
export default {
  data() {
    return {
      productId: '',
      product: {},
      isLoading: false,
      status: {
        loginItem: '' // 對應品項
      }
    }
  },
  methods: {
    getProduct() {
      this.isLoading = true
      axios.get(API_PRODUCT_DETAIL(this.productId)).then((res) => {
        this.isLoading = false

        this.product = res.data.product
      })
    },
    addToCart(id, qty = 1) {
      this.status.loginItem = id
      const cart = {
        product_id: id,
        qty: qty
      }

      axios.post(API_ADD_CART, { data: cart }).then((res) => {
        this.status.loginItem = ''
        console.log(res)
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
