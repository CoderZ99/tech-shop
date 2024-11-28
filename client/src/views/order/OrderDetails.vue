<template>
  <div class="mx-auto max-w-4xl p-6">
    <div class="rounded-lg bg-white shadow-md">
      <div class="p-6">
        <div class="mb-6 flex items-center justify-between">
          <h1 class="text-2xl font-semibold">Chi Tiết Đơn Hàng</h1>
          <a-button @click="() => router.go(-1)">Quay lại</a-button>
        </div>

        <a-descriptions v-if="order" bordered>
          <a-descriptions-item label="Mã đơn hàng" :span="2">
            <a-tag color="blue">{{ order._id?.toUpperCase() }}</a-tag>
          </a-descriptions-item>

          <a-descriptions-item label="Ngày đặt" :span="3">
            {{ formatDate(order.orderAt || order.createdAt) }}
          </a-descriptions-item>

          <a-descriptions-item label="Hình thức thanh toán" :span="1">
            <a-tag color="purple">{{
              order.paymentMethod?.toUpperCase()
            }}</a-tag>
          </a-descriptions-item>

          <a-descriptions-item label="Trạng thái thanh toán" :span="2">
            <a-tag :color="order.isPaid ? 'success' : 'warning'">
              {{ order.isPaid ? "Đã thanh toán" : "Chưa thanh toán" }}
            </a-tag>
          </a-descriptions-item>

          <a-descriptions-item label="Trạng thái đơn hàng" :span="3">
            <a-tag :color="getStatusColor(order.status)">
              {{ getStatusLabel(order.status) }}
            </a-tag>
          </a-descriptions-item>
        </a-descriptions>

        <a-divider orientation="left">Thông tin người nhận</a-divider>

        <a-descriptions v-if="order?.receiver" bordered>
          <a-descriptions-item label="Tên người nhận" :span="3">
            {{ order.receiver.name }}
          </a-descriptions-item>

          <a-descriptions-item label="Số điện thoại" :span="3">
            {{ order.receiver.phone }}
          </a-descriptions-item>

          <a-descriptions-item label="Địa chỉ nhận" :span="3">
            {{ order.receiver.address }}
          </a-descriptions-item>
        </a-descriptions>

        <template v-if="order?.orderItems?.length">
          <a-divider orientation="left">Sản phẩm đặt mua</a-divider>

          <a-table
            :dataSource="order.orderItems"
            :columns="columns"
            :pagination="false"
            size="small"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'price'">
                {{ formatPrice(record.price) }}đ
              </template>
              <template v-else-if="column.key === 'total'">
                {{ formatPrice(record.price * record.quantity) }}đ
              </template>
            </template>
          </a-table>

          <div class="mt-4 text-right">
            <p class="text-lg">
              <strong>Tổng tiền: </strong>
              <span class="ml-2 text-xl text-red-500"
                >{{ formatPrice(order.totalPrice) }}đ</span
              >
            </p>
          </div>
        </template>

        <template v-if="order?.statusHistory?.length">
          <a-divider orientation="left">Lịch sử đơn hàng</a-divider>

          <a-timeline class="mt-6">
            <a-timeline-item
              v-for="(status, index) in order.statusHistory"
              :key="index"
              :color="getStatusColor(status.status)"
            >
              <template #dot>
                <CheckCircleOutlined v-if="status.status === 'completed'" />
                <ClockCircleOutlined
                  v-else-if="status.status === 'processing'"
                />
                <ExclamationCircleOutlined
                  v-else-if="status.status === 'cancelled'"
                />
              </template>
              <p class="font-medium">{{ getStatusLabel(status.status) }}</p>
              <p class="text-gray-500">{{ formatDate(status.timestamp) }}</p>
            </a-timeline-item>
          </a-timeline>
        </template>

        <template
          v-if="order?.isPaid === false && order?.paymentMethod === 'PayPal'"
        >
          <a-divider />
          <div class="flex justify-center">
            <PayPalButton
              :payAmount="convertVNDToUSD(order.totalPrice)"
              @approve="handlePayPalApprove"
              @cancel="handlePayPalCancel"
              @error="handlePayPalError"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { message } from "ant-design-vue";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import { getStatusLabel, getStatusColor } from "@/utils/utils";
import { getOrders, updateOrder } from "@/api/orderService";
import { useOrderStore } from "@/stores/order";
import { useRouter } from "vue-router";
import PayPalButton from "@/views/components/PayPalButton.vue";
import { convertVNDToUSD } from "@/utils/currency";

const orderStore = useOrderStore();
const router = useRouter();
const order = ref({});

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
];

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN").format(price);
};

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleString("vi-VN");
};

const loadData = async () => {
  try {
    const id = orderStore.details._id;
    console.log(`🚀 ~ loadData ~ id:`, id);
    const response = await getOrders(id.toString());
    order.value = response.data;
    console.log(`🚀 ~ loadData ~ response:`, response);
  } catch (error) {
    console.error("Error loading order:", error);
    message.error("Không thể tải thông tin đơn hàng");
  }
};

const handlePayPalApprove = async (detail) => {
  try {
    order.value.isPaid = true;
    const response = await updateOrder(order.value);
    console.log(`🚀 ~ handlePayPalApprove ~ response:`, response);
    message.success("Thanh toán thành công");
    await loadData(); // Reload order data after successful payment
  } catch (error) {
    console.error("Error processing payment:", error);
    message.error("Có lỗi xảy ra khi xử lý thanh toán");
  }
};

const handlePayPalCancel = (data) => {
  console.log("Payment cancelled:", data);
  message.info("Đã hủy thanh toán");
};

const handlePayPalError = (error) => {
  console.error("PayPal error:", error);
  message.error("Có lỗi xảy ra trong quá trình thanh toán");
};

onMounted(() => {
  if (!orderStore.details?._id) {
    message.error("Không tìm thấy thông tin đơn hàng");
    router.push("/order-history");
    return;
  }
  loadData();
});
</script>

<style scoped>
:deep(.ant-descriptions-item-label) {
  width: 150px;
  font-weight: 500;
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

:deep(.ant-table-small) {
  font-size: 14px;
}

:deep(.ant-descriptions) {
  margin-bottom: 24px;
}
</style>
