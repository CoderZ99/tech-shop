<template>
  <div class="w-3/5 bg-white p-4 mt-8 rounded shadow-md">
    <h3 class="text-lg font-semibold mb-4">An tâm mua sắm</h3>
    <div class="mb-2 flex items-center">
      <CheckCircleOutlined class="text-blue-500 mr-2" />
      <span>Được đồng kiểm khi nhận hàng</span>
    </div>
    <div class="mb-2 flex items-center">
      <DollarCircleOutlined class="text-blue-500 mr-2" />
      <span>Được hoàn tiền 200% nếu là hàng giả.</span>
    </div>
    <div class="mb-2 flex items-center">
      <SwapOutlined class="text-blue-500 mr-2" />
      <span>Đổi trả miễn phí:</span>
    </div>
    <ul class="list-disc pl-8 mb-2 text-gray-700">
      <li>Trong 30 ngày khi bạn đổi ý hoặc sản phẩm không đúng cam kết.</li>
      <li>Trong 365 ngày khi có lỗi từ nhà sản xuất.</li>
    </ul>
  </div>
</template>

<script setup>
  import {
    CheckCircleOutlined,
    DollarCircleOutlined,
    SwapOutlined,
  } from "@ant-design/icons-vue"
</script>

<style scoped>
  /* Add custom styles if necessary */
</style>
