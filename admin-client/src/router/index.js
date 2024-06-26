import { createRouter, createWebHistory } from "vue-router"

import DashboardView from "../views/DashboardView.vue"
import LoginView from "../views/LoginView.vue"

// router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/login", name: "login", component: LoginView },
    { path: "/", redirect: "/login" },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      meta: { requiresAuth: true },
    }
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
