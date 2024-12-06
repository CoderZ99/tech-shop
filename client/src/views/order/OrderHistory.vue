<template>
  <div class="mx-auto min-h-screen w-4/5 bg-gray-100 p-8">
    <h2 class="mb-4 text-2xl font-semibold">Lịch sử đơn hàng</h2>
    <div v-if="orders.length">
      <div
        v-for="order in currentOrders"
        :key="order._id"
        class="mb-4 rounded bg-white p-6 shadow-md"
      >
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-4">
            <p class="font-semibold">
              Mã đơn hàng: {{ order._id?.toUpperCase() || order._id }}
            </p>
            <p>
              Ngày đặt:
              {{ new Date(order.orderAt).toLocaleDateString("vi-VN") }}
            </p>
            <p>
              Trạng thái:
              <a-tag :color="getStatusColor(order.status)">{{
                getStatusLabel(order.status)
              }}</a-tag>
            </p>
            <p class="font-semibold">
              Thanh toán:
              {{ order.isPaid === true ? "Đã thanh toán" : "Chưa thanh toán" }}
            </p>
          </div>
          <div class="col-span-4">
            <p class="font-semibold">Sản phẩm:</p>
            <ul>
              <li v-for="item in order.orderItems" :key="item.id">
                {{ item.name }} x{{ item.quantity }}
              </li>
            </ul>
          </div>
          <div class="col-span-4 text-right">
            <p class="font-semibold text-red-500">
              Tổng tiền: {{ formatPrice(order.totalPrice) }} ₫
            </p>
            <div class="mt-10 flex justify-end gap-4">
              <template v-if="order.status === 'placed'">
                <a-popconfirm
                  title="Bạn có chắc chắn muốn hủy đơn hàng này?"
                  ok-text="Đồng ý"
                  cancel-text="Hủy"
                  @confirm="() => handleCancelOrder(order)"
                >
                  <button
                    class="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                    type="primary"
                    danger
                  >
                    Hủy đơn
                  </button>
                </a-popconfirm>
              </template>
              <button
                @click="viewOrderDetail(order)"
                class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Chi tiết
              </button>
            </div>
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
import { fetchOrders, cancelOrder } from "@/api/orderService";
import { getStatusLabel, getStatusColor } from "@/utils/utils";
import { useAuthStore } from "@/stores/auth";
import { useOrderStore } from "@/stores/order";
import { message } from "ant-design-vue";
import { computed, onBeforeMount, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import CommonPagination from "@/views/components/CommonPagination.vue";

const router = useRouter();
// Store
const authStore = useAuthStore();
const orderStore = useOrderStore();
const orders = reactive([]);
const selectedOrder = reactive({});

// Các biến cho phân trang
const currentPage = ref(1); // Trang hiện tại
const pageSize = 3; // Số đơn hàng trên mỗi trang
const totalOrders = computed(() => orders.length); // Tổng số đơn hàng

const currentOrders = computed(() => {
  // Logic to paginate products
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return orders.slice(startIndex, endIndex);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const viewOrderDetail = (order) => {
  selectedOrder.value = order;
  console.log(`🚀 ~ viewOrderDetail ~ selectedOrder.value:`, selectedOrder);
  orderStore.setDetails(order);
  router.push({
    path: `order-details/${selectedOrder.value._id}`,
  });
};

const getOrders = async () => {
  try {
    console.log(
      `🚀 ~ getOrders ~ authStore.user.username:`,
      authStore.user.username,
    );
    const username = authStore.user.username;
    const response = await fetchOrders(username);
    console.log(`🚀 ~ getOrders ~ response:`, response);
    orders.splice(0, orders.length);
    orders.push(...response.data);
  } catch (error) {
    console.log(`🚀 ~ getOrders ~ error:`, error);
    message.error(error.message);
  }
};

const handleCancelOrder = async (order) => {
  console.log(`🚀 ~ handleCancelOrder ~ order:`, order);
  try {
    const response = await cancelOrder(order._id, order.orderItems);
    if (response) {
      message.success("Đã hủy đơn hàng thành công");
      await getOrders(); // Tải lại danh sách đơn hàng
    }
  } catch (error) {
    console.error("Error cancelling order:", error);
    message.error("Có lỗi xảy ra khi hủy đơn hàng");
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN").format(price);
};

onBeforeMount(() => {
  getOrders();
});
</script>

<style scoped></style>
