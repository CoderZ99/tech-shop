<script setup>
  import { message } from "ant-design-vue"
  import { RouterView } from "vue-router"
  import NavBar from "./views/components/NavigationBar.vue"
  message.config({
    top: 100,
    maxCount: 2,
  })
</script>

<template>
  <NavBar />
  <RouterView />
</template>
<style scoped></style>
