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
    }
  ],
})

export default router
