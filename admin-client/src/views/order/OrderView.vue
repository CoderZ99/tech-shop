<template>
  <div>
    <div class="w-full flex mb-4">
      <div class="text-2xl font-semibold">Quản lý đơn hàng</div>
      <!-- Refresh button -->
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
      :scroll="{ x: 'max-content' }"
    >
      <!-- <a-table-column
        key="username"
        title="Tài khoản"
        dataIndex="username"
      /> -->
      <!-- Order ID Column -->
      <a-table-column
        key="_id"
        title="Mã đơn"
        dataIndex="_id"
        align="center"
      >
        <template #default="{ text: _id }">
          <span>{{ _id.toUpperCase() }}</span>
        </template>
      </a-table-column>
      <!-- Status Column -->
      <a-table-column
        align="center"
        key="status"
        title="Trạng thái"
        dataIndex="status"
      >
        <template #default="{ text: status }">
          <a-tag
            :color="getStatusColor(status)"
            class="min-w-28 text-center"
            >{{ getStatusLabel(status) }}</a-tag
          >
        </template>
      </a-table-column>
      <!-- Payment Method Column -->
      <a-table-column
        align="center"
        key="paymentMethod"
        title="Thanh toán"
        dataIndex="paymentMethod"
      >
        <template #default="{ text: paymentMethod }">
          <a-tag
            color="purple"
            :key="paymentMethod"
          >
            {{ paymentMethod.toUpperCase() }}</a-tag
          >
        </template>
      </a-table-column>
      <!-- Date order Column -->
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
      <!-- Action Column -->
      <a-table-column
        key="action"
        title="Hành động"
        align="center"
        fixed="right"
      >
        <template #default="{ record }">
          <a-button class="min-w-20 mr-2" @click="viewOrder(record)">Chi tiết</a-button>
          <a-button class="min-w-20 mr-2" type="primary" @click="handleUpdate(record)">Cập nhật</a-button>
          <a-button class="min-w-20" type="primary" danger @click="handleDelete(record)">Xoá</a-button>
        </template>
      </a-table-column>
    </a-table>
  </div>
  <!-- Order details modal -->
  <OrderDetails
    :order="selectedOrder"
    :visible="isDetailsVisible"
    @cancel="isDetailsVisible = false"
  />
</template>
<script setup>
  import {
    updateOrderStatus,
    fetchOrders,
    deleteOrder,
  } from "@/api/orderService"
  import { Modal, message } from "ant-design-vue"
  import { onMounted, reactive, ref } from "vue"
  import { getStatusLabel, getStatusColor } from "@/utils/utils"
  import OrderDetails from "./OrderDetails.vue"
  import { formatDate } from "@/utils/utils"

  // ref
  const orders = ref([])
  const pagedOrders = ref([])
  const loading = ref(false)
  const paginationConfig = ref({
    current: 1,
    pageSize: 6,
    total: 0,
  })
  const selectedOrder = reactive({})
  const isDetailsVisible = ref(false)
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

  const handleUpdate = async (status) => {
    console.group("updateStatus")
    console.log(`status:`, status)
    try {
      const response = await updateOrderStatus(
        selectedOrder?.value?._id,
        selectedOrder.orderItems,
        status
      )
      console.log(`response:`, response)
      if (!response) {
        throw new Error("Cập nhật trạng thái thất bại!")
      }
      getAllOrders()
      setPagedOrders()
    } catch (error) {
      message.error(error?.message)
    }
    console.groupEnd("updateStatus")
  }

  const handleDelete = async (order) => {
    Modal.confirm({
      title: "Xóa đơn hàng",
      content: `Bạn có chắc chắn muốn xóa đơn hàng: ${ order._id.toUpperCase() }`,
      onOk: async () => {
        try {
          const response = await deleteOrder(order._id)
          if (response) {
            message.success("Xóa đơn hàng thành công!")
          }
          getAllOrders()
          setPagedOrders()
        } catch (error) {
          message.error(error)
        }
      },
    })

    console.group("deleteOrder")
    console.log(`order:`, order)
    console.groupEnd("deleteOrder")
  }

  const viewOrder = (order) => {
    selectedOrder.value = order
    isDetailsVisible.value = true
  }

  onMounted(getAllOrders)
</script>
