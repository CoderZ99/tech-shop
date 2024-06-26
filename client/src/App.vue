<script setup>
  import { message } from "ant-design-vue";
import { defineAsyncComponent } from "vue";
import { RouterView } from "vue-router";
import NavBar from "./views/components/NavigationBar.vue";

  const TheFooter = defineAsyncComponent(() =>
    import("./views/components/TheFooter.vue")
  )

  message.config({
    top: 100,
    maxCount: 2,
  })
</script>

<template>
  <NavBar />
  <div class="min-h-screen" >
    <RouterView />
  </div>
  <TheFooter />
</template>
<style scoped></style>
