<template>
  <div class="mx-auto mt-6 w-2/5">
    <div class="text-center text-2xl">Hồ Sơ Của Tôi</div>
  </div>
  <div class="mx-auto mt-6 w-2/5 max-w-3xl rounded bg-white p-6 shadow-lg">
    <h4 class="text-gray-600">Quản lý thông tin hồ sơ để bảo mật tài khoản</h4>
    <a-divider />
    <div class="w-full">
      <div>
        <IdcardOutlined class="ml-1 mr-2 text-gray-400" />
        <label for="username">Tên đăng nhập</label>
        <a-input
          id="username"
          class="mt-1 pl-3"
          v-model:value="authStore.user.username"
          disabled
        />
      </div>
      <div class="mt-4">
        <UserOutlined class="ml-1 mr-2 text-gray-400" />
        <label for="name">Họ và tên</label>
        <a-input id="name" class="mt-1 pl-3" v-model:value="user.name" />
      </div>
      <div class="mt-4">
        <PhoneOutlined class="ml-1 mr-2 text-gray-400" />
        <label for="phone">Số điện thoại</label>
        <a-input id="phone" class="mt-1 pl-3" v-model:value="user.phone" />
      </div>
      <div class="mt-4">
        <label for="email">Email</label>
        <a-input id="email" class="mt-1 pl-3" v-model:value="user.email" />
      </div>
    </div>
    <a-divider />
    <div class="mt-4 flex w-full justify-evenly">
      <a-button class="w-1/4" @click="cancelChanges">Quay lại</a-button>
      <a-button class="w-1/4" type="primary" @click="saveChanges"
        >Lưu thay đổi</a-button
      >
    </div>
  </div>
</template>

<script setup>
// Imports
import { updateUserProfile } from "@/api/userService";
import { useAuthStore } from "@/stores/auth";
import {
  IdcardOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
// Router
const router = useRouter();

// Store
const authStore = useAuthStore();
// Data
const user = ref({
  name: "",
  phone: "",
  email: "",
});
let currentName = "";
let currentPhone = "";
let currentEmail = "";
// Methods
const saveChanges = async () => {
  // Validate data changed
  if (
    user.value.name === currentName &&
    user.value.phone === currentPhone &&
    user.value.email === currentEmail
  ) {
    message.error("Thay giá trị để cập nhật");
    return;
  }
  // Save changes
  try {
    // Call API
    const response = await updateUserProfile(authStore.user?.username, {
      name: user.value.name,
      phone: user.value.phone,
      email: user.value.email,
    });
    // Update store
    authStore.user.name = response?.data?.user?.name;
    authStore.user.phone = response?.data?.user?.phone;
    authStore.user.email = response?.data?.user?.email;
    currentName = response?.data?.user?.name;
    currentPhone = response?.data?.user?.phone;
    currentEmail = response?.data?.user?.email;
    // Show success message
    message.success("Cập nhật thông tin thành công");
  } catch (error) {
    console.log(`🚀 ~ saveChanges ~ error:`, error);
    message.error("Cập nhật thông tin thất bại");
  }
};

const cancelChanges = () => {
  // Update store
  user.value.name = authStore?.user?.name;
  user.value.phone = authStore?.user?.phone;
  user.value.email = authStore?.user?.email;
  // Go back
  router.go(-1);
};

// Lifecycle
// Mounted
onMounted(() => {
  // Get user data from store
  user.value.name = authStore?.user?.name;
  user.value.phone = authStore?.user?.phone;
  user.value.email = authStore?.user?.email;
  currentName = user.value.name;
  currentPhone = user.value.phone;
  currentEmail = user.value.email;
});
</script>

<style scoped></style>
