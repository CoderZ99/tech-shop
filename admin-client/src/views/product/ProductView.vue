<template>
  <div v-if="router.currentRoute.value.name === 'product'">
    <div class="w-full flex mb-4">
      <div class="text-2xl font-semibold">Quản lý sản phẩm</div>

      <a-button
        class="ml-auto mr-4"
        :disabled="loading"
        @click="goToAddProductPage"
        >Thêm sản phẩm</a-button
      >
      <a-button
        @click="getAllProducts"
        :disabled="loading"
        type="primary"
      >
        Tải lại dữ liệu
      </a-button>
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
            <a-button
              type="primary"
              @click="() => viewProduct(record)"
              >Chi tiết</a-button
            >
            <a-button
              type="primary"
              @click="editProduct(record)"
              >Sửa</a-button
            >
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

    <ProductModal
      ref="productModalRef"
      :isEditMode="isEditMode"
      :visible="isModalVisible"
      :productData="selectedProduct"
      @update:visible="handleModalClose"
      @updateDetails="handleUpdateProduct"
    />
  </div>
  <router-view />
</template>
<script setup>
  import {
    deleteProduct,
    fetchProducts,
    updateProduct,
  } from "@/api/productService"

  import { uploadProductImage } from "@/api/cloudinaryService"
  import { Modal, message } from "ant-design-vue"
  import { onMounted, ref } from "vue"
  import { useRouter } from "vue-router"
  import ProductModal from "../components/ProductModal.vue"

  const router = useRouter()
  // Data
  const isEditMode = ref(false)
  const products = ref([])
  const pagedProducts = ref([])
  const loading = ref(false)
  const isModalVisible = ref(false)
  const selectedProduct = ref({})
  const productModalRef = ref(null)
  const paginationConfig = ref({
    current: 1,
    pageSize: 5,
    total: 0,
    showSizeChanger: false,
  })

  // Methods
  const getAllProducts = async () => {
    loading.value = true
    try {
      const response = await fetchProducts()
      console.log(`🚀 ~ getAllProducts ~ response:`, response)
      if (response?.data?.products) {
        products.value = []
        products.value = [...response.data.products]
        paginationConfig.value.total = products.value.length
        paginationConfig.value.current = 1
        message.success("Danh sách sản phẩm đã được tải")
        setPagedProducts()
        console.log(`pagedProducts: `, pagedProducts.value)
      } else {
        throw new Error("Không thể tải danh sách sản phẩm")
      }
    } catch (error) {
      console.log(`🚀 ~ getAllProducts ~ error:`, error)
      message.error("Không thể tải danh sách sản phẩm")
    } finally {
      loading.value = false
    }
  }

  /**
   * Sets the paged products based on the current page and page size.
   *
   * @return {void}
   */
  const setPagedProducts = () => {
    const start =
      (paginationConfig.value.current - 1) * paginationConfig.value.pageSize
    const end = start + paginationConfig.value.pageSize
    pagedProducts.value = products.value.slice(start, end)
  }

  /**
   * Updates the pagination configuration and sets the paged products based on the current page and page size.
   *
   * @param {Object} pagination - The new pagination configuration object.
   * @return {void}
   */
  const handleTableChange = (pagination) => {
    paginationConfig.value = pagination
    setPagedProducts()
  }

  /**
   * Views a product. Currently only logs the product to the console.
   *
   * @param {Object} product - The product to be viewed.
   * @return {void}
   */

  const viewProduct = (product) => {
    console.log(`🚀 ~ viewProduct ~ product:`, product)
  }

  /**
   * Updates the product edit mode, selected product, and modal visibility.
   *
   * @param {Object} product - The product to be edited.
   * @return {void}
   */
  const editProduct = (product) => {
    console.log(`🚀 ~ editProduct ~ product:`, product)
    isEditMode.value = true
    selectedProduct.value = { ...product }
    isModalVisible.value = true
  }

  /**
   * Updates a product and handles the success or error cases.
   *
   * @param {Object} prod - The product to be updated.
   * @return {Promise<void>} A promise that resolves when the update is complete.
   */
  const handleUpdateProduct = async (prod) => {
    try {
      // Upload image to Cloudinary
      const uploadResult = await uploadProductImage(prod.image)
      console.log(`🚀 ~ handleUpdateProduct ~ uploadResult:`, uploadResult)

      if (uploadResult?.secure_url) {
        prod.image = uploadResult?.secure_url
      }
      // Update product in database
      let response = await updateProduct(prod._id, prod)
      console.log(`🚀 ~ handleUpdateProduct ~ response:`, response)
      message.success("Cập nhật sản phẩm thành công")
      productModalRef.value.resetForm()
      selectedProduct.value = {}
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật sản phẩm")
      productModalRef.value.resetForm()
    } finally {
      await getAllProducts()
    }
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
          await getAllProducts()
        }
      },
    })
  }

  /**
   * A function that shows the add product modal by resetting selected product, setting edit mode to false, and making the modal visible.
   *
   * @return {void} No return value
   */
  const goToAddProductPage = () => {
    router.push({ name: "add-product" })
  }

  /**
   * A description of the entire function.
   *
   * @param {type} newProduct - description of parameter
   * @return {Promise<void>} A promise that resolves when the product is successfully added.
   */
  const handleModalClose = (visible) => {
    isModalVisible.value = visible
    if (!visible) {
      selectedProduct.value = {}
    }
  }

  // Lifecycle hooks
  onMounted(() => {
    getAllProducts()
  })
</script>
