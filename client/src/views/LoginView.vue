<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-sm rounded bg-white p-8 shadow-md">
      <h2 class="mb-6 text-center text-2xl font-bold">Đăng nhập</h2>
      <a-form>
        <a-form-item name="username" v-bind="validateInfos.username">
          <label
            for="username"
            class="mb-2 block text-sm font-medium text-gray-700"
          >
            Tên người dùng
          </label>
          <a-input
            v-model:value="formState.username"
            placeholder="Nhập tên người dùng"
          >
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password" v-bind="validateInfos.password">
          <label
            for="password"
            class="mb-2 block text-sm font-medium text-gray-700"
          >
            Mật khẩu
          </label>
          <a-input-password
            v-model:value="formState.password"
            placeholder="Nhập mật khẩu"
          >
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button
            type="link"
            class="w-full"
            @click="() => $router.push({ name: 'forgot-password' })"
            >Quên mật khẩu?</a-button
          >
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            htmlType="submit"
            class="w-full"
            @click.prevent="handleLogin"
          >
            Đăng nhập
          </a-button>
          <a-divider class="my-3"></a-divider>
          <a-divider class="my-3">Hoặc</a-divider>
          <p class="mt-4 text-center">
            <a-button
              type="link"
              class="w-full text-sky-500 hover:bg-gray-200 hover:text-blue-700"
              @click="() => $router.push({ name: 'register' })"
              >Đăng ký ngay!</a-button
            >
          </p>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
// Imports
import { LockOutlined, UserOutlined } from "@ant-design/icons-vue";
import { Form, message } from "ant-design-vue";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
// import { login } from "../api/authService.js"
import { useAuthStore } from "../stores/auth";

// Data
const router = useRouter();
const authStore = useAuthStore();
const useForm = Form.useForm;
const formState = reactive({
  username: "",
  password: "",
});
// Methods
const rulesRef = reactive({
  username: [
    {
      required: true,
      message: "Please input your username",
      trigger: "blur",
    },
    {
      min: 3,
      max: 256,
      message: "Username must be 3 to 256 characters",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Please input your password",
      trigger: "blur",
    },
    {
      min: 6,
      max: 256,
      message: "Password must be 6 to 256 characters",
      trigger: "blur",
    },
  ],
});
const { resetFields, validate, validateInfos } = useForm(formState, rulesRef, {
  onValidate: (...args) => console.log(...args),
});
const handleLogin = async () => {
  try {
    let formError = false;
    await validate()
      .then(() => {})
      .catch((error) => {
        formError = true;
      });
    if (formError === false) {
      console.log("Form submitted:", formState);

      const loginData = {
        username: formState.username,
        password: formState.password,
      };

      const response = await authStore.login(loginData);

      if (!response) {
        throw new Error("Không kết nối được, thử lại sau");
      }

      if (authStore.user.role === "admin") {
        throw new Error("Phải sử dụng tài khoản người dùng đăng nhập");
      }

      message.success("Đăng nhập thành công", 1, () => {
        // Redirect to home page
        router.push({ name: "home" });
      });
    }
  } catch (error) {
    message.error(error.message);
  }
};
onMounted(() => {
  authStore.logout();
});
</script>

<style scoped>
/* Custom styles can go here */
</style>
