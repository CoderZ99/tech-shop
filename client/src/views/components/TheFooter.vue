<template>
  <footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto flex justify-between items-center">
      <div>
        <h3 class="text-lg font-semibold">Công ty của chúng tôi</h3>
        <p class="text-sm">Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</p>
        <p class="text-sm">Điện thoại: 0123 456 789</p>
        <p class="text-sm">Email: info@congty.com</p>
      </div>
      <div>
        <h3 class="text-lg font-semibold">Kết nối với chúng tôi</h3>
        <div class="flex space-x-4">
          <a
            href="#"
            class="text-blue-500 hover:text-blue-700"
          >
            <FacebookFilled />
          </a>
          <a
            href="#"
            class="text-blue-400 hover:text-blue-600"
          >
            <SkypeFilled />
          </a>
          <a
            href="#"
            class="text-pink-500 hover:text-pink-700"
          >
            <InstagramFilled />
          </a>
          <a
            href="#"
            class="text-red-600 hover:text-red-800"
          >
            <YoutubeFilled />
          </a>
        </div>
      </div>
    </div>
    <div class="container mx-auto mt-4 text-center text-sm text-gray-400">
      &copy; 2024 Công ty Cổ phần iTech VN
    </div>
  </footer>
</template>

<script setup>
  import {
    FacebookFilled,
    InstagramFilled,
    SkypeFilled,
    YoutubeFilled,
  } from "@ant-design/icons-vue"
</script>

<style scoped>
  footer a {
    display: inline-block;
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 24px;
  }
</style>
