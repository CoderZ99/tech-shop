<script setup>
import { reactive } from 'vue';
import { Form, message } from 'ant-design-vue';
import { LockOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { passwordPattern } from "@/utils/regex";
import { changePassword } from "@/api/authService";

const router = useRouter();
const useForm = Form.useForm;

const formState = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const rulesRef = reactive({
  currentPassword: [
    {
      required: true,
      message: 'Vui lòng nhập mật khẩu hiện tại',
      trigger: 'blur',
    }
  ],
  newPassword: [
    {
      required: true,
      message: 'Vui lòng nhập mật khẩu mới',
      trigger: 'blur',
    },
    {
      pattern: passwordPattern,
      message: 'Mật khẩu không hợp lệ',
      trigger: 'blur',
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: 'Vui lòng xác nhận mật khẩu mới',
      trigger: 'blur',
    },
    {
      validator: async (rule, value) => {
        if (value !== formState.newPassword) {
          throw new Error('Mật khẩu xác nhận không khớp');
        }
      },
      trigger: 'blur',
    }
  ],
});

const { validate, validateInfos } = useForm(formState, rulesRef);

const handleSubmit = async () => {
  try {
    let formError = false;
    await validate()
      .then(() => {})
      .catch(() => {
        formError = true;
      });

    if (formError === false) {
      const response = await changePassword({
        currentPassword: formState.currentPassword,
        newPassword: formState.newPassword
      });

      if (response.success) {
        message.success('Đổi mật khẩu thành công');
        router.push('/profile');
      }
    }
  } catch (error) {
    console.log(error);
    const errorMessage = error.message || 'Đổi mật khẩu thất bại';
    message.error(errorMessage);
  }
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-sm rounded bg-white p-8 shadow-md">
      <h2 class="mb-6 text-center text-2xl font-bold">Đổi mật khẩu</h2>
      <a-form>
        <a-form-item name="currentPassword" v-bind="validateInfos.currentPassword">
          <label for="currentPassword" class="mb-2 block text-sm font-medium text-gray-700">
            Mật khẩu hiện tại
          </label>
          <a-input-password
            v-model:value="formState.currentPassword"
            placeholder="Nhập mật khẩu hiện tại"
          >
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item name="newPassword" v-bind="validateInfos.newPassword">
          <label for="newPassword" class="mb-2 block text-sm font-medium text-gray-700">
            Mật khẩu mới
          </label>
          <a-input-password
            v-model:value="formState.newPassword"
            placeholder="Nhập mật khẩu mới"
          >
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item name="confirmPassword" v-bind="validateInfos.confirmPassword">
          <label for="confirmPassword" class="mb-2 block text-sm font-medium text-gray-700">
            Xác nhận mật khẩu mới
          </label>
          <a-input-password
            v-model:value="formState.confirmPassword"
            placeholder="Xác nhận mật khẩu mới"
          >
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            htmlType="submit"
            class="w-full"
            @click.prevent="handleSubmit"
          >
            Đổi mật khẩu
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped>
/* Custom styles can go here */
</style>
