<template>
  <div class="relative w-64">
    <div
      class="fixed top-0 lef-0 min-h-screen flex flex-col bg-gray-800 text-white w-64"
    >
      <div class="flex items-center justify-center h-16 bg-gray-900">
        <div class="flex items-center text-xl font-semibold">
          <SettingOutlined
            :spin="true"
            class="mr-2"
          />Admin
        </div>
      </div>
      <nav class="flex-1">
        <ul>
          <li class="px-6 py-4 hover:bg-gray-700">
            <button
              @click="router.push({ name: 'statistics' })"
              class="flex items-center"
            >
              <BarChartOutlined class="mr-2" />
              Thống kê
            </button>
          </li>
          <li class="px-6 py-4 hover:bg-gray-700">
            <button
              @click="router.push({ name: 'user' })"
              class="flex items-center"
            >
              <UserOutlined class="mr-2" />
              Người dùng
            </button>
          </li>
          <li class="px-6 py-4 hover:bg-gray-700">
            <button
              @click="router.push({ name: 'product' })"
              class="flex items-center"
            >
              <AppstoreOutlined class="mr-2" />
              Sản phẩm
            </button>
          </li>
          <li class="px-6 py-4 hover:bg-gray-700">
            <button
              @click="router.push({ name: 'order' })"
              class="flex items-center"
            >
              <ShoppingCartOutlined class="mr-2" />
              Đơn hàng
            </button>
          </li>
        </ul>
      </nav>
      <div class="p-6">
        <button
          @click="handleLogout"
          class="flex justify-center w-4/5 mx-auto bg-red-500 text-white py-3 rounded"
        >
          <LogoutOutlined class="mr-2" />
          Đăng xuất
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useDashboardStore } from "@/stores/dashboard"
  import { useAuthStore } from "../../stores/auth"
  import { useRouter } from "vue-router"
  import {
    AppstoreOutlined,
    LogoutOutlined,
    SettingOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    BarChartOutlined,
  } from "@ant-design/icons-vue"
  const router = useRouter()
  const authStore = useAuthStore()
  const dashboardStore = useDashboardStore()
  const handleLogout = () => {
    router.push({ path: "/login" })
  }
</script>
<style scoped></style>
