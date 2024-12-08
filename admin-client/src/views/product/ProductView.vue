<template>
  <div v-if="router.currentRoute.value.name === 'product'">
    <div class="w-full flex mb-4">
      <div class="text-2xl font-semibold">Quản lý sản phẩm</div>

      <a-button
        class="ml-auto mr-4"
        :disabled="loading"
        @click="router.push({ name: 'add-product' })"
        >Thêm sản phẩm</a-button
      >
      <a-button
        @click="getProducts(page, pageSize)"
        :disabled="loading"
        type="primary"
      >
        Tải lại dữ liệu
      </a-button>
    </div>
    <!-- Filter, Search, Sort -->
    <div class="flex justify-center gap-3">
      <!-- Search -->
      <div class="mb-4 flex w-[40%] items-center">
        <a-input-search
          class="flex items-center"
          :allowClear="true"
          v-model:value="query.search"
          placeholder="Nhập tên sản phẩm cần tìm..."
          @search="handleQueryChange"
        >
          <template #enterButton>
            <div class="flex items-center">
              <SearchOutlined />
            </div>
          </template>
        </a-input-search>
      </div>
      <!-- Filter brand -->
      <div class="mb-4 flex items-center">
        <div class="mr-2 text-gray-500">Chọn theo hãng</div>
        <a-select
          v-model:value="query.brand"
          placeholder="Hãng"
          style="width: 130px"
          @change="handleQueryChange"
        >
          <a-select-option value="">Tất cả</a-select-option>
          <a-select-option value="Apple">Apple</a-select-option>
          <a-select-option value="Samsung">Samsung</a-select-option>
          <a-select-option value="Xiaomi">Xiaomi</a-select-option>
          <a-select-option value="Vivo">Vivo</a-select-option>
          <a-select-option value="Nokia">Nokia</a-select-option>
          <a-select-option value="Realme">Realme</a-select-option>
        </a-select>
      </div>
      <!-- Sort -->
      <div class="mb-4 flex items-center">
        <div class="mr-2 text-gray-500">Sắp xếp</div>
        <a-select
          v-model:value="query.sort"
          placeholder="Sắp xếp"
          style="width: 175px"
          @change="handleQueryChange"
        >
          <a-select-option value="createdAt:desc">Hàng mới</a-select-option>
          <a-select-option value="sold:desc">Bán chạy</a-select-option>
          <a-select-option value="price:asc">Giá thấp đến cao</a-select-option>
          <a-select-option value="price:desc">Giá cao đến thấp</a-select-option>
        </a-select>
      </div>
    </div>
    <!-- Products Table -->
    <a-table
      :data-source="pagedProducts"
      rowKey="_id"
      bordered
      :loading="loading"
      :pagination="paginationConfig"
      @change="handleTableChange"
    >
      <!-- Products Name Column -->
      <a-table-column
        key="name"
        title="Tên sản phẩm"
        dataIndex="name"
        ellipsis
        :maxWidth="500"
      />
      <!-- Products Image Column -->
      <a-table-column
        align="center"
        title="Hình ảnh"
        dataIndex="images"
      >
        <template #default="{ text: images }">
          <!-- <div>{{ images[0]?.url || "no image" }}</div> -->
          <a-image
            :src="images[0]?.url"
            style="width: 50px; height: auto"
          />
        </template>
      </a-table-column>
      <!-- Products Brand Column -->
      <a-table-column
        align="center"
        key="brand"
        title="Hãng"
        dataIndex="brand"
      />
      <!-- Products Price Column -->
      <a-table-column
        align="center"
        key="price"
        title="Giá"
        dataIndex="price"
      />
      <!-- Products Category Column -->
      <a-table-column
        align="center"
        key="category"
        title="Danh mục"
        dataIndex="category"
      />
      <!-- Products Action Column -->
      <a-table-column
        key="action"
        title="Hành động"
        align="center"
      >
        <template #default="{ record }">
          <a-space>
            <!-- View product button -->
            <!-- <a-button
              type="primary"
              @click="
                () => {
                  console.log(`🚀 ~ viewProduct ~ product:`, record)
                }
              "
              >Chi tiết</a-button
            > -->
            <!-- Edit product button -->
            <a-button
              type="primary"
              @click="
                () => {
                  productStore.setSelectedProduct(record)
                  router.push({
                    name: 'edit-product',
                    params: { id: record._id },
                  })
                }
              "
              >Sửa</a-button
            >
            <!-- Delete product button -->
            <a-button
              class="ml-2"
              type="primary"
              danger
              @click="handleDeleteProduct(record)"
              >Xóa</a-button
            >
          </a-space>
        </template>
      </a-table-column>
    </a-table>
  </div>
  <router-view />
</template>
<script setup>
  import {
    EyeOutlined,
    ShoppingCartOutlined,
    SearchOutlined,
  } from "@ant-design/icons-vue"
  import { deleteProduct, fetchProducts } from "@/api/productService"
  import { Modal, message } from "ant-design-vue"
  import { onMounted, ref, watch, computed } from "vue"
  import { useRouter } from "vue-router"
  import { useProductStore } from "../../stores/productStore"

  const router = useRouter()
  const productStore = useProductStore()
  // Data
  const products = ref([])
  const loading = ref(false)
  const paginationConfig = ref({
    current: 1,
    pageSize: 5,
    total: 0,
    showSizeChanger: false,
  })

  // State for query
  const query = ref({
    search: "",
    category: null,
    minPrice: null,
    maxPrice: null,
    rating: null,
    sort: "createdAt:desc",
    page: 1,
    limit: 16,
  })

  const page = computed(() => paginationConfig.value.current || 1)
  const pageSize = computed(() => paginationConfig.value.pageSize || 5)
  const pagedProducts = computed(() => products?.value || [])
  // Methods
  const getProducts = async (query = { page: 1, limit: 16 }) => {
    loading.value = true
    try {
      let response = await fetchProducts(query)
      if (response?.data?.products?.docs.length === 0 && page > 1) {
        // Gọi API tải dữ liệu trang trước
        console.log(
          `(1)get products again ~ page: ${page}, pageSize: ${pageSize}`
        )
        paginationConfig.value.current -= 1
        response = await fetchProducts(paginationConfig.value.current, pageSize)
        products.value = []
        products.value = [...response?.data?.products?.docs]
      } else {
        products.value = []
        products.value = [...response?.data?.products?.docs]
        // message.success("Danh sách sản phẩm đã được tải")
      }
      paginationConfig.value.total = response.data.products.totalDocs
    } catch (error) {
      message.error(error)
    } finally {
      loading.value = false
    }
  }

  const handleQueryChange = async () => {
    await getProducts(query.value)
  }

  const handleTableChange = async (pagination) => {
    paginationConfig.value = pagination
    await getProducts(page.value, pageSize.value)
  }

  /**
   * Handles the deletion of a product. Displays a confirmation modal to the user and deletes the product if confirmed.
   *
   * @param {Object} product - The product to be deleted.
   * @return {void}
   */
  const handleDeleteProduct = (product) => {
    Modal.confirm({
      title: "Xóa sản phẩm",
      content: `Bạn có chắc chắn muốn xóa sản phẩm: ${product.name}?`,
      onOk: async () => {
        try {
          product.isDeleted = true
          await deleteProduct(product._id)
          message.success("Sản phẩm đã được xóa")
        } catch (error) {
          message.error("Có lỗi xảy ra khi xóa sản phẩm")
        } finally {
          await getProducts(page.value, pageSize.value)
        }
      },
    })
  }

  // Get data when init
  onMounted(() => {
    getProducts()
  })

  // When from child component page back
  const computedRouteName = computed(() => router.currentRoute.value.name)
  watch(
    () => computedRouteName.value === "product",
    () => getProducts(page.value, pageSize.value)
  )
</script>
