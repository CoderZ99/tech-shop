<template>
  <a-modal
    v-model:visible="props.visible"
    title="Chi Tiết Đơn Hàng"
    :footer="null"
    width="750px"
    @cancel="handleCancel"
  >
    <a-descriptions bordered>
      <a-descriptions-item
        label="Mã đơn hàng"
        :span="2"
      >
        <a-tag color="blue">{{ props.order.value._id.toUpperCase() }}</a-tag>
      </a-descriptions-item>

      <a-descriptions-item
        label="Ngày đặt"
        :span="3"
      >
        {{ formatDate(props.order.value.orderAt) }}
      </a-descriptions-item>

      <a-descriptions-item
        label="Hình thức thanh toán"
        :span="1"
      >
        <a-tag color="purple">{{
          props.order.value.paymentMethod.toUpperCase()
        }}</a-tag>
      </a-descriptions-item>

      <a-descriptions-item
        label="Trạng thái thanh toán"
        :span="2"
        align="center"
      >
        <a-tag :color="props.order.value.isPaid ? 'success' : 'warning'">
          {{ props.order.value.isPaid ? "Đã thanh toán" : "Chưa thanh toán" }}
        </a-tag>
      </a-descriptions-item>

      <a-descriptions-item
        label="Trạng thái đơn hàng"
        :span="3"
      >
        <div class="flex items-center gap-4">
          <a-tag :color="getStatusColor(props.order.value.status)">
            {{ getStatusLabel(props.order.value.status) }}
          </a-tag>
        </div>
      </a-descriptions-item>
    </a-descriptions>

    <a-divider orientation="left">Thông tin người nhận</a-divider>

    <a-descriptions bordered>
      <a-descriptions-item
        label="Tên người nhận"
        :span="3"
      >
        {{ props.order.value.receiver.name }}
      </a-descriptions-item>

      <a-descriptions-item
        label="Số điện thoại"
        :span="3"
      >
        {{ props.order.value.receiver.phone }}
      </a-descriptions-item>

      <a-descriptions-item
        label="Địa chỉ nhận"
        :span="3"
      >
        {{ props.order.value.receiver.address }}
      </a-descriptions-item>
    </a-descriptions>

    <a-divider orientation="left">Sản phẩm đặt mua</a-divider>

    <a-table
      :dataSource="props.order.value.orderItems"
      :columns="columns"
      :pagination="false"
      size="small"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'price'">
          {{ formatCurrency(record.price) }}
        </template>
        <template v-else-if="column.key === 'total'">
          {{ formatCurrency(record.price * record.quantity) }}
        </template>
      </template>
    </a-table>

    <div class="mt-4 text-right">
      <p class="text-lg">
        <strong>Tổng tiền: </strong>
        <span class="text-red-500 text-xl ml-2 font-bold"
          >{{ formatCurrency(props.order.value.totalPrice) }}</span
        >
      </p>
    </div>
  </a-modal>
</template>

<script setup>
  import { onMounted, ref } from "vue"

  import { formatCurrency, getStatusLabel, getStatusColor, formatDate } from "@/utils/utils"

  const emit = defineEmits(["cancel", "updateStatus"])

  const props = defineProps({
    visible: {
      type: Boolean,
      required: true,
    },
    order: {
      type: Object,
      required: true,
    },
  })

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      width: 150,
    },
    {
      title: "Thành tiền",
      key: "total",
      width: 150,
    },
  ]

  const handleCancel = () => {
    emit("cancel")
  }

  onMounted(() => {
    console.log(`🚀 ~ onMounted ~ props.order:`, props.order)
  })
</script>

<style scoped>
  :deep(.ant-descriptions-item-label) {
    width: 150px;
    font-weight: 500;
  }

  :deep(.ant-modal-header) {
    border-bottom: 1px solid #f0f0f0;
    padding: 16px 24px;
  }

  :deep(.ant-modal-title) {
    font-size: 18px;
    font-weight: 600;
  }

  :deep(.ant-divider-with-text) {
    font-size: 16px;
    font-weight: 500;
  }

  :deep(.ant-timeline) {
    margin-top: 24px;
    padding: 16px;
    background-color: #fafafa;
    border-radius: 8px;
  }

  :deep(.ant-timeline-item-content) {
    margin-left: 28px;
  }
</style>
