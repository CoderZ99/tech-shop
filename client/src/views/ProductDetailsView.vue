<template>
  <div class="container mx-auto py-8">
    <div class="max-w-screen-lg mx-auto">
      <div class="flex items-baseline">
        <h1 class="text-2xl font-semibold">
          {{ product.category }} {{ product.name }}
        </h1>
        <div class="ml-4">
          <a-rate
            :value="product.rating"
            allow-half
            disabled
          />
        </div>
        <h2 class="ml-2">({{ product.numReviews }} đánh giá)</h2>
      </div>
      <div class="flex flex-wrap items-center mt-8">
        <div class="w-full md:w-2/5">
          <img
            :src="`${'/src/assets/products/' + product.imageUrl}`"
            :alt="product.name"
            class="w-full"
          />
        </div>
        <div class="w-full md:w-1/2 md:pl-8">
          <p class="text-lg font-semibold mb-2">Chi tiết:</p>
          <p>{{ product.description }}</p>
          <p class="text-lg font-semibold mt-4">{{ product.price }} ₫</p>

          <div class="flex items-center mt-2 text-gray-500">
            <p>
              Còn:
              <span :class="{ 'text-gray-500': product.stock === 0 }">{{
                product.stock
              }}</span>
            </p>
            <span class="mx-2">|</span>
            <p>Đã bán: {{ product.sold }}</p>
          </div>
          <div class="flex items-center mt-4">
            <p class="mr-4">Số lượng:</p>
            <a-input-number
              v-model:value="quantity"
              min="1"
              :max="product.stock"
              class="w-16 px-2 border rounded"
            />
          </div>
          <div class="w-full flex gap-6 mt-4">
            <div class="w-1/4">
              <a-button
                block
                @click="() => router.go(-1)"
              >
                Trở lại
              </a-button>
            </div>
            <div class="w-1/4">
              <a-button
                block
                :disabled="product.stock === 0"
                class="bg-blue-500 text-white"
                @click="addToCart(product, quantity)"
              >
                Thêm vào giỏ
              </a-button>
            </div>
          </div>
        </div>
      </div>
      <ShoppingAssurance />
      <h2 class="text-xl font-semibold my-4">Customer Reviews</h2>
      <div v-if="product && product?.reviews?.length > 0">
        <CustomerReviews :reviews="product.reviews" />
      </div>
      <div v-else>
        <a-empty
          class="mb-4 p-4 border rounded w-3/4"
          description="Chưa có đánh giá nào"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  // Imports
  // import { message } from "ant-design-vue";
  // import { onMounted, ref } from "vue";
  // import { useRouter } from "vue-router";
  // import { getProductByDetailUrl } from "../api/productService";
  // import CustomerReviews from "./components/CustomerReviews.vue";
  // import ShoppingAssurance from "./components/ShoppingAssurance.vue";
  import { useCartStore } from "@/stores/cart"
  import { message } from "ant-design-vue"
  import { onMounted, ref } from "vue"
  import { useRouter } from "vue-router"
  import { getProductByDetailUrl } from "../api/productService"
  import CustomerReviews from "./components/CustomerReviews.vue"
  import ShoppingAssurance from "./components/ShoppingAssurance.vue"

  // Store
  const cartStore = useCartStore()
  // Router
  const router = useRouter()

  // Props
  const props = defineProps({
    detailUrl: String,
  })

  // Data
  const product = ref({})

  const quantity = ref(1)

  // Method
  const getProductDetail = async () => {
    try {
      const response = await getProductByDetailUrl(props.detailUrl)
      if (!response.data) {
        router.push({ name: "not-found" })
      }
      console.log(`🚀 ~ getProductDetail ~ response:`, response)
      product.value = { ...response.data }
    } catch (error) {
      message.error("Failed to fetch products:", error)
    }
  }

  /**
   * Adds a product to the cart.
   *
   * @param {Object} product - The product to be added.
   * @param {number} [addedQuantity=1] - The quantity of the product to be added. Defaults to 1.
   * @return {void} This function does not return anything.
   */
  const addToCart = (product, addedQuantity = 1) => {
    console.log(`🚀 ~ addToCart ~ product:`, product)
    // Logic to add product to cart
    try {
      if (product.stock === 0) {
        message.error("Hết hàng")
      }
      let result = cartStore.addItem(product, addedQuantity)
      console.log(`🚀 ~ addToCart ~ result:`, result)
      switch (result) {
        case -1:
          message.error("Không thể thêm nhiều hơn")
          break
        case 1:
          message.success("Đã cập nhật số sản phẩm trong giỏ hàng")
          break
        case 0:
          message.success("Sản phẩm đã được thêm vào giỏ hàng")
          break
      }
    } catch (error) {
      console.log(`🚀 ~ addToCart ~ error:`, error)
      message.error(error)
    }
  }
  // Lifecycle
  onMounted(() => {
    getProductDetail()
    console.log(product)
  })
</script>

<style scoped>
  .star {
    cursor: pointer;
    font-size: 1.5rem;
  }

  .active {
    color: #ffd700; /* Màu vàng */
  }

  .text-gray-500 {
    opacity: 0.5; /* Màu xám mờ */
  }
</style>
