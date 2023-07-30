const baseUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin`

// 新增優惠券
export const API_ADD_COUPON = `${baseUrl}/coupon`

// 修改優惠卷
export const API_UPDATE_COUPON = (id) => {
  return `${baseUrl}/coupon/${id}`
}

// 刪除優惠卷
export const API_DEL_COUPON = (id) => {
  return `${baseUrl}/coupon/${id}`
}

// 取得優惠券列表
export const API_COUPON_LIST = `${baseUrl}/coupons`

export default baseUrl
