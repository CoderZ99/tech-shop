<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h2 class="text-center text-2xl font-semibold mb-4">Giỏ Hàng</h2>
    <div class="flex flex-col items-center">
      <div class="w-4/5 bg-white p-6 rounded shadow-md mr-4">
        <!-- Grid Header -->
        <div class="grid grid-cols-12 gap-4 border-b pb-4 text-gray-700">
          <div class="col-span-1 mx-auto my-auto">
            <a-checkbox
              @change="selectAllItems"
              v-model:checked="allSelected"
            />
          </div>
          <div class="col-span-4">
            <p class="text-lg font-semibold">
              Tất cả ({{ cartItems.length }} sản phẩm)
            </p>
          </div>
          <div class="col-span-2">Đơn giá</div>
          <div class="col-span-2">Số lượng</div>
          <div class="col-span-2">Thành tiền</div>
          <div class="col-span-1">
            <button
              @click="removeAllItems"
              class="px-4 py-2 bg-red-500 text-white rounded"
            >
              <ClearOutlined class="inline-flex" />
            </button>
          </div>
        </div>

        <!-- Cart Items List -->
        <div
          v-for="(item, index) in cartItems"
          :key="item._id"
          class="grid grid-cols-12 gap-4 items-center border-b py-4"
        >
          <div class="col-span-1 mx-auto my-0">
            <a-checkbox
              v-model:checked="item.selected"
              @change="calculateTotal"
            />
          </div>
          <div class="col-span-4 flex items-center">
            <a-image
              :width="50"
              :src="`${'/src/assets/products/' + item.imageUrl}`"
              alt="product"
              class="w-16 h-16 object-cover mr-4"
              :preview="false"
            />
            <div>
              <p class="font-semibold">{{ item.name }}</p>
            </div>
          </div>
          <div class="col-span-2 text-end">
            {{ item.price.toLocaleString() }}
          </div>
          <div class="col-span-2 flex items-center">
            <div class="flex flex-col items-center">
              <div class="flex items-center">
                <a-button
                  @click="updateQuantity(item, item.quantity - 1)"
                  :disabled="item.quantity === 1"
                  class="px-2 py-0 bg-gray-200 rounded"
                >
                  &#x2D;
                </a-button>
                <span class="min-w-5 mx-2">{{ item.quantity }}</span>
                <a-button
                  @click="updateQuantity(item, item.quantity + 1)"
                  :disabled="item.quantity === item.stock"
                  class="px-2 py-0 bg-gray-200 rounded"
                >
                  &#x2B;
                </a-button>
              </div>
              <div class="text-xs text-orange-500 mt-2">
                Còn {{ item.stock }} sản phẩm
              </div>
            </div>
          </div>
          <div class="col-span-2 text-red-500 text-end">
            {{ (item.price * item.quantity).toLocaleString() }}
          </div>
          <div class="col-span-1">
            <button
              @click="removeItem(item)"
              class="px-4 py-2 bg-red-500 text-white rounded"
            >
              <ClearOutlined class="inline-flex" />
            </button>
          </div>
        </div>
        <a-empty v-if="cartItems.length === 0">
          <template #description>
            <span>Giỏ hàng trống</span>
          </template>
          <a-divider />
        </a-empty>
        <!-- Total -->
        <div class="mt-4 flex flex-col items-center">
          <p class="text-lg font-semibold text-red-500">
            Tổng tiền: {{ totalPrice.toLocaleString() }}₫
          </p>
          <button
            class="mt-4 w-1/3 px-6 py-2 bg-blue-700 text-white rounded"
            :disabled="!selectedItems.length"
            @click="
              () => {
                goToOrderSummary()
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
  import { useCartStore } from "@/stores/cart"
  import { ClearOutlined } from "@ant-design/icons-vue"
  import { computed, reactive, ref, watch } from "vue"
  import { useRouter } from "vue-router"

  // Router
  const router = useRouter()

  // Store
  const cartStore = useCartStore()

  // Data
  const totalPrice = ref(0)
  const cartItems = reactive(cartStore.getCartItems)
  const allSelected = ref(false)

  // Computed values
  const selectedItems = computed(() =>
    cartItems.filter((item) => item.selected)
  )
  // Methods
  const updateQuantity = (item, quantity) => {
    if (quantity > 0 && quantity <= item.stock) {
      const cartItem = cartItems.find((cartItem) => cartItem._id === item._id)
      cartItem.quantity = quantity
      calculateTotal()
    }
  }

  const removeItem = (item) => {
    const index = cartItems.findIndex((cartItem) => cartItem._id === item._id)
    if (index > -1) {
      cartItems.splice(index, 1)
      calculateTotal()
    }
  }

  const removeAllItems = () => {
    cartItems.splice(0, cartItems.length)
    calculateTotal()
  }

  const selectAllItems = () => {
    cartItems.forEach((item) => (item.selected = allSelected.value))
    calculateTotal()
  }

  const calculateTotal = () => {
    totalPrice.value = cartItems.reduce((sum, item) => {
      return item.selected ? sum + item.price * item.quantity : sum
    }, 0)
  }

  // Watchers
  watch(cartItems, calculateTotal, { deep: true })

  const goToOrderSummary = () => {
    // // Update cart items selected status
    // cartStore.updateCartItems(cartItems)
    // // Update cart total
    // cartStore.updateCartTotal(totalPrice.value)
    // // Navigate to order summary
    // router.push({ path: "/order-summary" })
  }
</script>

<style scoped>
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
