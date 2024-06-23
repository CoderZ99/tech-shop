import { createRouter, createWebHistory } from "vue-router"

import HomeView from "../views/HomeView.vue"
import ProductDetailsView from "../views/ProductDetailsView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    {
      path: "/logout",
      name: "logout",
      redirect: { name: "login" },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/products/:detailUrl",
      name: "product-details",
      component: ProductDetailsView,
      props: true,
    },
    {
      path: "/products",
      name: "products",
      component: () => import("../views/ProductsView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/CartView.vue"),
    },
    {
      path: "/order-summary",
      name: "order-summary",
      component: () => import("../views/OrderSummaryView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/order-history",
      name: "order-history",
      component: () => import("../views/OrderHistory.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/not-found",
      name: "not-found",
      component: () => import("../views/NotFound.vue"),
    },
    { path: "/:pathMatch(.*)*", redirect: "/not-found" },
  ],
})

router.beforeEach((to, from, next) => {
  // Kiểm tra xem route cần đăng nhập hay không
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    const isAuthenticated = checkAuth()
    console.log(`🚀 ~ router.beforeEach ~ isAuthenticated:`, isAuthenticated)
    if (isAuthenticated) {
      next() // Đã đăng nhập, cho phép truy cập
    } else {
      next("/login") // Chưa đăng nhập, chuyển hướng đến trang đăng nhập
    }
  } else {
    next() // Route không cần đăng nhập, cho phép truy cập
  }
})

function checkAuth() {
  const loggedInUser = localStorage.getItem("accessToken")
  if (loggedInUser) return true
  else return false
}
export default router
