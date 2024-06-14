<template>
  <div
    class="profile-view mt-16 p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto"
  >
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center">
        <a-avatar
          size="large"
          :src="userStore.getImage"
        />
      </div>
      <a-button
        type="link"
        class="text-blue-500"
      >
        <a-icon type="edit" />
        Change Profile Information
      </a-button>
    </div>
    <a-form layout="vertical">
      <a-form-item label="Username">
        <a-input
          :value="userStore.getUsername"
          disabled
        />
      </a-form-item>
      <a-form-item label="Name">
        <a-input :value="user.name" />
      </a-form-item>
      <a-form-item label="Phone Number">
        <a-input :value="user.phone" />
      </a-form-item>
      <a-form-item label="Address">
        <a-input :value="user.address" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
  import { useUserStore } from "@/stores/user"
  import { reactive } from "vue"
  const userStore = useUserStore()
  const user = reactive({
    username: userStore.getUsername,
    name: userStore.getName,
    phone: userStore.getPhone,
    address: userStore.getAddress,
  })
</script>

<style scoped>
  .profile-view {
    max-width: 600px;
    margin: 0 auto;
  }
</style>
