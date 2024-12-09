<template>
  <div>
    <div class="w-full flex mb-4">
      <div class="text-2xl font-semibold">Quản lý đơn hàng</div>
      <!-- Refresh button -->
      <a-button
        class="ml-auto"
        @click="getAllOrders(query)"
        :disabled="loading"
        type="primary"
      >
        Tải lại dữ liệu
      </a-button>
    </div>
    <!-- Filter, Search, Sort -->
    <div class="flex justify-center gap-3">
      <!-- Search -->
      <!-- <div class="mb-4 flex w-[40%] items-center">
        <a-input-search
          class="flex items-center"
          :allowClear="true"
          v-model:value="query.search"
          placeholder="Nhập username cần tìm..."
          @search="handleQueryChange"
        >
          <template #enterButton>
            <div class="flex items-center">
              <SearchOutlined />
            </div>
          </template>
        </a-input-search>
      </div> -->
      <!-- Filter payment method -->
      <div class="mb-4 flex items-center">
        <div class="mr-2 text-gray-500">Thanh toán</div>
        <a-select
          v-model:value="query.paymentMethod"
          placeholder="Thanh toán"
          style="width: 145px"
          @change="handleQueryChange"
        >
          <a-select-option value="">Tất cả</a-select-option>
          <a-select-option value="cod">COD</a-select-option>
          <a-select-option value="paypal">PAYPAL</a-select-option>
        </a-select>
      </div>
      <!-- Filter order status -->
      <div class="mb-4 flex items-center">
        <div class="mr-2 text-gray-500">Trạng thái</div>
        <a-select
          v-model:value="query.status"
          placeholder="Trạng thái đơn"
          style="width: 145px"
          @change="handleQueryChange"
        >
          <a-select-option value="">Tất cả</a-select-option>
          <a-select-option value="placed">Đã đặt hàng</a-select-option>
          <a-select-option value="processing">Đang xử lý</a-select-option>
          <a-select-option value="shipping">Đang giao hàng</a-select-option>
          <a-select-option value="delivered">Đã hoàn thành</a-select-option>
          <a-select-option value="cancelled">Đã hủy</a-select-option>
        </a-select>
      </div>
      <!-- Sort -->
      <div class="mb-4 flex items-center">
        <div class="mr-2 text-gray-500">Ngày đặt</div>
        <a-select
          v-model:value="query.sort"
          placeholder="Ngày đặt hàng"
          style="width: 145px"
          @change="handleQueryChange"
        >
          <!-- <a-select-option value="createdAt:desc">Hàng mới</a-select-option> -->
          <a-select-option value="orderAt:desc">Mới nhất</a-select-option>
          <a-select-option value="orderAt:asc">Cũ nhất</a-select-option>
        </a-select>
      </div>
    </div>
    <!-- Orders Table -->
    <a-table
      :data-source="pagedOrders"
      rowKey="_id"
      bordered
      :loading="loading"
      :pagination="false"
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
          <a-button
            class="min-w-20 mr-2"
            @click="viewOrder(record)"
            >Chi tiết</a-button
          >
          <a-button
            :class="{ invisible: record.status === 'cancelled' }"
            class="min-w-20 mr-2"
            type="primary"
            @click="openUpdateModal(record)"
            >Cập nhật</a-button
          >
          <a-button
            class="min-w-20"
            type="primary"
            danger
            @click="handleDelete(record)"
            >Xoá</a-button
          >
        </template>
      </a-table-column>
    </a-table>
    <!-- Pagination -->
    <div class="mt-4 flex justify-end">
      <a-pagination
        v-model:current="current"
        v-model:total="total"
        v-model:page-size="pageSize"
        @change="handlePageChange"
        show-less-items
        :showSizeChanger="false"
      />
    </div>
  </div>
  <!-- Order details modal -->
  <OrderDetails
    :order="selectedOrder"
    :visible="isDetailsVisible"
    @cancel="isDetailsVisible = false"
  />

  <!-- Update status modal -->
  <UpdateOrderStatusModal
    :order="selectedOrder"
    :visible="isUpdateModalVisible"
    @cancel="isUpdateModalVisible = false"
    @update="handleUpdateStatus"
    @afterClose="clearModalData"
  />
</template>

<script setup>
  import {
    updateOrderStatus,
    fetchOrders,
    deleteOrder,
  } from "@/api/orderService"
  import { Modal, message } from "ant-design-vue"
  import { computed, onMounted, reactive, ref } from "vue"
  import { getStatusLabel, getStatusColor } from "@/utils/utils"
  import OrderDetails from "./OrderDetails.vue"
  import UpdateOrderStatusModal from "./UpdateOrderStatusModal.vue"
  import { formatDate } from "@/utils/utils"

  // ref
  const orders = ref([])
  const loading = ref(false)
  const selectedOrder = reactive({})
  const isDetailsVisible = ref(false)
  const isUpdateModalVisible = ref(false)

  // Default current page is 1
  // Default page size is 5
  const current = ref(1)
  const pageSize = ref(5)
  const total = ref(0)
  const pagedOrders = computed(() => orders?.value || [])

  // State for query
  const query = ref({
    search: "",
    status: "",
    paymentMethod: "",
    sort: "orderAt:desc",
    page: 1,
    limit: 5,
  })
  const getAllOrders = async (query = { page: 1, limit: 5 }) => {
    loading.value = true
    try {
      const response = await fetchOrders(query)
      console.log(`🚀 ~ getAllOrders ~ response:`, response)
      orders.value = []
      orders.value = response?.data?.orders?.docs
      total.value = response?.data?.orders?.totalDocs
      // message.success("Danh sách đơn hàng đã được tải")
    } catch (error) {
      console.log(`🚀 ~ getAllOrders ~ error: ${error}`)
      message.error("Có lỗi xảy ra khi tải danh sách đơn hàng")
    } finally {
      loading.value = false
    }
  }

  const handlePageChange = async (page) => {
    query.value.page = page
    current.value = page
    await getAllOrders(query.value)
  }

  const handleQueryChange = async () => {
    query.value.page = 1
    current.value = 1
    await getAllOrders(query.value)
  }

  const handleUpdateStatus = async (status) => {
    isUpdateModalVisible.value = false
    console.group("updateStatus")
    console.log(`status:`, status)
    console.log(`selectedOrder:`, selectedOrder)
    console.log(`selectedOrder.orderItems:`, selectedOrder.value.orderItems)
    try {
      const response = await updateOrderStatus(
        selectedOrder?.value?._id,
        selectedOrder?.value?.orderItems,
        status
      )
      console.log(`response:`, response)
      if (!response) {
        throw new Error("Cập nhật trạng thái thất bại!")
      }
      await getAllOrders(query.value)
    } catch (error) {
      message.error(error?.message)
    }
    console.groupEnd("updateStatus")
  }

  const handleDelete = async (order) => {
    Modal.confirm({
      title: "Xóa đơn hàng",
      content: `Bạn có chắc chắn muốn xóa đơn hàng: ${order._id.toUpperCase()}`,
      onOk: async () => {
        try {
          const response = await deleteOrder(order._id)
          if (response) {
            message.success("Xóa đơn hàng thành công!")
          }
          await getAllOrders(query.value)
        } catch (error) {
          console.log(`handleDelete ~ error:${error}`)
          message.error("Có lỗi xảy ra khi xóa đơn hàng")
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

  const openUpdateModal = (order) => {
    console.log(`openUpdateModal:`, order)
    selectedOrder.value = order
    isUpdateModalVisible.value = true
  }

  onMounted(getAllOrders)
</script>
