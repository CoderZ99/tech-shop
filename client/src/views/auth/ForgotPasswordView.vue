<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Quên mật khẩu
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Nhập thông tin tài khoản của bạn để nhận liên kết đặt lại mật khẩu
        </p>
      </div>

      <div class="mt-4">
        <a-select
          v-model:value="identityType"
          class="w-full"
          :options="[
            { value: 'username', label: 'Tên đăng nhập' },
            { value: 'email', label: 'Email' },
          ]"
        />
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label for="identity" class="block text-sm font-medium text-gray-700">
            {{ identityType === "email" ? "Email" : "Tên đăng nhập" }}
          </label>
          <div class="mt-1">
            <input
              id="identity"
              v-model="identity"
              :name="identityType"
              :type="identityType === 'email' ? 'email' : 'text'"
              required
              class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              :placeholder="
                identityType === 'email'
                  ? 'example@email.com'
                  : 'Nhập tên đăng nhập'
              "
            />
          </div>
          <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {{ loading ? "Đang gửi..." : "Gửi yêu cầu" }}
          </button>
        </div>
      </form>

      <div class="mt-4 text-center">
        <router-link to="/login" class="text-indigo-600 hover:text-indigo-500">
          Quay lại đăng nhập
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

const router = useRouter();

const identityType = ref("email"); // Mặc định chọn email
const identity = ref("");
const loading = ref(false);
const error = ref(null);

const handleSubmit = async () => {
  try {
    loading.value = true;
    error.value = null;

    // Validate input
    if (!identity.value.trim()) {
      throw new Error(
        identityType.value === "email"
          ? "Vui lòng nhập email"
          : "Vui lòng nhập tên đăng nhập",
      );
    }

    // Validate email format if email type is selected
    if (identityType.value === "email" && !identity.value.includes("@")) {
      throw new Error("Email không hợp lệ");
    }

    // TODO: Thực hiện gọi API để gửi yêu cầu đặt lại mật khẩu
    // await authStore.forgotPassword({
    //   type: identityType.value,
    //   value: identity.value
    // });

    message.success("Liên kết đặt lại mật khẩu đã được gửi đến email của bạn");
    router.push("/login");
  } catch (err) {
    error.value = err?.message || "Có lỗi xảy ra. Vui lòng thử lại.";
    message.error(error.value);
  } finally {
    loading.value = false;
  }
};
</script>
