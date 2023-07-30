const baseUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}`

// 取得商品列表
export const API_PRODUCT_LIST = `${baseUrl}/products`

// 單一商品細節
export const API_PRODUCT_DETAIL = (productId) => {
  return `${baseUrl}/product/${productId}`
}

// 加入跟取得購物車列表是同支API
export const API_CART_LIST = `${baseUrl}/cart`

// 更新購物車品項
export const API_CART_UPDATE = (productId) => {
  return `${baseUrl}/cart/${productId}`
}

// 套用優惠券
export const API_ADD_COUPON = `${baseUrl}/coupon`

// 使用箭頭函式一定要return
