<template>
  <div class="h-screen bg-gray-800 text-white w-64 flex flex-col">
    <div class="p-4">
      <h1 class="text-2xl font-bold">Dashboard</h1>
    </div>
    <nav class="flex-1 px-2 space-y-2">
      <router-link
        to="/"
        class="block py-2 px-4 rounded hover:bg-gray-700"
        active-class="bg-gray-700"
      >
        Home
      </router-link>
      <router-link
        to="/products"
        class="block py-2 px-4 rounded hover:bg-gray-700"
        active-class="bg-gray-700"
      >
        Products
      </router-link>
      <router-link
        to="/categories"
        class="block py-2 px-4 rounded hover:bg-gray-700"
        active-class="bg-gray-700"
      >
        Categories
      </router-link>
      <router-link
        to="/orders"
        class="block py-2 px-4 rounded hover:bg-gray-700"
        active-class="bg-gray-700"
      >
        Orders
      </router-link>
      <router-link class="block py-2 px-4 rounded hover:bg-gray-700">
        Logout
      </router-link>
    </nav>
  </div>
</template>

<script setup></script>
import useAuthStore from "@/stores/auth"
<style scoped></style>
