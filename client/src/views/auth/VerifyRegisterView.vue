<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div v-if="loading" class="text-center">
      <a-spin tip="Đang xác minh tài khoản của bạn..." />
    </div>

    <template v-else>
      <!-- Trạng thái xác thực thành công -->
      <a-result
        v-if="verificationStatus === 'success'"
        status="success"
        title="Xác thực tài khoản thành công!"
        sub-title="Tài khoản của bạn đã được kích hoạt thành công."
      >
        <template #extra>
          <a-button type="primary" href="/login"
            >Chuyển sang đăng nhập</a-button
          >
        </template>
      </a-result>

      <!-- Trạng thái xác thực thất bại -->
      <a-result
        v-else-if="verificationStatus === 'error'"
        status="error"
        title="Xác thực tài khoản thất bại"
        sub-title="Liên kết xác minh không hợp lệ hoặc đã hết hạn."
      >
        <template #extra>
          <a-button class="min-w-40" href="/register"
            >Quay lại đăng ký</a-button
          >
          <a-button class="min-w-40" type="primary" @click="verifyAccount"
            >Xác thực lại</a-button
          >
        </template>
      </a-result>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { verifyEmail } from "@/api/authService";

const verificationStatus = ref(""); // 'loading', 'success', 'error'
const loading = ref(true);

const route = useRoute();
const token = computed(() => route.params.token);

const verifyAccount = async () => {
  loading.value = true;
  try {
    const response = await verifyEmail(token.value);
    console.log(`verifyAccount ~ response: ${response}`);
    if (response.status === 200) {
      verificationStatus.value = "success";
    } else {
      verificationStatus.value = "error";
    }
  } catch (error) {
    verificationStatus.value = "error";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  verifyAccount();
});
</script>

<style scoped></style>
