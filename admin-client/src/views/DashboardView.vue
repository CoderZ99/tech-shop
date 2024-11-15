<template>
  <div class="flex">
    <Sidebar />
    <div class="w-4/5 bg-gray-100 p-12">
      <router-view />
    </div>
  </div>
</template>
<script setup>
  import { onMounted } from "vue"
  import { useRouter } from "vue-router"
  import Sidebar from "../views/components/SideBar.vue"
  const router = useRouter()
  onMounted(() => {
    router.push({ path: "/dashboard/user" })
  })
</script>
