<template>
  <div class="flex">
    <Sidebar class="w-1/5"/>
    <div class="w-4/5 bg-gray-100 p-12" v-if="dashboardStore.selectedTab === 'user'">
      <UserView />
    </div>
    <div class="w-4/5 bg-gray-100 p-12" v-else-if="dashboardStore.selectedTab === 'order'">
      <OrderView />
    </div>
    <div class="w-4/5 bg-gray-100 p-12" v-else>
      <ProductView />
    </div>
  </div>
</template>
<script setup>
import { useDashboardStore } from "@/stores/dashboard";
import OrderView from "./OrderView.vue";
import ProductView from "./ProductView.vue";
import UserView from "./UserView.vue";
import Sidebar from "./components/Sidebar.vue";
  const dashboardStore = useDashboardStore();
</script>
