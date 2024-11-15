<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md max-w-sm">
      <h2 class="text-2xl font-semibold mb-6 text-center">Đăng Nhập</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label
            class="block text-gray-700 mb-2"
            for="username"
            >Tên đăng nhập</label
          >
          <input
            v-model="username"
            type="username"
            id="username"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 mb-2"
            for="password"
            >Mật Khẩu</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Đăng Nhập
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { message } from "ant-design-vue"
  import { onMounted, ref } from "vue"
  import { useRouter } from "vue-router"
  import { useAuthStore } from "../stores/auth"
  const username = ref("")
  const password = ref("")
  const router = useRouter()
  const authStore = useAuthStore()

  const handleLogin = async () => {
    try {
      const loginData = {
        username: username.value,
        password: password.value,
      }
      console.log(loginData)
      const response = await authStore.login(loginData)
      console.log(`🚀 ~ handleLogin ~ response:`, response)
      if (!response) {
        message.error("Có lỗi xảy ra, vui lòng đăng nhập lại sau")
      }
      console.log("role===", response?.data?.user?.role)
      if (authStore?.user?.role === "admin") {
        message.success("Người quản trị đăng nhập thành công")
        router.push({ path: "/dashboard" })
      } else {
        message.error("Phải sử dụng tài khoản quản trị viên đăng nhập")
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  onMounted(() => {
    authStore.logout()
  })
</script>

<style scoped></style>
