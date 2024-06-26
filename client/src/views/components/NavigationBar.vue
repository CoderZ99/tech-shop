<template>
  <a-layout-header class="bg-white shadow">
    <div
      class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex justify-between items-center h-16"
    >
      <div class="flex items-center flex-shrink-0">
        <!-- Thêm flex-shrink-0 để ngăn không bị co lại -->
        <a
          href="/"
          class="flex items-center"
        >
          <img
            class="h-8 w-auto"
            src="/src/assets/logo.svg"
            alt="Workflow"
          />
          <span class="ml-3 text-xl font-bold text-gray-900">iTech</span>
        </a>
      </div>
      <div class="flex items-center flex-1 justify-center">
        <!-- Thêm flex-1 để căn giữa -->
        <div class="hidden sm:flex space-x-4 ml-6">
          <a-button
            type="text"
            class="text-gray-700 hover:bg-gray-200 hover:text-black"
          >
            <RouterLink to="/">Trang chủ</RouterLink>
          </a-button>
          <!-- <a-button
            type="text"
            class="text-gray-700 hover:bg-gray-200 hover:text-black"
          >
            <RouterLink to="/products">Sản phẩm</RouterLink>
          </a-button> -->
        </div>
      </div>
      <div class="flex items-center">
        <a-button
          type="text"
          shape="circle"
          class="text-gray-400 hover:text-black"
          @click="() => $router.push('/cart')"
        >
          <ShoppingCartOutlined style="font-size: 25px" />
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
                <a-menu-divider />
                <a-menu-item
                  @click="handleLogout"
                  key="3"
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
              shape="circle"
              class="ml-4 text-gray-400 hover:text-black"
            >
              <UserOutlined style="font-size: 25px" />
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

  const router = useRouter()
  const authStore = useAuthStore()

  const handleLogout = async () => {
    if (authStore.logout()) {
      message.success("Đăng xuất thành công")
      router.push({ path: "/products" })
    }
  }
</script>

<style scoped>
  /* Custom styles */
</style>
