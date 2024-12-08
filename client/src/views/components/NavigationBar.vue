<template>
  <a-layout-header class="bg-white shadow">
    <div
      class="mx-auto flex h-16 max-w-7xl items-center justify-between px-2 sm:px-6 lg:px-8"
    >
      <div class="flex flex-shrink-0 items-center">
        <!-- Thêm flex-shrink-0 để ngăn không bị co lại -->
        <a href="/" class="flex items-center">
          <img class="h-8 w-auto" src="/src/assets/logo.svg" alt="Workflow" />
          <span class="ml-3 text-xl font-bold text-gray-900">iTech</span>
        </a>
      </div>
      <div class="flex flex-1 items-center justify-center">
        <!-- Thêm flex-1 để căn giữa -->
        <div class="ml-6 hidden space-x-4 sm:flex">
          <a-button
            type="text"
            class="flex items-center bg-white text-xl text-blue-700 hover:bg-gray-200 hover:text-blue-700"
          >
            <HomeFilled class="mr-2" /><RouterLink to="/">Trang chủ</RouterLink>
          </a-button>
          <a-button
            type="text"
            class="flex items-center bg-white text-xl text-blue-700 hover:bg-gray-200 hover:text-blue-700"
          >
            <RouterLink to="/products">Sản phẩm</RouterLink>
          </a-button>
        </div>
      </div>
      <div class="flex items-center">
        <a-button
          type="text"
          class="flex items-center text-xl text-gray-400 hover:text-black"
          @click="() => $router.push({ name: 'cart' })"
        >
          <ShoppingCartOutlined style="font-size: 25px" />
          <div class="ml-2">Giỏ hàng</div>
        </a-button>

        <a-dropdown>
          <a-dropdown>
            <template #overlay>
              <a-menu v-if="authStore.isAuthenticated === true">
                <a-menu-item key="0">
                  <RouterLink to="/profile">Thông tin cá nhân</RouterLink>
                </a-menu-item>
                <a-menu-item key="1">
                  <RouterLink to="/order-history">Đơn hàng</RouterLink>
                </a-menu-item>
                <a-menu-item key="2">
                  <RouterLink to="/my-reviews">Đánh giá của tôi</RouterLink>
                </a-menu-item>
                <a-menu-item key="3">
                  <RouterLink to="/change-password">Đổi mật khẩu</RouterLink>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item @click="handleLogout" key="4"
                  >Đăng xuất
                </a-menu-item>
              </a-menu>
              <a-menu v-else>
                <a-menu-item key="0">
                  <RouterLink to="/login">Đăng nhập</RouterLink>
                </a-menu-item>
                <a-menu-item key="1">
                  <RouterLink to="/register">Đăng ký</RouterLink>
                </a-menu-item>
              </a-menu>
            </template>
            <a-button
              type="text"
              class="ml-4 flex items-center text-gray-400 hover:text-black"
            >
              <UserOutlined style="font-size: 25px" />
              <div class="ml-2 text-xl">Tài khoản</div>
            </a-button>
          </a-dropdown>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { HomeFilled } from "@ant-design/icons-vue";
const router = useRouter();
const authStore = useAuthStore();

const handleLogout = async () => {
  if (authStore.logout()) {
    message.success("Đăng xuất thành công");
    router.push({ path: "/products" });
  }
};
</script>

<style scoped>
/* Custom styles */
</style>
