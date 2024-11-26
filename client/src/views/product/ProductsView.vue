<template>
  <!-- Container -->
  <div class="container mx-auto p-4">
    <!-- Page title -->
    <h1 class="text-3xl font-bold mb-4">Danh sách sản phẩm</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Product Card list -->
      <div
        v-for="product in currentProducts"
        :key="product.id"
        class="bg-white rounded shadow p-4 grid"
      >
        <div class="flex justify-center min-h-56">
          <a-image
            v-if="product?.images[0]?.url.length > 0"
            :width="200"
            :src="product.images[0].url"
            :alt="product.name"
            class="object-cover mb-4 rounded"
          />
        </div>
        <h2 class="text-lg font-semibold leading-5 mb-2">{{ product.name }}</h2>
        <!-- Price -->
        <div class="mb-0 mt-auto flex justify-between items-center self-end">
          <span class="text-base font-bold text-red-500">{{
            formatCurrency(product.price)
          }}</span>
        </div>
        <!-- Button group -->
        <div class="flex justify-between items-center mt-4 self-end">
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
              shape="round"
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
              class="flex items-center justify-center ml-4"
              block
              shape="round"
              ><ShoppingCartOutlined
            /></a-button>
          </a-tooltip>
        </div>
        <!-- End button group -->
      </div>
    </div>
    <!-- Pagination -->
    <div class="w-full flex justify-center mt-4">
      <CommonPagination
        v-if="currentProducts.length > 0"
        :current="currentPage"
        :total="products.length"
        :page-size="pageSize"
        @change="handlePageChange"
        show-less-items
      />
    </div>
  </div>
</template>
<script setup>
  // Imports
  import { useCartStore } from "@/stores/cart"
  import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons-vue"
  import { message } from "ant-design-vue"
  import { computed, onMounted, reactive, ref } from "vue"
  import { useRouter } from "vue-router"
  import { fetchProducts } from "../../api/productService"
  import CommonPagination from "../components/CommonPagination.vue"
  import { formatCurrency } from "@/utils/currency"

  // Data
  const router = useRouter()
  const products = reactive([])
  const pageSize = 16
  const currentPage = ref(1)
  const cartStore = useCartStore()

  // Computed
  const currentProducts = computed(() => {
    // Logic to paginate products
    const startIndex = (currentPage.value - 1) * pageSize
    const endIndex = startIndex + pageSize
    return products.slice(startIndex, endIndex)
  })

  let options1 = reactive([
    {
      value: "jack",
      label: "Jack",
    },
    {
      value: "lucy",
      label: "Lucy",
    },
  ])
  let options2 = reactive([
    {
      value: "lucy",
      label: "Lucy",
    },
  ])
  const value1 = ref("All")
  const value2 = ref("All")

  // Lifecycle
  onMounted(() => {
    options1 = [{ value: "All", label: "Tất cả" }, ...options1]
    options2 = [{ value: "All", label: "Tất cả" }, ...options2]
    getProducts()
    console.log(`🚀 ~ onMounted ~ products:`, products)
  })

  // Methods
  const handlePageChange = (page) => {
    currentPage.value = page
  }

  /**
   * Retrieves products from the server and updates the local state.
   *
   * @return {Promise<void>} A promise that resolves when the products are fetched and added to the local state.
   */
  const getProducts = async () => {
    try {
      const response = await fetchProducts()
      let data = response.data.products
      console.log(`🚀 ~ getProducts ~ data:`, data)

      products.push(...data)
    } catch (error) {
      message.error("Failed to fetch products:", error)
    }
  }

  const addToCart = (product) => {
    console.log(`🚀 ~ addToCart ~ product:`, product)
    const addedQuantity = 1
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
  const viewDetails = (product) => {
    // Logic to view product details
    router.push({ path: `products/${product.slug}` })
  }
</script>

<style scoped>
  .filter-list:focus .filter-icon {
    transform: rotate(180deg);
  }
  /* Custom styles can go here */
</style>
