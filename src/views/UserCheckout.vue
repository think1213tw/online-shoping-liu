<template>
  <Loading :active="isLoading"></Loading>
  <div class="my-5 row justify-content-center">
    <form class="col-md-6" @submit.prevent="payOrder">
      <table class="table align-middle">
        <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td>{{ item.product.title }}</td>
            <td>{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="text-end">{{ item.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-end">總計</td>
            <td class="text-end">{{ order.total }}</td>
          </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-end" v-if="order.is_paid === false">
        <button class="btn btn-danger">確認付款去</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { API_ORDER, API_PAY_ORDER } from '@/methods/frontApi'
export default {
  data() {
    return {
      order: {
        products: [],
        total: '',
        user: {
          email: '',
          name: '',
          tel: '',
          address: ''
        },
        is_paid: false
      },
      isLoading: false
    }
  },
  methods: {
    getOrder() {
      console.log(this.$route.params)

      axios.get(API_ORDER(this.$route.params.orderId)).then((res) => {
        console.log(res)
        this.order.user = res.data.order.user
        console.log(this.order.user)
        this.order.products = res.data.order.products
        this.order.total = res.data.order.total
        this.order.is_paid = res.data.order.is_paid
      })
    },
    payOrder() {
      axios.post(API_PAY_ORDER(this.$route.params.orderId))
      console.log(123)
      this.getOrder()
    }
  },
  created() {
    this.getOrder()
  }
}
</script>
