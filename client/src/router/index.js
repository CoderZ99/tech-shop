import { createRouter, createWebHistory } from "vue-router";

import OrderSummaryView from "../views/OrderSummaryView.vue";
import ProductDetailsView from "../views/ProductDetailsView.vue";
import ProfileView from "../views/ProfileView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", redirect: { name: "products" } },
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
      component: ProfileView,
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
      component: OrderSummaryView,
      meta: { requiresAuth: true },
    },
    {
      path: "/order-history",
      name: "order-history",
      component: () => import("../views/OrderHistory.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/order-details/:detailId",
      name: "order-details",
      component: () => import("../views/OrderDetails.vue"),
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
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    const isAuthenticated = checkAuth();
    console.log(`🚀 ~ router.beforeEach ~ isAuthenticated:`, isAuthenticated);
    if (isAuthenticated) {
      next(); // Đã đăng nhập, cho phép truy cập
    } else {
      next({ path: '/login' }); // Chưa đăng nhập, chuyển hướng đến trang đăng nhập
    }
  } else {
    next(); // Route không cần đăng nhập, cho phép truy cập
  }
});

function checkAuth() {
  const accessToken = localStorage.getItem('accessToken');
  const user = localStorage.getItem('user');
  return !!accessToken && !!user;
}
export default router
