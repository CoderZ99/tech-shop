<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-sm rounded bg-white p-8 shadow-md">
      <h2 class="mb-6 text-center text-2xl font-bold">Đăng ký</h2>
      <a-form ref="formRef" :model="formState" :rules="rules">
        <a-form-item name="username">
          <label
            for="username"
            class="mb-2 block text-sm font-medium text-gray-700"
          >
            Tên đăng nhập
          </label>
          <a-input
            v-model:value="formState.username"
            placeholder="Nhập tên đăng nhập"
            auto
          />
        </a-form-item>
        <a-form-item name="password">
          <label
            for="password"
            class="mb-2 block text-sm font-medium text-gray-700"
          >
            Mật khẩu
          </label>
          <a-input-password
            v-model:value="formState.password"
            placeholder="Nhập mật khẩu"
          />
        </a-form-item>
        <a-form-item name="fullname">
          <label
            for="fullname"
            class="mb-2 block text-sm font-medium text-gray-700"
          >
            Họ tên
          </label>
          <a-input v-model:value="formState.name" placeholder="Nhập họ tên" />
        </a-form-item>
        <a-form-item name="phone">
          <label
            for="phone"
            class="mb-2 block text-sm font-medium text-gray-700"
          >
            Số điện thoại
          </label>
          <a-input
            type="phone"
            v-model:value="formState.phone"
            placeholder="Phone"
          />
        </a-form-item>
        <a-form-item name="email">
          <label
            for="email"
            class="mb-2 block text-sm font-medium text-gray-700"
          >
            Địa chỉ email
          </label>
          <a-input
            v-model:value="formState.email"
            placeholder="Nhập địa chỉ email"
          />
        </a-form-item>
        <a-divider class="my-3"></a-divider>
        <a-form-item>
          <a-button type="primary" @click="handleSubmit" class="w-full">
            Đăng ký
          </a-button>
        </a-form-item>
        <a-form-item>
          <p class="text-center">
            Đã có tài khoản?
            <a-button
              type="link"
              class="text-sky-500"
              @click="() => $router.push({ name: 'login' })"
              >Đăng nhập ngay!</a-button
            >
          </p>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
// Imports
import { message } from "ant-design-vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "@/api/authService.js";
import {
  usernamePattern,
  fullNamePattern,
  passwordPattern,
  phonePattern,
  emailPattern,
} from "@/utils/regex";
// Data
const router = useRouter();
const successMsgDisplayTime = 3;
const formRef = ref();
const formState = reactive({
  username: "",
  password: "",
  name: "",
  phone: "",
  email: "",
});
// Methods
const rules = {
  name: [
    {
      required: true,
      message: "Nhập họ tên",
      trigger: "blur",
    },
    {
      pattern: fullNamePattern,
      message: "Họ tên không hợp lệ",
      trigger: "blur",
    },
  ],
  phone: [
    {
      required: true,
      message: "Nhập số điện thoại",
      trigger: "blur",
    },
    {
      pattern: phonePattern,
      message: "Số điện thoại không hợp lệ",
      trigger: "blur",
    },
  ],
  username: [
    {
      required: true,
      message: "Nhập tên đăng nhập",
      trigger: "blur",
    },
    {
      min: 4,
      max: 20,
      message: "Tên đăng nhập từ 4 tới 20 ký tự",
      trigger: "blur",
    },
    {
      pattern: usernamePattern,
      message: "Tên đăng nhập không hợp lệ",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Nhập mật khẩu",
      trigger: "blur",
    },
    {
      pattern: passwordPattern,
      message: "Mật khẩu không hợp lệ",
      trigger: "blur",
    },
  ],
  email: [
    {
      required: true,
      message: "Nhập địa chi email",
      trigger: "blur",
    },
    {
      pattern: emailPattern,
      message: "Địa chi email không hợp lệ",
      trigger: "blur",
    },
  ],
};

const handleSubmit = async () => {
  formRef.value
    .validate()
    .then(async () => {
      const response = await register(formState);
      console.log(`Summit register ~ response:`, response);
      message.success(response.data.message, successMsgDisplayTime, () => {
        // Redirect to login page
        router.push({ name: "login" });
      });
    })
    .catch((error) => {
      console.log(`Summit register ~ error:`, error);
      message.error(error?.message || "Kiểm tra lại thông tin đã nhập!");
    });
};
</script>
