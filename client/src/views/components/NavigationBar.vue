<template>
  <a-layout-header class="bg-white shadow">
    <div
      class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex justify-between items-center h-16"
    >
      <div class="flex items-center">
        <a
          href="/"
          class="flex items-center"
        >
          <img
            class="h-8 w-auto"
            src="/src/assets/logo.svg"
            alt="Workflow"
          />
          <span class="ml-3 text-xl font-bold text-gray-900">E-Tech</span>
        </a>
        <div class="hidden sm:flex space-x-4 ml-6">
          <a-button
            type="text"
            class="text-gray-700 hover:bg-gray-200 hover:text-black"
            ><RouterLink to="/">Home</RouterLink></a-button
          >
          <a-button
            type="text"
            class="text-gray-700 hover:bg-gray-200 hover:text-black"
            ><RouterLink to="/products">Products</RouterLink></a-button
          >
          <a-button
            type="text"
            class="text-gray-700 hover:bg-gray-200 hover:text-black"
            ><RouterLink to="/categories">Categories</RouterLink></a-button
          >
        </div>
      </div>
      <div
        class="flex-1 mx-4"
        style="max-width: 450px"
      >
        <a-input-search
          size="middle"
          placeholder="Bạn tìm gì hôm nay"
          allow-clear
          enter-button="Search"
          v-model="searchValue"
          @search="onSearch"
        />
      </div>
      <div class="flex items-center">
        <a-button
          type="text"
          shape="circle"
          class="text-gray-400 hover:text-black"
          @Click="() => $router.push('/cart')"
        >
          <ShoppingCartOutlined style="font-size: 25px" />
        </a-button>
        <a-dropdown>
          <template #overlay>
            <a-menu>
              <a-menu-item key="0">
                <RouterLink to="/profile">Your profile</RouterLink>
              </a-menu-item>
              <a-menu-item key="1">
                <RouterLink to="/orders">Orders</RouterLink>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3">
                <RouterLink to="/sign-out">Sign out</RouterLink>
              </a-menu-item>
            </a-menu>
          </template>
          <a-button
            type="text"
            shape="circle"
            class="ml-4 text-gray-400 hover:text-black"
          >
            <UserOutlined style="font-size: 25px" />
          </a-button>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>

<script setup>
  // Imports
  import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons-vue"
  import { ref } from "vue"

  // Data
  const searchValue = ref("")

  // Methods
  const onSearch = (value) => {
    alert(value)
  }
</script>

<style scoped>
  /* Custom styles can go here */
</style>
