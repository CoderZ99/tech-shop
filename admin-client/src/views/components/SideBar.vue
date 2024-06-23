<template>
  <div class="h-screen bg-gray-800 text-white w-64 flex flex-col">
    <nav class="flex-1 px-2 space-y-2">
      <router-link
        to="/products"
        class="block py-2 px-4 rounded hover:bg-gray-700"
        active-class="bg-gray-700"
      >
        Products
      </router-link>
      <router-link
        to="/orders"
        class="block py-2 px-4 rounded hover:bg-gray-700"
        active-class="bg-gray-700"
      >
        Orders
      </router-link>
    </nav>
  </div>
</template>

<script setup></script>
import { useAuthStore } from "../../stores/auth"
const authStore = useAuthStore()
<style scoped></style>
