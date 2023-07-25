<template>
  <Loading :active="isLoading"></Loading>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>圖片</th>
        <th>產品名稱</th>
        <th>價格</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td style="width: 200px">
          <img :src="item.imageUrl" class="img-fluid" alt="" />
        </td>
        <td class="text-decoration-underline">{{ item.category }}</td>
        <td class="text-right">
          <del>原價{{ item.origin_price }}</del>
          <div>現在只要 {{ item.price }}</div>
        </td>
        <td>
          <div class="btn-group">
            <button
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)"
            >
              查看更多
            </button>
            <button class="btn btn-outline-danger btn-sm">加入購物車</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      products: [],
      //   pagination: [],
      //   tempProduct: {}, // 主要給編輯資料用
      //   isNew: false,
      isLoading: false
    }
  },
  methods: {
    getProducts() {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products`

      axios.get(url).then((res) => {
        console.log('用戶端產品列表', res)
        this.products = res.data.products
        console.log('用戶端產品列表', this.products)
        // console.log(res.data.pagination)

        this.isLoading = false

        // this.products = res.data.products

        // this.pagination = res.data.pagination
      })
    },
    getProduct(id) {
      console.log(id)
      this.$router.push(`/user/product/${id}`)
    }
  },
  created() {
    this.getProducts()
  }
}
</script>
