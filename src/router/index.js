import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/loginPage',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/dashBoard',
    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        path: 'productList',
        component: () => import('../views/ProductList.vue')
      },
      {
        path: 'order',
        component: () => import('../views/Order.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/Coupons.vue')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('../views/UserBoard.vue'),
    children: [
      {
        path: 'cart',
        component: () => import('../views/UserCart.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/UserProduct.vue')
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/UserCheckout.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
