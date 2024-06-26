<template>
  <div>
    <div class="w-full flex mb-4">
      <div class="text-2xl font-semibold">Quản lý sản phẩm</div>

      <a-button
        class="ml-auto mr-4"
        :disabled="loading"
        @click="showAddProductModal"
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
    <a-table
      :data-source="pagedProducts"
      rowKey="_id"
      bordered
      :loading="loading"
      :pagination="paginationConfig"
      @change="handleTableChange"
    >
      <a-table-column
        key="name"
        title="Tên sản phẩm"
        dataIndex="name"
      />
      <a-table-column
        align="center"
        key="image"
        title="Hình ảnh"
        dataIndex="image"
      >
        <template #default="{ text: image }">
          <a-image
            :src="image"
            alt="productImage"
            style="width: 50px; height: auto"
          />
        </template>
      </a-table-column>
      <a-table-column
        align="center"
        key="brand"
        title="Hãng"
        dataIndex="brand"
      />
      <a-table-column
        align="center"
        key="price"
        title="Giá"
        dataIndex="price"
      />
      <a-table-column
        align="center"
        key="category"
        title="Danh mục"
        dataIndex="category"
      />
      <a-table-column
        key="action"
        title="Hành động"
        align="center"
      >
        <template #default="{ record }">
          <a-space>
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
      :isEditMode="isEditMode"
      :visible="isModalVisible"
      :productData="selectedProduct"
      @update:visible="handleModalClose"
      @updateDetails="handleUpdateProduct"
      @addProduct="handleAddProduct"
    />
  </div>
</template>
<script setup>
  import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "@/api/productService";
import { Modal, message } from "ant-design-vue";
import { onMounted, ref } from "vue";
import ProductModal from "./components/ProductModal.vue";

  // Data
  const isEditMode = ref(false)
  const products = ref([])
  const pagedProducts = ref([])
  const loading = ref(false)
  const isModalVisible = ref(false)
  const selectedProduct = ref({})

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
      products.value = response.data.products
      paginationConfig.value.total = products.value.length
      paginationConfig.value.current = 1
      message.success("Danh sách sản phẩm đã được tải")
    } catch (error) {
      console.log(`🚀 ~ getAllProducts ~ error:`, error)
      message.error("Không thể tải danh sách sản phẩm")
    } finally {
      loading.value = false
      setPagedProducts()
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
   * Updates the product edit mode, selected product, and modal visibility.
   *
   * @param {Object} product - The product to be edited.
   * @return {void}
   */
  const editProduct = (product) => {
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
    console.log(`🚀 ~ handleUpdateProduct ~ updatedProduct:`, prod)
    try {
      await updateProduct(prod._id, prod)
      message.success("Cập nhật sản phẩm thành công")
      selectedProduct.value = {}
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật sản phẩm")
    } finally {
      getAllProducts()
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
          console.log(`🚀 ~ handleDeleteProduct ~ product:`, product)
          product.isDeleted = true
          await deleteProduct(product._id, product)
          message.success("Sản phẩm đã được xóa")
          getAllProducts()
        } catch (error) {
          message.error("Có lỗi xảy ra khi xóa sản phẩm")
        }
      },
    })
  }

  /**
   * A function that shows the add product modal by resetting selected product, setting edit mode to false, and making the modal visible.
   *
   * @return {void} No return value
   */
  const showAddProductModal = () => {
    selectedProduct.value = {}
    isEditMode.value = false
    isModalVisible.value = true
  }

  /**
   * A description of the entire function.
   *
   * @param {type} newProduct - description of parameter
   * @return {Promise<void>} A promise that resolves when the product is successfully added.
   */
  const handleAddProduct = async (newProduct) => {
    console.log(`🚀 ~ handleAddProduct ~ newProduct:`, newProduct)
    try {
      await createProduct(newProduct)
      message.success("Thêm sản phẩm thành công")
      selectedProduct.value = {}
      getAllProducts()
    } catch (error) {
      message.error("Có lỗi xảy ra khi thêm sản phẩm")
    }
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
