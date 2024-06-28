<template>
  <div>
    <div class="w-full flex mb-4">
      <div class="text-2xl font-semibold">Quản lý đơn hàng</div>
      <a-button
        class="ml-auto"
        @click="getAllOrders"
        :disabled="loading"
        type="primary"
      >
        Tải lại dữ liệu
      </a-button>
    </div>
    <a-table
      :data-source="pagedOrders"
      rowKey="_id"
      bordered
      :loading="loading"
      :pagination="paginationConfig"
      @change="handleTableChange"
    >
      <a-table-column
        key="username"
        title="Tài khoản"
        dataIndex="username"
      />
      <a-table-column
        key="totalPrice"
        title="Tổng tiền"
        dataIndex="totalPrice"
      >
        <template #default="{ text: totalPrice }">
          <span>{{ formatCurrency(totalPrice) }}&#8363;</span>
        </template>
      </a-table-column>
      <a-table-column
        align="center"
        key="status"
        title="Trạng thái"
        dataIndex="status"
      >
        <template #default="{ text: status }">
          <span v-if="status === 'placed'">
            <a-tag class="min-w-28 text-center">Đã đặt hàng</a-tag>
          </span>
          <span v-if="status === 'shipping'">
            <a-tag
              class="min-w-28 text-center"
              color="processing"
              >Đang vận chuyển</a-tag
            >
          </span>
          <span v-if="status === 'delivered'">
            <a-tag
              class="min-w-28 text-center"
              color="success"
              >Đã giao hàng</a-tag
            >
          </span>
          <span v-if="status === 'cancelled'">
            <a-tag
              class="min-w-28 text-center"
              color="error"
              >Đã hủy đơn</a-tag
            >
          </span>
        </template>
      </a-table-column>
      <a-table-column
        align="center"
        key="paymentMethod"
        title="Phương thức thanh toán"
        dataIndex="paymentMethod"
      >
        <template #default="{ text: paymentMethod }">
          <span v-if="paymentMethod === 'cod'">
            <a-tag :key="paymentMethod"> Thanh toán khi nhận </a-tag>
          </span>
          <span
            color="#2db7f5"
            v-else-if="paymentMethod === 'paypal'"
          >
            <a-tag :key="paymentMethod"> Thanh toán PayPal </a-tag>
          </span>
          <span
            color="red"
            v-else
          >
            <a-tag :key="paymentMethod"> Khác </a-tag>
          </span>
        </template>
      </a-table-column>
      <a-table-column
        align="center"
        key="orderAt"
        title="Ngày đặt hàng"
        dataIndex="orderAt"
      >
        <template #default="{ text: orderAt }">
          <span>{{ formatDate(orderAt) }}</span>
        </template>
      </a-table-column>
      <a-table-column
        key="action"
        title="Hành động"
        align="center"
      >
        <template #default="{ record }">
          <a-button @click="viewOrder(record)"> Chi tiết </a-button>
          <a-button
            class="ml-2"
            v-if="
              record.status !== 'cancelled' && record.status !== 'delivered'
            "
            type="primary"
            @click="toggleOrderStatus(record)"
          >
            {{ "Hủy đơn" }}
          </a-button>
        </template>
      </a-table-column>
    </a-table>
  </div>
  <OrderDetails
    :order="selectedOrder"
    :visible="isModalVisible"
    @close="handleModalClose"
  />
</template>
<script setup>
  import { cancelOrder, fetchOrders } from "@/api/orderService"
  import { message } from "ant-design-vue"
  import { onMounted, reactive, ref } from "vue"
  import OrderDetails from "../views/components/OrderDetails.vue"
  const orders = ref([])
  const pagedOrders = ref([])
  const loading = ref(false)
  const paginationConfig = ref({
    current: 1,
    pageSize: 6,
    total: 0,
  })
  const selectedOrder = reactive({})
  const isModalVisible = ref(false)
  const getAllOrders = async () => {
    loading.value = true
    try {
      const response = await fetchOrders()
      console.log(`🚀 ~ getAllOrders ~ response:`, response)
      orders.value = []
      orders.value = response?.data
      paginationConfig.value.total = orders.value.length
      message.success("Danh sách đơn hàng đã được tải")
      setPagedOrders()
    } catch (error) {
      console.log(`🚀 ~ getAllOrders ~ error:`, error)
    } finally {
      loading.value = false
    }
  }

  const setPagedOrders = () => {
    const start =
      (paginationConfig.value.current - 1) * paginationConfig.value.pageSize
    const end = start + paginationConfig.value.pageSize
    pagedOrders.value = orders.value.slice(start, end)
  }

  const handleTableChange = (pagination) => {
    paginationConfig.value = pagination
    setPagedOrders()
  }

  const toggleOrderStatus = async (order) => {
    console.log(`🚀 ~ toggleOrderStatus ~ order.orderItems:`, order.orderItems)
    try {
      const response = await cancelOrder(order._id, order.orderItems)
      if (!response) {
        message.error("Có lỗi xảy ra")
      } else {
        message.success(`Đơn hàng ${order._id} đã bị hủy`)
      }
      getAllOrders()
      setPagedOrders()
    } catch (error) {
      message.error("Có lỗi xảy ra")
    }
  }

  const formatDate = (text) => {
    const date = new Date(text)
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const handleModalClose = () => {
    isModalVisible.value = false
  }
  const viewOrder = (order) => {
    selectedOrder.value = order
    isModalVisible.value = true
  }
  onMounted(getAllOrders)
</script>
<style scoped>
  /* Add any additional styles here */
</style>
