<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Thống Kê Tổng Quan</h1>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-gray-500 text-sm">Tổng Số Người Dùng</h3>
        <p class="text-2xl font-semibold">{{ totalUsers }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-gray-500 text-sm">Tổng Số Sản Phẩm</h3>
        <p class="text-2xl font-semibold">{{ totalProducts }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-gray-500 text-sm">Tổng Số Đơn Hàng</h3>
        <p class="text-2xl font-semibold">{{ totalOrders }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-gray-500 text-sm">Tổng Doanh Thu</h3>
        <p class="text-2xl text-red-500 font-semibold">
          {{ formatCurrency(totalRevenue) }}
        </p>
      </div>
    </div>

    <!-- Recent Orders -->
    <div class="bg-white p-4 rounded-lg shadow mb-8">
      <h2 class="text-xl font-semibold mb-4">Đơn Hàng Gần Đây</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="bg-gray-50">
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Mã Đơn
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Khách Hàng
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ngày Đặt
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tổng Tiền
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Trạng Thái
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="order in recentOrders"
              :key="order._id"
            >
              <a-tooltip color="white">
                <template #title
                  ><td class="text-black px-6 py-4 whitespace-nowrap">
                    {{ order._id.toUpperCase() || order._id }}
                  </td></template
                >
                <td
                  class="max-w-24 text-ellipsis overflow-hidden px-6 py-4 whitespace-nowrap"
                >
                  {{ order._id.toUpperCase() || order._id }}
                </td>
              </a-tooltip>

              <td class="px-6 py-4 whitespace-nowrap">
                {{ order.receiver.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ formatDate(order.createdAt) }}
              </td>
              <td class="text-red-500 px-6 py-4 whitespace-nowrap">
                {{ formatCurrency(order.totalPrice) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(order.status)">
                  {{ getStatusLabel(order.status) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue"
  import { fetchOrders, getRevenue } from "@/api/orderService"

  import { fetchUsers } from "@/api/userService"
  import { fetchProducts } from "@/api/productService"

  import { message } from "ant-design-vue"

  import { getStatusLabel, formatCurrency } from "@/utils/utils"

  // Reactive references
  const totalUsers = ref(0)
  const totalProducts = ref(0)
  const totalOrders = ref(0)
  const totalRevenue = ref(0)
  // const recentOrders = ref(mockOrders)
  const recentOrders = ref([])

  onMounted(async () => {
    loadRevenue()
    loadOrders()
    loadUsers()
    loadProducts()
  })

  const loadRevenue = async () => {
    try {
      const response = await getRevenue()
      console.log("Revenue:")
      console.log(response?.data[0].totalRevenue)
      totalRevenue.value = response?.data[0].totalRevenue
    } catch (error) {
      console.log(`🚀 ~ getAllOrders ~ error: ${error}`)
    }
  }
  const loadOrders = async (query = { page: 1, limit: 4 }) => {
    try {
      const response = await fetchOrders(query)
      console.log(`🚀 ~ getAllOrders ~ response:`, response)
      recentOrders.value = []
      recentOrders.value = response?.data?.orders?.docs
      totalOrders.value = response?.data?.orders?.totalDocs
    } catch (error) {
      console.log(`🚀 ~ getAllOrders ~ error: ${error}`)
      message.error("Có lỗi xảy ra khi tải danh sách đơn hàng")
    }
  }

  const loadUsers = async (query = { page: 1, limit: 5 }) => {
    try {
      const response = await fetchUsers(query)
      totalUsers.value = response?.data?.users?.totalDocs
    } catch (error) {
      console.log(`🚀 ~ getAllUsers ~ error:${error}`)
      message.error("Có lỗi xảy ra khi tải số người dùng")
    }
  }

  const loadProducts = async (query = { page: 1, limit: 5 }) => {
    try {
      let response = await fetchProducts(query)
      totalProducts.value = response?.data?.products?.totalDocs
    } catch (error) {
      console.log(`🚀 ~ getProducts ~ error:${error}`)
      message.error("Có lỗi xảy ra khi tải số sản phẩm")
    }
  }

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Get status class helper
  const getStatusClass = (status) => {
    const classes = {
      placed: "bg-orange-100 text-orange-800",
      processing: "bg-blue-100 text-blue-800",
      shipping: "bg-yellow-100 text-yellow-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    }
    return `px-2 py-1 rounded-full text-xs ${
      classes[status.toLowerCase()] || ""
    }`
  }
</script>
