<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <a-form>
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
            @click.prevent="handleLogin"
          >
            Login
          </a-button>
          <p class="text-center">
            Or
            <a-button
              type="link"
              class="text-sky-500"
              @click="() => $router.push('/register')"
              >register now!</a-button
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
  import { Form, message } from "ant-design-vue"
  import { reactive } from "vue"
  import { useRouter } from "vue-router"
  // import { login } from "../api/authService.js"
  import { useAuthStore } from "../stores/auth"
  // Data
  const router = useRouter()
  const authStore = useAuthStore()
  const useForm = Form.useForm
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
  const handleLogin = async () => {
    try {
      let formError = false
      await validate()
        .then(() => {})
        .catch((error) => {
          formError = true
        })
      if (formError === false) {
        console.log("Form submitted:", formState)

        const loginData = {
          username: formState.username,
          password: formState.password,
        }

        const response = await authStore.login(loginData)

        if (!response) {
          throw new Error("Login failed")
        }

        message.success("Login successfully!", 1, () => {
          // Redirect to home page
          router.push({ path: "/" })
        })
      }
    } catch (error) {
      console.log(`🚀 ~ handleLogin ~ error:`, error)

      message.error(error.message)
    }
  }
</script>

<style scoped>
  /* Custom styles can go here */
</style>
