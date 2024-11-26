<template>
  <div class="container mx-auto">
    <div class="mx-auto max-w-screen-lg py-8">
      <!-- Page title -->
      <div class="mb-4 flex items-baseline">
        <h2 class="text-2xl font-semibold">
          {{ product.category }}
        </h2>
      </div>
      <!-- Product info -->
      <div class="rounded-lg border bg-white p-4 shadow">
        <div class="flex flex-wrap place-content-center">
          <!-- Product image -->
          <div class="w-full md:w-2/5">
            <ProductImageCarousel :images="product.images" />
          </div>
          <!-- Product info -->
          <div class="w-full md:w-1/2 md:pl-8">
            <!-- Product name -->
            <h1 class="text-2xl font-semibold">{{ product.name }}</h1>
            <!-- Product rating -->
            <div class="mt-2 flex flex-row items-baseline">
              <!-- Rating -->
              <div class="mr-1 font-semibold">
                {{ product.rating }}
              </div>
              <a-rate
                class="flex"
                v-model:value="product.rating"
                allow-half
                disabled
              />
              <a-divider class="mt-1 text-gray-500" type="vertical" />
              <!-- Number of reviews -->
              <div class="ml-2 text-sm text-gray-500">
                {{ product.numReviews }} đánh giá
              </div>
            </div>
            <!-- Product price -->
            <div
              class="mt-3 rounded-lg border border-[#fde68a] bg-gradient-to-b from-[#fffbeb] to-white p-4"
            >
              <div class="text-sm text-gray-500">Mua ngay với giá:</div>
              <div class="text-3xl font-semibold text-red-500">
                {{ formatCurrency(product.price) }}
              </div>
              <a-divider />
              <div class="flex items-center">
                <SafetyCertificateTwoTone
                  style="font-size: 20px; color: blue; margin-right: 5px"
                />
                <p>Cam kết hàng chính hãng 100%</p>
              </div>
              <div class="mt-2 flex items-center">
                <PhoneTwoTone
                  style="font-size: 20px; color: blue; margin-right: 5px"
                />
                <span>
                  Gọi đặt mua:
                  <a class="font-bold text-blue-500" href="tel:1900123456"
                    >1900 123 456</a
                  >
                  (8:00 - 21:30)
                </span>
              </div>
            </div>
            <!-- Product brand -->
            <div class="mt-2 flex items-center">
              <p>Thương hiệu:&nbsp;</p>
              <a class="text-blue-500" href="javascript:void(0)">{{
                product.brand
              }}</a>
            </div>
            <!-- Product sold -->
            <div class="mt-2 flex items-center text-gray-500">
              <p>Đã bán: {{ product.sold }}</p>
            </div>
            <a-divider dotted />
            <div class="mt-4 flex w-full gap-4">
              <div class="w-1/2">
                <a-button
                  block
                  class="flex items-center justify-center border-blue-500 text-blue-500"
                  size="large"
                  :disabled="product.stock === 0"
                  @click="addToCart(product, 1)"
                >
                  <ShoppingCartOutlined style="font-size: 20px" />Thêm vào giỏ
                </a-button>
              </div>
              <div class="w-1/2">
                <a-button
                  block
                  danger
                  type="primary"
                  size="large"
                  :disabled="product.stock === 0"
                  @click="buyNow"
                >
                  Mua ngay
                </a-button>
              </div>
            </div>
            <!-- <div class="w-full flex gap-6 mt-4">
              <div class="w-1/4">
                <a-button
                  block
                  :disabled="product.stock === 0"
                  class="text-white bg-blue-400"
                  @click="() => router.go(-1)"
                >
                  Quay lại
                </a-button>
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <ShoppingAssurance />
      <div class="mt-8 w-3/5 rounded bg-white p-4 shadow-md">
        <a-descriptions title="Mô tả">
          <a-descriptions-item>
            {{ product.description }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <h2 class="my-4 text-xl font-semibold">Đánh giá</h2>
      <div v-if="product && product?.reviews?.length > 0">
        <CustomerReviews :reviews="product.reviews" />
      </div>
      <div v-else>
        <a-empty
          class="mb-4 w-1/2 rounded border p-4"
          description="Chưa có đánh giá nào"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// Imports
import CustomerReviews from "../components/CustomerReviews.vue";
import { useCartStore } from "@/stores/cart";
import { message } from "ant-design-vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getProductByDetailUrl } from "../../api/productService";
import ShoppingAssurance from "../components/ShoppingAssurance.vue";
import { formatCurrency } from "@/utils/currency";
import ProductImageCarousel from "./ProductImageCarousel.vue";
import { SafetyCertificateTwoTone, PhoneTwoTone } from "@ant-design/icons-vue";
import { ShoppingCartOutlined } from "@ant-design/icons-vue";
// Store
const cartStore = useCartStore();
// Router
const router = useRouter();

// Props
const props = defineProps({
  detailUrl: String,
});

// Data
const product = ref({});

const selectedImage = ref("");

// Method
const getProductDetail = async () => {
  try {
    const response = await getProductByDetailUrl(props.detailUrl);
    if (!response.data) {
      router.push({ name: "not-found" });
    }
    console.log(`🚀 ~ getProductDetail ~ response:`, response);
    product.value = { ...response.data };
  } catch (error) {
    message.error("Failed to fetch products:", error);
  }
};

/**
 * Adds a product to the cart.
 *
 * @param {Object} product - The product to be added.
 * @param {number} [addedQuantity=1] - The quantity of the product to be added. Defaults to 1.
 * @return {void} This function does not return anything.
 */
const addToCart = (product, addedQuantity = 1) => {
  console.log(`🚀 ~ addToCart ~ product:`, product);
  // Logic to add product to cart
  try {
    if (product.stock === 0) {
      message.error("Hết hàng");
    }
    let result = cartStore.addItem(product, addedQuantity);
    console.log(`🚀 ~ addToCart ~ result:`, result);
    switch (result) {
      case -1:
        message.error("Không thể thêm nhiều hơn");
        break;
      case 1:
        message.success("Đã cập nhật số sản phẩm trong giỏ hàng");
        break;
      case 0:
        message.success("Sản phẩm đã được thêm vào giỏ hàng");
        break;
    }
  } catch (error) {
    console.log(`🚀 ~ addToCart ~ error:`, error);
    message.error(error);
  }
};

/**
 * Adds 1 product to cart and redirects to cart.
 *
 * @return {void} This function does not return anything.
 */

const buyNow = () => {
  // Add 1 product to cart and redirect to cart
  addToCart(product, 1);
  router.push({ name: "cart" });
};

// Lifecycle
onMounted(() => {
  // Get product detail on mount
  getProductDetail();
  console.log(product);
});
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

#quantity {
  text-align: center !important;
}
</style>
