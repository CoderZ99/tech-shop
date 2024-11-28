<template>
  <div class="mx-auto min-h-screen w-1/2 p-8">
    <h2 class="mb-4 text-center text-2xl font-semibold">Chi tiết đơn hàng</h2>

    <div
      v-if="order"
      class="mb-6 flex flex-col items-start rounded border p-8 shadow-md"
    >
      <span class="mb-4 text-lg font-semibold">Thông tin người nhận</span>
      <!-- <div>
        <span>Mã đơn hàng:</span>
        <span>{{ order._id }}</span>
      </div> -->
      <div>
        <span>Người nhận hàng: {{ order.receiver?.name }}</span>
      </div>
      <div>
        <span>Số điện thoại liên hệ: {{ order.receiver?.phone }}</span>
      </div>
      <div>
        <span>Địa chỉ nhân hàng: {{ order.receiver?.address }}</span>
      </div>
      <div>
        <span>Ngày đặt hàng: </span>
        <span>{{ new Date(order.createdAt).toLocaleString() }}</span>
      </div>
      <div>
        <span>Trạng thái: </span>
        <span>{{ statusString(order.status) }}</span>
      </div>
      <div>
        <span>Thanh toán: </span>
        <span>{{
          order.isPaid === true ? "Đã thanh toán" : "Chưa thanh toán"
        }}</span>
      </div>
      <a-divider />
      <h3 class="font-semibold">Danh sách sản phẩm</h3>
      <div v-for="product in order.orderItems" :key="product._id" class="mt-2">
        <div class="">{{ product.name }}</div>
        <div class="flex">
          <div class="mr-4">Giá: {{ product.price }}₫</div>
          <div>-</div>
          <div class="ml-4">Số lượng: {{ product.quantity }}</div>
        </div>
      </div>
      <a-divider />
      <div class="text-xl font-medium">
        Tổng số tiền: {{ order.totalPrice }}₫
      </div>
      <a-divider />
      <div class="flex w-full justify-between">
        <a-button class="w-48" @click="() => router.push('/order-history')">
          Quay lại</a-button
        >
        <PayPalButton
          v-if="order.isPaid === false && order.paymentMethod === 'PayPal'"
          class="ml-4"
          :payAmount="convertVNDToUSD(order.totalPrice)"
          @approve="(detail) => handlePayPalApprove(detail)"
          @cancel="(detail) => handlePayPalCancel(detail)"
          @error="(error) => handlePayPalError(error)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { getOrders, updateOrder } from "@/api/orderService";
import { useOrderStore } from "@/stores/order";
import { convertVNDToUSD } from "@/utils/currency";
import PayPalButton from "@/views/components/PayPalButton.vue";
import { message } from "ant-design-vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const orderStore = useOrderStore();
const router = useRouter();
const order = ref({});

const loadData = async () => {
  const id = orderStore.details._id;
  console.log(`🚀 ~ loadData ~ id:`, id);
  const response = await getOrders(id.toString());
  order.value = response.data;
  console.log(`🚀 ~ loadData ~ response:`, response);
};

const handlePayPalApprove = async (detail) => {
  const id = orderStore.details._id;
  order.value.isPaid = true;
  const response = await updateOrder(order.value);
  console.log(`🚀 ~ handlePayPalApprove ~ response:`, response);
  message.success("Thanh toán thành công");
};

const statusString = (status) => {
  switch (status) {
    case "placed":
      return "Đã đặt";
    case "shipping":
      return "Đang giao";
    case "delivered":
      return "Đã giao";
    case "cancelled":
      return "Đã huỷ";
    default:
      return "";
  }
};

onMounted(() => {
  console.log(orderStore.details._id);
  loadData();
});
</script>

<style scoped></style>
