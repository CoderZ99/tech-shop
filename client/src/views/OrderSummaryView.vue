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
        v-for="item in cartStore.selectedItems"
        :key="item._id"
        class="grid grid-cols-12 gap-4 items-center border-b py-4"
      >
        <div class="col-span-4 flex items-center">
          <div>
            <p>{{ item.name }}</p>
          </div>
        </div>
        <div class="col-span-3 text-end">{{ item.price }} ₫</div>
        <div class="col-span-2 text-end">
          {{ item.quantity }}
        </div>
        <div class="col-span-3 text-red-500 text-end">
          {{ item.price * item.quantity }}₫
        </div>
      </div>

      <!-- Order total -->
      <div class="flex justify-between items-center my-4">
        <div>
          <h3 class="font-semibold">Tổng cộng</h3>
        </div>
        <div>
          <p class="font-semibold text-red-500">
            {{ cartStore.totalSelectedPrice }}₫
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
              v-model:value="receiver.name"
              placeholder="Họ tên người nhận hàng"
            />
          </a-form-item>
          <a-form-item label="Số điện thoại">
            <a-input
              v-model:value="receiver.phone"
              placeholder="Xin vui lòng nhập số điện thoại của bạn"
            />
          </a-form-item>
          <a-form-item label="Địa chỉ nhận hàng">
            <a-input
              v-model:value="receiver.address"
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
      <div class="w-full min-h-36">
        <h3 class="text-lg font-semibold">Hình thức thanh toán</h3>
        <p class="text-sm mb-4">(Chọn một trong các tùy chọn bên dưới)</p>
        <div class="flex justify-center space-x-4 my-4">
          <a-card
            :class="{
              'border-4 border-sky-500 font-semibold': paymentMethod === 'cod',
            }"
            @click="paymentMethod = 'cod'"
            class="flex w-full"
          >
            <div class="flex justify-around">
              <SmileOutlined class="mr-2" />Thanh toán khi nhận hàng
            </div>
          </a-card>
          <a-card
            :class="{
              'border-4 border-sky-500 font-semibold':
                paymentMethod === 'paypal',
            }"
            @click="paymentMethod = 'paypal'"
            class="flex w-full"
          >
            <div class="flex justify-around">
              <WalletOutlined class="mr-2" />Thanh toán qua PayPal
            </div>
          </a-card>
        </div>
      </div>
      <!-- <div class="w-full">
        <div
          v-if="paymentMethod === 'paypal'"
          class="w-1/2"
        >
          <PayPalButton
            :class="{ visible: loadScriptPaypal }"
            :payAmount="convertVNDToUSD(cartStore.totalSelectedPrice)"
            @loadScript="(isLoad) => (loadScriptPaypal = isLoad)"
            @approve="(detail) => handlePayPalApprove(detail)"
            @cancel="(detail) => handlePayPalCancel(detail)"
            @error="(error) => handlePayPalError(error)"
          />
        </div>
      </div> -->
      <a-divider
        dashed
        class="h-px bg-gray-500"
      />
      <div class="w-full mx-auto flex justify-around">
        <a-button
          class="w-1/3"
          danger
          @click="() => router.push({ name: 'cart' })"
        >
          Trở về giỏ hàng
        </a-button>
        <a-button
          v-if="paymentMethod === 'cod'"
          class="w-1/3"
          type="primary"
          @click="placeOrder"
        >
          Đặt hàng</a-button
        >
        <div v-if="paymentMethod === 'paypal'">
          <PayPalButton
            :payAmount="convertVNDToUSD(cartStore.totalSelectedPrice)"
            @approve="(detail) => handlePayPalApprove(detail)"
            @cancel="(detail) => handlePayPalCancel(detail)"
            @error="(error) => handlePayPalError(error)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // Imports
  import { createOrder } from "@/api/orderService"
  import { useAuthStore } from "@/stores/auth"
  import { SmileOutlined, WalletOutlined } from "@ant-design/icons-vue"
  import { message } from "ant-design-vue"
  import { onMounted, reactive, ref } from "vue"
  import { useRouter } from "vue-router"
  import { useCartStore } from "../stores/cart"
  import { convertVNDToUSD } from "../utils/currency"
  import PayPalButton from "../views/components/PayPalButton.vue"

  // Router
  const router = useRouter()

  // Store
  const cartStore = useCartStore()
  const authStore = useAuthStore()
  // Data
  const receiver = reactive({
    name: "",
    phone: "",
    address: "",
  })
  const paymentMethod = ref("cod")

  const handlePayPalApprove = (detail) => {
    console.log(`🚀 ~ handlePayPalApprove ~ detail:`, detail)
    message.success("Thanh toán thành công")
    message.info("Đang tự cập nhật đơn hàng")
    placeOrder(true)
  }

  const handlePayPalCancel = (detail) => {
    message.warning("Đã dừng thanh toán")
  }

  const handlePayPalError = (error) => {
    console.log(`🚀 ~ handlePayPalError ~ error:`, error)
    message.error("Có lỗi xảy ra, vui lòng kiểm tra số dư, hoặc thử lại sau")
  }
  // Methods
  const placeOrder = (isPaid = false) => {
    if (!authStore.user) {
      router.push({ name: "login" })
      return
    }
    if (paymentMethod.value === "") {
      message.warning("Vui lý chọn phương thức thanh toán")
      return
    }

    if (receiver.name === "") {
      message.warning("Vui lý nhập tên người nhận đơn")
      return
    }

    if (receiver.phone === "") {
      message.warning("Vui lý nhập sđt người nhân đơn")
      return
    }

    if (receiver.address === "") {
      message.warning("Vui lý nhập địa chỉ nhận đơn")
      return
    }

    console.log(`🚀 ~ placeOrder ~ receiver:`, receiver)
    let orderItems = cartStore.selectedItems.map((item) => {
      return {
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }
    })
    const orderDetails = {
      username: authStore.user.username,
      orderItems: orderItems,
      receiver: {
        name: receiver.name,
        phone: receiver.phone,
        address: receiver.address,
      },
      paymentMethod: paymentMethod.value,
      totalPrice: cartStore.totalSelectedPrice,
      isPaid: false,
      paidAt: null,
    }

    const orderRes = createOrder(orderDetails)

    if (orderRes) {
      message.success("Đặt hàng thành công")
      cartStore.clearSelectedItems()
      router.push({ name: "cart" })
    } else {
      message.error("Đặt hàng thất bại")
    }
  }

  onMounted(() => {
    if (cartStore.selectedItems.length === 0) {
      router.push({ name: "cart" })
    }
  })
</script>

<style scoped></style>
