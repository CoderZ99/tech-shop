<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h2 class="mb-4 text-center text-2xl font-semibold">Giỏ Hàng</h2>
    <div class="flex flex-col items-center">
      <div class="mr-4 w-4/5 rounded bg-white p-6 shadow-md">
        <!-- Grid Header -->
        <div class="grid grid-cols-11 gap-0 border-b pb-4 text-gray-700">
          <div class="col-start-1 col-end-2 mx-auto my-auto">
            <a-checkbox
              @change="cartStore.selectAllItems(allSelected)"
              v-model:checked="allSelected"
            />
          </div>
          <div class="col-start-2 col-end-5">
            <p class="text-lg font-semibold">
              Tất cả ({{ cartStore.totalItems }} sản phẩm)
            </p>
          </div>
          <div class="col-start-6 col-end-7">Đơn giá</div>
          <div class="col-start-8 col-end-9">Số lượng</div>
          <div class="col-span-2 col-start-10 col-end-11">Thành tiền</div>
          <div class="col-start-12 col-end-13">
            <button
              @click="cartStore.clearCart"
              class="rounded bg-red-500 px-4 py-2 text-white"
            >
              <ClearOutlined class="inline-flex" />
            </button>
          </div>
        </div>

        <!-- Cart Items List -->
        <div
          v-for="(item, index) in cartStore.items"
          :key="item._id"
          class="grid grid-cols-11 items-center gap-0 border-b py-4"
        >
          <div class="col-start-1 col-end-2 mx-auto my-0">
            <a-checkbox v-model:checked="item.selected" />
          </div>
          <div class="col-start-2 col-end-5 flex items-center gap-2">
            <a-image
              v-if="item.images[0]?.url.length > 0"
              :width="50"
              :src="item.images[0]?.url"
              alt="product"
              class="mr-4 h-16 w-16 object-cover"
              :preview="false"
            />
            <div>
              <p class="font-semibold">{{ item.name }}</p>
            </div>
          </div>
          <div class="col-start-5 col-end-7 pr-1 text-end">
            {{ formatCurrency(item.price) }}
          </div>
          <div class="col-start-8 col-end-9 flex items-center">
            <div class="flex flex-col items-center">
              <div class="flex items-center">
                <a-button
                  @click="
                    cartStore.updateItemQuantity(item._id, item.quantity - 1)
                  "
                  :disabled="item.quantity === 1"
                  class="rounded bg-gray-200 px-2 py-0"
                >
                  &#x2D;
                </a-button>
                <span class="mx-2 min-w-5 text-center">{{
                  item.quantity
                }}</span>
                <a-button
                  @click="
                    cartStore.updateItemQuantity(item._id, item.quantity + 1)
                  "
                  :disabled="item.quantity === item.stock"
                  class="rounded bg-gray-200 px-2 py-0"
                >
                  &#x2B;
                </a-button>
              </div>
              <div class="mt-2 text-xs text-orange-500">
                Tối đa {{ item.stock }}
              </div>
            </div>
          </div>
          <div class="col-span-2 col-end-11 text-end text-red-500">
            {{ formatCurrency(item.price * item.quantity) }}
          </div>
          <div class="col-start-12 col-end-13">
            <button
              @click="cartStore.removeItem(item._id)"
              class="rounded bg-red-500 px-4 py-2 text-white"
            >
              <!-- <button
              @click="removeItem(item)"
              class="px-4 py-2 bg-red-500 text-white rounded"
            > -->
              <ClearOutlined class="inline-flex" />
            </button>
          </div>
        </div>
        <a-empty v-if="cartStore.items.length === 0">
          <template #description>
            <span>Giỏ hàng trống</span>
          </template>
          <a-divider />
        </a-empty>
        <!-- Total -->
        <div class="mt-4 flex flex-col items-center">
          <p class="text-lg font-semibold text-red-500">
            Tổng tiền: {{ formatCurrency(cartStore.totalSelectedPrice) }}
          </p>
          <button
            class="mt-4 w-1/3 rounded bg-blue-700 px-6 py-2 text-white"
            :disabled="!cartStore.selectedItems.length"
            @click="
              () => {
                goToOrderSummary();
                // router.push({ path: '/order-summary' })
              }
            "
          >
            Tiến hành đặt hàng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Imports
import { useCartStore } from "@/stores/cart";
import { ClearOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { formatCurrency } from "@/utils/currency";
// Router
const router = useRouter();

// Store
const cartStore = useCartStore();

// Data
const allSelected = ref(false);

// Methods
const goToOrderSummary = () => {
  router.push({ path: "/order-summary" });
};
</script>

<style scoped>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
