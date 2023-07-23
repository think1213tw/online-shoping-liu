<template>
  <Loading :active="isLoading"></Loading>
  <div class="text-end">
    <button class="btn btn-primary" @click="openModal(true)">新增品項</button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.content }}</td>
        <td class="text-right">{{ item.origin_price }}</td>
        <td class="text-right">{{ item.price }}</td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openModal(false, item)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="openDelModal(item)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
  <ProductModal
    ref="productModal"
    :product="tempProduct"
    @updata-product="upDataProducts"
  ></ProductModal>
  <DelModal
    ref="productDelModal"
    :item="tempProduct"
    @del-item="delProducts"
  ></DelModal>
</template>

<script>
import axios from 'axios'
import ProductModal from '../components/ProductModal.vue'
import DelModal from '../components/DelModal.vue'
import Pagination from '../components/Pagination.vue'

export default {
  data() {
    return {
      products: [],
      pagination: [],
      tempProduct: {}, // 主要給編輯資料用
      isNew: false,
      isLoading: false
    }
  },
  components: {
    ProductModal,
    DelModal,
    Pagination
  },
  inject: ['emitter'],
  methods: {
    openModal(isNew, item) {
      console.log(isNew, item)
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = { ...item }
        // this.tempProduct = item < 寫這樣的話，會直接改到item的值
      }
      this.isNew = isNew
      const productComponnet = this.$refs.productModal
      productComponnet.showModal()
    },
    openDelModal(item) {
      this.tempProduct = { ...item }
      const DelProductComponnet = this.$refs.productDelModal
      DelProductComponnet.showModal()
    },
    test(page) {
      console.log(page)
    },
    getProducts(page) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`
      axios.get(api).then((res) => {
        console.log(page)
        console.log(res.data.pagination)
        this.isLoading = false

        this.products = res.data.products
        this.pagination = res.data.pagination
      })
    },
    upDataProducts(item) {
      this.tempProduct = item
      console.log(this.tempProduct)
      const productComponnet = this.$refs.productModal
      //   新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethods = 'post'
      //   編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        httpMethods = 'put'
      }
      console.log(api, httpMethods)
      this.isLoading = true

      productComponnet.hideModal()
      axios[httpMethods](api, { data: this.tempProduct }).then((res) => {
        if (res.data.success) {
          console.log(res)
          this.getProducts()
          this.emitter.emit('push-message', {
            style: 'success',
            title: '更新成功'
          })
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '更新失敗',
            content: res.data.message.join('、')
          })
        }
        this.isLoading = false
      })
    },
    delProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      axios.delete(api).then((res) => {
        console.log(res)
        const DelProductComponnet = this.$refs.productDelModal
        DelProductComponnet.hideModal()
        this.getProducts()
      })
    }
  },
  created() {
    this.getProducts()
  }
}
</script>
