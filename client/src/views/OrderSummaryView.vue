<!-- OrderSummary.vue (Vue Component) -->
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h2 class="text-center text-2xl font-semibold mb-4">Chi tiết đặt hàng</h2>
    <div class="bg-white p-6 rounded shadow-md mx-auto my-0 w-3/5">
      <!-- List Header -->
      <div class="grid grid-cols-12 gap-4 border-b pb-4 mb-4 text-gray-700">
        <div class="col-span-4">Tên sản phẩm</div>
        <div class="col-span-3 text-end">Đơn giá</div>
        <div class="col-span-2 text-end">SL</div>
        <div class="col-span-3 text-end">Thành tiền</div>
      </div>

      <!-- Display the list of selected products -->
      <div
        v-for="item in cartStore.getSelectedItems"
        :key="item.id"
        class="grid grid-cols-12 gap-4 items-center border-b py-4"
      >
        <div class="col-span-4 flex items-center">
          <div>
            <p>{{ item.name }}</p>
          </div>
        </div>
        <div class="col-span-3 text-end">
          {{ item.price.toLocaleString() }}₫
        </div>
        <div class="col-span-2 text-end">
          {{ item.quantity }}
        </div>
        <div class="col-span-3 text-red-500 text-end">
          {{ (item.price * item.quantity).toLocaleString() }}₫
        </div>
      </div>

      <!-- Order total -->
      <div class="flex justify-between items-center my-4">
        <div>
          <h3 class="font-semibold">Tổng cộng</h3>
        </div>
        <div>
          <p class="font-semibold text-red-500">
            {{ cartStore.getCartTotal.toLocaleString() }}₫
          </p>
        </div>
      </div>
      <a-divider
        dashed
        class="h-px bg-gray-500"
      />
      <!-- Shipping information -->
      <div>
        <h3 class="text-lg font-semibold">Thông tin giao hàng</h3>
        <a-form
          layout="vertical"
          class="mt-4"
        >
          <a-form-item label="Họ và tên">
            <a-input
              v-model="userStore.getUsername"
              placeholder="Họ tên người nhận hàng"
            />
          </a-form-item>
          <a-form-item label="Số điện thoại">
            <a-input
              v-model="userStore.getPhone"
              placeholder="Xin vui lòng nhập số điện thoại của bạn"
            />
          </a-form-item>
          <a-form-item label="Địa chỉ nhận hàng">
            <a-input
              v-model="userStore.getAddress"
              placeholder="Vui lòng nhập địa chỉ của bạn"
            />
          </a-form-item>
        </a-form>
      </div>
      <a-divider
        dashed
        class="h-px bg-gray-500"
      />
      <!-- Payment method -->
      <div class="payment-method">
        <h3 class="text-lg font-semibold">Chọn thức thanh toán</h3>
        <a-radio-group
          v-model:value="paymentMethod"
          class="flex flex-col mt-4"
        >
          <a-radio value="cod">Thanh toán khi giao</a-radio>
          <a-radio
            value="paypal"
            :disabled="true"
            >Thanh toán paypal</a-radio
          >
        </a-radio-group>
      </div>

      <a-divider
        dashed
        class="h-px bg-gray-500"
      />
      <div class="flex w-full">
        <!-- Return to cart button -->
        <div class="mx-auto mt-4">
          <a-button danger> Trở về giỏ hàng </a-button>
        </div>
        <!-- Place order button -->
        <div class="mx-auto mt-4">
          <a-button
            id="button-icon"
            type="primary"
            @click="placeOrder"
            >Xác nhận đặt hàng</a-button
          >
        </div>
        <!-- Payment button -->
        <PayPalButton :payAmount="convertVNDToUSD(cartStore.getCartTotal)" />
      </div>
    </div>
  </div>
</template>

<script setup>
  // Imports
  import { convertVNDToUSD } from "@/utils/currency"
  import { ref } from "vue"
  import { useCartStore } from "../stores/cart"
  import { useUserStore } from "../stores/user"
  import PayPalButton from "./components/PayPalButton.vue"
  // Store
  // Data
  const cartStore = useCartStore()
  const userStore = useUserStore()
  const paymentMethod = ref("cod")
  // Methods
  const placeOrder = () => {
    // TODO: Call API to place order
    console.log("Place order")
  }
</script>

<style scoped></style>
