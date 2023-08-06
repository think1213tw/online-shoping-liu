<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="row mt-4">
      <div class="col-md-7">
        <table class="table align-middle">
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
                  <button
                    class="btn btn-outline-danger btn-sm"
                    @click="addCart(item.id)"
                    :disabled="status.loginItem === item.id"
                  >
                    加入購物車
                    <div
                      class="spinner-border text-primary spinner-grow-sm"
                      role="status"
                      v-if="status.loginItem === item.id"
                    ></div>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 購物車列表 -->
      <div class="col-md-5">
        <div class="sticky-top">
          <table class="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 110px">數量</th>
                <th>單價</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <template v-if="cart.carts">
                <tr v-for="item in cart.carts" :key="item.id">
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm ewqe"
                    >
                      <i class="bi bi-x"></i>
                    </button>
                  </td>
                  <td>
                    {{ item.product.title }}
                    <div class="text-success">已套用優惠券</div>
                  </td>
                  <td>
                    <div class="input-group input-group-sm">
                      <input
                        type="number"
                        class="form-control"
                        v-model.number="item.qty"
                        :disabled="item.id === status.loginItem"
                        @change="upDateCartList(item)"
                        min="1"
                      />
                      <div class="input-group-text">
                        / {{ item.product.unit }}
                      </div>
                    </div>
                  </td>
                  <td class="text-end">
                    {{ $filters.currency(item.product.price) }}
                  </td>
                  <td class="text-end">
                    <small class="text-success">折扣價：</small>
                    {{ $filters.currency(item.final_total) }}
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end">
                  {{ $filters.currency(cart.total) }}
                </td>
              </tr>
              <tr>
                <td colspan="3" class="text-end text-success">折扣價</td>
                <td class="text-end text-success">
                  {{ $filters.currency(cart.final_total) }}
                </td>
              </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input
              type="text"
              class="form-control"
              placeholder="請輸入優惠碼"
              v-model="couponCode"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="addCoupon"
              >
                套用優惠碼
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-5 row justify-content-center">
      <Form class="col-md-6" @submit="createOrder" v-slot="{ errors }">
        {{ errors }}
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field
            id="email"
            name="email"
            type="email"
            class="form-control"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="form.user.email"
            :class="{ 'is-invalid': errors['email'] }"
          ></Field>
          <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <Field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            placeholder="請輸入姓名"
            rules="required"
            :class="{ 'is-invalid': errors['姓名'] }"
            v-model="form.user.name"
          ></Field>
          <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <Field
            id="tel"
            name="電話"
            type="tel"
            class="form-control"
            placeholder="請輸入電話"
            rules="required"
            v-model="form.user.tel"
            :class="{ 'is-invalid': errors['電話'] }"
          ></Field>
          <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <Field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            placeholder="請輸入地址"
            rules="required"
            :class="{ 'is-invalid': errors['地址'] }"
            v-model="form.user.address"
          ></Field>
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea
            name=""
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-end">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {
  API_PRODUCT_LIST,
  API_CART_LIST,
  API_CART_UPDATE,
  API_ADD_COUPON,
  API_ADD_ORDER
} from '@/methods/frontApi'

export default {
  data() {
    return {
      products: [],
      status: {
        loginItem: '' // 對應品項
      },
      isLoading: false,
      cart: [],
      price: {},
      couponCode: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getProducts() {
      this.isLoading = true

      axios.get(API_PRODUCT_LIST).then((res) => {
        this.products = res.data.products

        this.isLoading = false
      })
    },
    addCart(id) {
      console.log(id)
      this.status.loginItem = id
      const cart = {
        product_id: id,
        qty: 1
      }
      axios.post(API_CART_LIST, { data: cart }).then((res) => {
        console.log(res)
        this.status.loginItem = ''
        this.getCartList()
      })
    },
    getCartList() {
      axios.get(API_CART_LIST).then((res) => {
        console.log('購物車列表', res)
        this.cart = res.data.data

        console.log(this.cart)
      })
    },
    upDateCartList(item) {
      console.log(item)
      this.isLoading = true

      this.status.loginItem = item.id

      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      axios
        .put(API_CART_UPDATE(item.product_id), { data: cart })
        .then((res) => {
          console.log(res)
          this.isLoading = false
          this.status.loginItem = ''
          this.getCartList()
        })
    },
    getProduct(id) {
      console.log(id)
      this.$router.push(`/user/product/${id}`)
    },
    addCoupon() {
      this.isLoading = true

      console.log(123)
      const coupon = {
        code: this.couponCode
      }
      axios.post(API_ADD_COUPON, { data: coupon }).then((res) => {
        console.log(res)
        this.isLoading = false

        this.getCartList()
      })
    },
    createOrder() {
      console.log(this.form)
      axios.post(API_ADD_ORDER, { data: this.form }).then((res) => {
        console.log(res)
        this.$router.push(`/user/checkout/${res.data.orderId}`)
      })
    }
  },
  created() {
    this.getProducts()
    this.getCartList()
  }
}
</script>
