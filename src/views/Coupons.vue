<template>
  <div>
    <Loading :active="isLoading"></Loading>
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.code }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未起用</span>
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
    <DelModal ref="delModal" :item="tempCoupons" @del-item="delCoupon" />
    <CouponModal
      :coupons="tempCoupons"
      @updata-coupon="upDataCoupon"
      ref="couponModal"
    ></CouponModal>
  </div>
</template>

<script>
import {
  API_COUPON_LIST,
  API_ADD_COUPON,
  API_UPDATE_COUPON,
  API_DEL_COUPON
} from '@/methods/backApi'
import axios from 'axios'
import CouponModal from '@/components/CouponModal.vue'
import DelModal from '@/components/DelModal.vue'

export default {
  data() {
    return {
      coupons: {},
      tempCoupons: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isNew: false,
      isLoading: false
    }
  },
  components: {
    CouponModal,
    DelModal
  },
  methods: {
    openModal(isNew, item) {
      if (isNew) {
        this.tempCoupons = {
          due_date: new Date().getTime() / 1000
        }
      } else {
        this.tempCoupons = { ...item }
      }
      const couponComponnet = this.$refs.couponModal
      couponComponnet.showModal()
    },
    openDelModal(item) {
      this.tempCoupons = { ...item }
      this.$refs.delModal.showModal()
    },
    upDataCoupon(item) {
      console.log('更新按鈕', item)
      if (this.isNew) {
        // 新增
        axios.post(API_ADD_COUPON, { data: item }).then((res) => {
          console.log(res)
          this.getCouponList()
          const couponComponnet = this.$refs.couponModal
          couponComponnet.hideModal()
        })
      } else {
        // 修改
        axios.put(API_UPDATE_COUPON(item.id), { data: item }).then((res) => {
          console.log(res)
          this.getCouponList()
          const couponComponnet = this.$refs.couponModal
          couponComponnet.hideModal()
        })
      }
    },
    getCouponList() {
      this.isLoading = true
      axios.get(API_COUPON_LIST).then((res) => {
        console.log('取得優惠卷', res.data.coupons)
        this.coupons = res.data.coupons
        this.isLoading = false
      })
    },
    delCoupon() {
      this.isLoading = true
      axios.delete(API_DEL_COUPON(this.coupons.id)).then((res) => {
        console.log(res)
        this.isLoading = false
        this.$refs.delModal.hideModal()
        this.getCouponList()
      })
    }
  },
  created() {
    this.getCouponList()
  }
}
</script>
