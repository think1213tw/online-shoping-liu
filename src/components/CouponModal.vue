<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-white text-dark">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增優惠卷</span>
          </h5>
          <button
            type="button"
            class="btn-close btn-primary"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">標題</label>
            <input
              type="text"
              class="form-control"
              id="title"
              placeholder="請輸入標題"
              v-model="tempCoupons.title"
            />
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <input
              type="text"
              class="form-control"
              id="coupon_code"
              placeholder="請輸入優惠碼"
              v-model="tempCoupons.code"
            />
          </div>
          <div class="mb-3">
            <label for="due_date">到期日</label>
            <input
              type="date"
              class="form-control"
              id="due_date"
              v-model="due_date"
            />
          </div>
          <div class="mb-3">
            <label for="price">折扣百分比</label>
            <input
              type="number"
              class="form-control"
              id="price"
              placeholder="請輸入折扣百分比"
              min="1"
              v-model.number="tempCoupons.percent"
            />
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                :true-value="1"
                :false-value="0"
                id="is_enabled"
                v-model.number="tempCoupons.is_enabled"
              />
              <label class="form-check-label" for="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('updata-coupon', tempCoupons)"
          >
            更新優惠券
          </button>
          <button type="button" class="btn btn-primary" @click="test()">
            測試
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: {
    coupons: {}
  },
  data() {
    return {
      tempCoupons: {},
      due_date: ''
    }
  },
  // //   單向數據流，我們不能直接修改外層資料，所以要把外層資料再賦予內層的資料
  watch: {
    coupons() {
      this.tempCoupons = this.coupons
      // 將時間格式改為 YYYY-MM-DD
      const dateAndTime = new Date(this.tempCoupons.due_date * 1000)
        .toISOString()
        .split('T')
      this.due_date = dateAndTime[0]
    },
    due_date() {
      this.tempCoupons.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  },
  methods: {
    showModal() {
      this.modal.show()
    },
    hideModal() {
      this.modal.hide()
    },
    test() {
      console.log(this.tempCoupons)
    }
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal)
  }
}
</script>
