<template>
  <a-modal
    :okText="isEditMode ? 'Sửa' : 'Thêm'"
    cancelText="Hủy"
    style="top: 10px"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    :title="isEditMode ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'"
    @afterClose="resetForm"
  >
    <a-form :form="form">
      <a-form-item
        label="Hình ảnh sản phẩm"
        class="flex"
      >
        <a-image
          v-if="product.image"
          :width="128"
          :height="128"
          :src="product.image"
          alt="productImage"
          class="object-cover mr-4"
        />
        <img
          v-else
          class="w-32 h-32 object-cover mr-4"
          :src="failImg"
        />
      </a-form-item>
      <a-form-item
        label="Chọn hình khác"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <input
          ref="fileInput"
          id="file"
          type="file"
          accept="image/*"
          @change="handleFileChange"
        />
      </a-form-item>
      <a-form-item
        label="Tên sản phẩm"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-input
          v-model:value="product.name"
          placeholder="Nhập tên sản phẩm"
        />
      </a-form-item>
      <a-form-item
        label="Đường dẫn chi tiết"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-input
          v-model:value="product.detailUrl"
          placeholder="Nhập đường dẫn chi tiết sản phẩm"
        />
      </a-form-item>
      <a-form-item
        label="Giá"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-input
          type="number"
          v-model:value="product.price"
          placeholder="Nhập giá sản phẩm"
        />
      </a-form-item>
      <a-form-item
        label="Danh mục"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-input
          v-model:value="product.category"
          placeholder="Nhập loại sản phẩm"
        />
      </a-form-item>
      <a-form-item
        label="Số lượng"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-input
          type="number"
          v-model:value="product.stock"
          placeholder="Nhập số lượng trong kho"
        />
      </a-form-item>
      <a-form-item
        label="Mô tả"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-input
          v-model:value="product.description"
          placeholder="Nhập mô tả sản phẩm"
        />
      </a-form-item>
      <a-form-item
        label="Hãng"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-input
          v-model:value="product.brand"
          placeholder="Nhập hãng sản phẩm"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
  import { failImg } from "@/assets/co"
  import { message } from "ant-design-vue"
  import { reactive, ref, watch } from "vue"

  const fileInput = ref(null)
  const form = reactive({})
  const props = defineProps({
    visible: Boolean,
    productData: Object,
    isEditMode: Boolean,
  })

  const emits = defineEmits(["update:visible", "updateDetails", "addProduct"])

  const product = reactive({ ...props.productData })

  watch(
    () => props.productData,
    (newData) => {
      Object.assign(product, newData)
    },
    { deep: true, immediate: true }
  )

  watch(
    () => props.visible,
    (newVal) => {
      if (!newVal) {
        resetForm()
      }
    }
  )

  /**
   * Handles the change event of the file input element and reads the selected file as a data URL.
   *
   * @param {Event} event - The change event object.
   * @return {Promise<void>} A promise that resolves when the file is successfully read and the image URL is assigned to the product.image property.
   */
  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        product.image = reader.result
      }
      reader.onerror = (error) => {
        message.error("Có lỗi xảy ra khi tải hình ảnh")
      }
    }
  }

  /**
   * Resets the form by clearing all the fields and resetting the file input text.
   *
   * @return {void} This function does not return anything.
   */
  const resetForm = () => {
    Object.assign(product, {
      name: "",
      price: "",
      category: "",
      detailUrl: "",
      stock: "",
      description: "",
      brand: "",
      image: "",
    })

    // reset file input text
    console.log(fileInput.value.value)
    if (fileInput.value.value) {
      fileInput.value.value = ""
    }
  }

  const handleOk = async () => {
    try {
      if (props.isEditMode) {
        emits("updateDetails", product)
      } else {
        emits("addProduct", product)
      }
      emits("update:visible", false)
      resetForm()
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    emits("update:visible", false)
    resetForm()
  }
</script>

<style scoped></style>
