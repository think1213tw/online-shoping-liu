// 單一商品細節
export const API_PRODUCT_DETAIL = (productId) => {
  return `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${productId}`
}

// 加入購物車
export const API_ADD_CART = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`

// 使用箭頭 函式一定要return
