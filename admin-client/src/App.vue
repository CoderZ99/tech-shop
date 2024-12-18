<script setup>
  import { RouterView } from "vue-router"
  import { message } from "ant-design-vue"

  message.config({
    top: 200,
    maxCount: 2,
    duration: 1,
  })
</script>

<template>
  <RouterView class="w-full min-h-screen" />
</template>

<style scoped></style>
