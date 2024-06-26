<template>
  <div class="w-2/5 mx-auto mt-6">
    <div class="text-center text-2xl">Hồ Sơ Của Tôi</div>
  </div>
  <div class="w-2/5 mt-6 p-6 bg-white rounded shadow-lg max-w-3xl mx-auto">
    <h4 class="text-gray-600">Quản lý thông tin hồ sơ để bảo mật tài khoản</h4>
    <a-divider />
    <div class="w-full">
      <div>
        <IdcardOutlined class="text-gray-400 ml-1 mr-2" />
        <label for="username">Tên đăng nhập</label>
        <a-input
          id="username"
          class="pl-3 mt-1"
          v-model:value="authStore.user.username"
          disabled
        />
      </div>
      <div class="mt-4">
        <UserOutlined class="text-gray-400 ml-1 mr-2" />
        <label for="name">Họ và tên</label>
        <a-input
          id="name"
          class="pl-3 mt-1"
          v-model:value="user.name"
        />
      </div>
      <div class="mt-4">
        <PhoneOutlined class="text-gray-400 ml-1 mr-2" />
        <label for="phone">Số điện thoại</label>
        <a-input
          id="phone"
          class="pl-3 mt-1"
          v-model:value="user.phone"
        />
      </div>
    </div>
    <a-divider />
    <div class="w-full flex justify-evenly mt-4">
      <a-button
        class="w-1/4"
        @click="cancelChanges"
        >Huỷ thay đổi</a-button
      >
      <a-button
        class="w-1/4"
        type="primary"
        @click="saveChanges"
        >Lưu thay đổi</a-button
      >
    </div>
  </div>
</template>

<script setup>
  // Imports
  import { updateUserProfile } from "@/api/userService"
import { useAuthStore } from "@/stores/auth"
import {
  IdcardOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons-vue"
import { message } from "ant-design-vue"
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
  // Router
  const router = useRouter()

  // Store
  const authStore = useAuthStore()
  // Data
  const user = ref({})
  let currentName = ""
  let currentPhone = ""
  // Methods
  const saveChanges = async () => {
    // Validate data changed
    console.log(user.value.name, user.value.phone)
    console.log(currentName, currentPhone)
    if (user.value.name === currentName && user.value.phone === currentPhone) {
      message.error("Thay giá trị để cập nhật")
      return
    }
    // Save changes
    try {
      // Call API
      const response = await updateUserProfile(authStore.user?.username, {
        name: user.value.name,
        phone: user.value.phone,
      })
      // Update store
      authStore.user.name = response?.data?.user?.name
      authStore.user.phone = response?.data?.user?.phone
      currentName = response?.data?.user?.name
      currentPhone = response?.data?.user?.phone
      // Show success message
      console.log(`🚀 ~ saveChanges ~ authStore.user:`, authStore.user)
      // message.success(response?.data?.message)
      message.success("Cập nhật thông tin thành công")
    } catch (error) {
      console.log(`🚀 ~ saveChanges ~ error:`, error)
      // message.error(error?.message)
      message.error("Cập nhật thông tin thất bại")
    }
  }

  const cancelChanges = () => {
    // Update store
    // authStore.user = localStorage.getItem("user")
    console.log(`🚀 ~ cancelChanges ~ authStore.user:`, authStore.user)
    user.value.name = authStore?.user?.name
    user.value.phone = authStore?.user?.phone
  }

  // Lifecycle
  // Mounted
  onMounted(() => {
    // Get user data from store
    user.value = { ...authStore.user }
    currentName = user.value.name
    currentPhone = user.value.phone
    console.log(`🚀 ~ onBeforeMount ~ authStore.user:`, authStore.user)
  })
</script>

<style scoped></style>
