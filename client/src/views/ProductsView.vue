<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Danh sách sản phẩm</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="product in currentProducts"
        :key="product.id"
        class="bg-white rounded shadow p-4 grid"
      >
        <div class="flex justify-center">
          <a-image
            :width="200"
            :src="`${'/src/assets/products/' + product.imageUrl}`"
            :alt="product.name"
            class="object-cover mb-4 rounded"
          />
        </div>
        <h2 class="text-base font-semibold mb-2">{{ product.name }}</h2>
        <p class="text-sm text-gray-700">{{ product.description }}</p>
        <div class="mb-0 mt-auto flex justify-between items-center self-end">
          <span class="text-base font-bold text-red-500">{{
            product.price
          }}</span>
        </div>
        <div class="flex justify-between items-center mt-4 self-end">
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
      </div>
    </div>
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
  import { fetchProducts } from "../api/productService"
  import CommonPagination from "../views/components/CommonPagination.vue"
  // Data
  const products = reactive([])
  const pageSize = 15
  const currentPage = ref(1)
  const cartStore = useCartStore()
  const currentProducts = computed(() => {
    // Logic to paginate products
    const startIndex = (currentPage.value - 1) * pageSize
    const endIndex = startIndex + pageSize
    return products.slice(startIndex, endIndex)
  })

  // Lifecycle
  onMounted(() => {
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

  function updateQuantityIfItemExists(list, item) {
    // Kiểm tra xem item có trong list hay không dựa trên id
    const existingItem = list.find(
      (existingItem) => existingItem._id === item._id
    )

    if (existingItem) {
      // Nếu item thêm vào list nhiều hơn stock
      if (existingItem.quantity + 1 > existingItem.stock) {
        message.error("Không thể thêm nhiều hơn")
        return
      }
      // Nếu item đã tồn tại trong list, cập nhật giá trị quantity của item
      existingItem.quantity += 1
      console.log(`Updated quantity: ${list}`)
      message.success("Đã cập nhật số lượng sản phẩm trong giỏ hàng")
    } else {
      // Nếu item không tồn tại trong list, thêm nó vào list
      list.push({ ...item, selected: false, quantity: 1 })
      console.log(`Added new item ${list}`)
      message.success("Sản phẩm đã được thêm vào giỏ hàng")
    }
    return list
  }
  const addToCart = (product) => {
    try {
      if (product.stock === 0) {
        message.error("Hết hàng")
      }
      updateQuantityIfItemExists(cartStore.cartItems, product)

      console.log(`🚀 ~ addToCart ~ cartStore.cartItems:`, cartStore.cartItems)
    } catch (error) {
      console.log(`🚀 ~ addToCart ~ error:`, error)
    }
  }
  const viewDetails = (product) => {
    // Logic to view product details
  }
</script>

<style scoped>
  /* Custom styles can go here */
</style>
