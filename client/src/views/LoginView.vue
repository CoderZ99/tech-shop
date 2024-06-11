<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        @submit.prevent="handleSubmit"
      >
        <a-form-item
          name="username"
          v-bind="validateInfos.username"
        >
          <label
            for="username"
            class="block mb-2 text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <a-input
            v-model:value="formState.username"
            placeholder="Username"
          >
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
          name="password"
          v-bind="validateInfos.password"
        >
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <a-input-password
            v-model:value="formState.password"
            placeholder="Password"
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
          >
            Login
          </a-button>
          <p class="text-center">
            Or
            <RouterLink
              to="/register"
              class="text-sky-500"
              >register now!</RouterLink
            >
          </p>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
  // Imports
  import { LockOutlined, UserOutlined } from "@ant-design/icons-vue"
  import { Form } from "ant-design-vue"
  import { reactive, ref } from "vue"
  // Data
  const useForm = Form.useForm
  const formRef = ref()
  const formState = reactive({
    username: "",
    password: "",
  })
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
  })
  const { resetFields, validate, validateInfos } = useForm(
    formState,
    rulesRef,
    {
      onValidate: (...args) => console.log(...args),
    }
  )
  const handleSubmit = async () => {
    try {
      await validate()
      console.log("Form submitted:", formState)
      // Add your login logic here
    } catch (error) {
      console.error("Validation failed:", error)
    }
  }
</script>

<style scoped>
  /* Custom styles can go here */
</style>
