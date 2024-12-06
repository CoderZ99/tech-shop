<template>
  <!-- Container -->
  <div class="container mx-auto p-4">
    <!-- Page title -->
    <h1 class="mb-4 text-3xl font-bold">Danh sách sản phẩm</h1>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Product Card list -->
      <div
        v-for="product in pagedProducts"
        :key="product._id"
        class="grid rounded bg-white p-4 shadow"
      >
        <div class="flex min-h-56 justify-center">
          <a-image
            v-if="product?.images[0]?.url.length > 0"
            :width="200"
            :src="product.images[0].url"
            :alt="product.name"
            class="mb-4 rounded object-cover"
          />
        </div>
        <h2 class="mb-2 text-lg font-semibold leading-5">{{ product.name }}</h2>
        <!-- Price -->
        <div class="mb-0 mt-auto flex items-center justify-between self-end">
          <span class="text-base font-bold text-red-500">{{
            formatCurrency(product.price)
          }}</span>
        </div>
        <!-- Button group -->
        <div class="mt-4 flex items-center justify-between self-end">
          <!-- View details -->
          <a-tooltip placement="bottomLeft">
            <template #title>
              <span>Xem chi tiết</span>
            </template>
            <a-button
              @click="viewDetails(product)"
              type="default"
              class="flex items-center justify-center"
              block
              ><EyeOutlined
            /></a-button>
          </a-tooltip>
          <!-- Add to cart -->
          <a-tooltip placement="bottomRight">
            <template #title>
              <span>Thêm vào giỏ hàng</span>
            </template>
            <a-button
              @click="addToCart(product)"
              type="primary"
              class="ml-4 flex items-center justify-center"
              block
              ><ShoppingCartOutlined
            /></a-button>
          </a-tooltip>
        </div>
        <!-- End button group -->
      </div>
    </div>
    <!-- Pagination -->
    <div class="mt-4 flex w-full justify-center">
      <a-pagination
        v-model:current="current"
        v-model:total="total"
        v-model:page-size="pageSize"
        @change="handlePageChange"
        show-less-items
        :showSizeChanger="false"
      />
    </div>
  </div>
</template>
<script setup>
// Imports
import { useCartStore } from "@/stores/cart";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { fetchProducts } from "../../api/productService";
import CommonPagination from "../components/CommonPagination.vue";
import { formatCurrency } from "@/utils/currency";

// Data
const loading = ref(false);
const router = useRouter();
const products = reactive([]);
const currentPage = ref(1);
const cartStore = useCartStore();

const pageSize = ref(16); // Default page size is 16;
const current = ref(1); // Current page
const total = ref(0);
const pagedProducts = computed(() => products?.value || []);

// Lifecycle
onMounted(() => {
  getProducts();
  console.log(`🚀 ~ onMounted ~ products:`, products);
});

// Methods
/**
 * Retrieves products from the server and updates the local state.
 *
 * @return {Promise<void>} A promise that resolves when the products are fetched and added to the local state.
 */
const getProducts = async (page = 1, pageSize = 16) => {
  loading.value = true;
  try {
    let response = await fetchProducts(page, pageSize);
    products.value = [];
    products.value = [...response?.data?.products?.docs];
    message.success("Danh sách sản phẩm đã được tải");
    total.value = response?.data?.products?.totalDocs;
  } catch (error) {
    message.error(error);
  } finally {
    loading.value = false;
  }
};

/**
 * Handles the page change event.
 *
 * @param {number} page - The page number that has been changed.
 */
const handlePageChange = async (page) => {
  await getProducts(page);
};

const addToCart = (product) => {
  console.log(`🚀 ~ addToCart ~ product:`, product);
  const addedQuantity = 1;
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

const viewDetails = (product) => {
  // Logic to view product details
  router.push({ path: `products/${product.slug}` });
};
</script>
