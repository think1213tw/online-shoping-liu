<template>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>時間</td>
        <td>Email</td>
        <td class="text-right">購買款項</td>
        <td class="text-right">100</td>
        <td>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" />
            <label class="form-check-label">
              <span>已付款</span>
            </label>
          </div>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm">檢視</button>
            <button class="btn btn-outline-danger btn-sm">刪除</button>
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
      a: ''
    }
  },
  methods: {
    getOrderList() {
      //   this.isLoading = true

      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders`

      axios.get(api).then((res) => {
        console.log('取得訂單列表', res)
        // this.isLoading = false
        //
        // this.products = res.data.products
        //
        // this.pagination = res.data.pagination
      })
    }
  },
  created() {
    this.getOrderList()
  }
}
</script>
