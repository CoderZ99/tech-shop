<template>
  <div class="w-3/4 mx-auto bg-gray-100 p-8 min-h-screen">
    <h2 class="text-2xl font-semibold mb-4">Lịch sử đơn hàng</h2>
    <div v-if="orders.length">
      <div
        v-for="order in currentOrders"
        :key="order._id"
        class="bg-white p-6 rounded shadow-md mb-4"
      >
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-4">
            <p class="font-semibold">Mã đơn hàng: {{ order._id }}</p>
            <p>
              Ngày đặt:
              {{ new Date(order.orderAt).toLocaleDateString("vi-VN") }}
            </p>
            <p>
              Trạng thái:
              <span :class="statusClass(order.status)">{{
                statusString(order.status)
              }}</span>
            </p>
            <p class="font-semibold">
              Thanh toán:
              {{ order.isPaid === true ? "Đã thanh toán" : "Chưa thanh toán" }}
            </p>
          </div>
          <div class="col-span-4">
            <p class="font-semibold">Sản phẩm:</p>
            <ul>
              <li
                v-for="item in order.orderItems"
                :key="item.id"
              >
                {{ item.name }} x{{ item.quantity }}
              </li>
            </ul>
          </div>
          <div class="col-span-4 text-right">
            <p class="font-semibold text-red-500">
              Tổng tiền: {{ order.totalPrice }}₫
            </p>
            <button
              @click="viewOrderDetail(order)"
              class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
      <CommonPagination
        v-if="orders.length > 0"
        :current="currentPage"
        :total="totalOrders"
        :page-size="pageSize"
        @change="handlePageChange"
        show-less-items
      />
    </div>
    <div v-else>
      <p>Bạn chưa có đơn hàng nào.</p>
    </div>
  </div>
</template>

<script setup>
  import { fetchOrders } from "@/api/orderService"
  import { useAuthStore } from "@/stores/auth"
  import { useOrderStore } from "@/stores/order"
  import { message } from "ant-design-vue"
  import { computed, onBeforeMount, reactive, ref } from "vue"
  import { useRouter } from "vue-router"
  import CommonPagination from "../views/components/CommonPagination.vue"

  const router = useRouter()
  // Store
  const authStore = useAuthStore()
  const orderStore = useOrderStore()
  const orders = reactive([])
  const selectedOrder = reactive({})

  // Các biến cho phân trang
  const currentPage = ref(1) // Trang hiện tại
  const pageSize = 3 // Số đơn hàng trên mỗi trang
  const totalOrders = computed(() => orders.length) // Tổng số đơn hàng

  const currentOrders = computed(() => {
    // Logic to paginate products
    const startIndex = (currentPage.value - 1) * pageSize
    const endIndex = startIndex + pageSize
    return orders.slice(startIndex, endIndex)
  })

  const handlePageChange = (page) => {
    currentPage.value = page
  }

  const statusClass = (status) => {
    switch (status) {
      case "placed":
        return "text-green-500"
      case "shipping":
        return "text-yellow-500"
      case "delivered":
        return "text-blue-500"
      case "cancelled":
        return "text-red-500"
      default:
        return ""
    }
  }

  const statusString = (status) => {
    switch (status) {
      case "placed":
        return "Đã đặt"
      case "shipping":
        return "Đang giao"
      case "delivered":
        return "Đã giao"
      case "cancelled":
        return "Đã huỷ"
      default:
        return ""
    }
  }
  const viewOrderDetail = (order) => {
    selectedOrder.value = order
    console.log(`🚀 ~ viewOrderDetail ~ selectedOrder.value:`, selectedOrder)
    orderStore.setDetails(order)
    router.push({ path: `/order-details/${selectedOrder.value._id}` })
    // isModalVisible.value = true
  }

  const getOrders = async () => {
    try {
      console.log(
        `🚀 ~ getOrders ~ authStore.user.username:`,
        authStore.user.username
      )
      const username = authStore.user.username
      const response = await fetchOrders(username)
      console.log(`🚀 ~ getOrders ~ response:`, response)
      orders.push(...response.data)
    } catch (error) {
      console.log(`🚀 ~ getOrders ~ error:`, error)
      message.error(error.message)
    }
  }

  onBeforeMount(() => {
    getOrders()
  })
</script>

<style scoped></style>
