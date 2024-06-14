<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
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
          />
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
          />
        </a-form-item>
        <!-- <a-form-item
          name="confirmPassword"
          v-bind="validateInfos.confirmPassword"
        >
          <label
            for="confirmPassword"
            class="block mb-2 text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <a-input-password
            v-model:value="formState.confirmPassword"
            placeholder="Confirm Password"
          />
        </a-form-item> -->
        <a-form-item
          name="fullname"
          v-bind="validateInfos.fullname"
        >
          <label
            for="fullname"
            class="block mb-2 text-sm font-medium text-gray-700"
          >
            Full name
          </label>
          <a-input
            v-model:value="formState.name"
            placeholder="Fullname"
          />
        </a-form-item>
        <a-form-item
          name="phone"
          v-bind="validateInfos.phone"
        >
          <label
            for="phone"
            class="block mb-2 text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <a-input
            v-model:value="formState.phone"
            placeholder="Phone"
          />
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            htmlType="submit"
            class="w-full"
          >
            Register
          </a-button>
          <p class="text-center">
            Already have an account?
            <RouterLink
              to="/login"
              class="text-sky-500"
              >Login here!</RouterLink
            >
          </p>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
  // Imports
  import { Form } from "ant-design-vue"
  import { reactive, ref } from "vue"
  // Data
  const useForm = Form.useForm
  const formRef = ref()
  const formState = reactive({
    username: "",
    password: "",
    // confirmPassword: "",
    name: "",
    phone: "",
  })
  // Methods
  const rulesRef = reactive({
    name: [
      {
        required: true,
        message: "Please input your fullname",
        trigger: "blur",
      },
    ],
    phone: [
      {
        required: true,
        message: "Please input your phone",
        trigger: "blur",
      },
    ],
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
    // confirmPassword: [
    //   {
    //     required: true,
    //     message: "Please confirm your password",
    //     trigger: "blur",
    //   },
    //   {
    //     validator: (_, value) => {
    //       if (value !== formState.password) {
    //         return Promise.reject("The two passwords do not match")
    //       }
    //       return Promise.resolve()
    //     },
    //     trigger: "blur",
    //   },
    // ],
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
      // Add your register logic here
    } catch (error) {
      console.error("Validation failed:", error)
    }
  }
</script>

<style scoped>
  /* Custom styles can go here */
</style>
