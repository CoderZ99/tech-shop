<template>
  <div class="mt-8 rounded bg-white p-4 shadow-md">
    <h3 class="mb-4 text-lg font-semibold">An tâm mua sắm</h3>
    <div class="mb-2 flex items-center">
      <CheckCircleOutlined class="mr-2 text-blue-500" />
      <span>Được đồng kiểm khi nhận hàng</span>
    </div>
    <div class="mb-2 flex items-center">
      <DollarCircleOutlined class="mr-2 text-blue-500" />
      <span>Được hoàn tiền 200% nếu là hàng giả.</span>
    </div>
    <div class="mb-2 flex items-center">
      <SwapOutlined class="mr-2 text-blue-500" />
      <span>Đổi trả miễn phí:</span>
    </div>
    <ul class="mb-2 list-disc pl-8 text-gray-700">
      <li>Trong 30 ngày khi sản phẩm không đúng cam kết.</li>
      <li>Trong 365 ngày khi có lỗi từ nhà sản xuất.</li>
    </ul>
  </div>
</template>

<script setup>
import {
  CheckCircleOutlined,
  DollarCircleOutlined,
  SwapOutlined,
} from "@ant-design/icons-vue";
</script>

<style scoped>
/* Add custom styles if necessary */
</style>
