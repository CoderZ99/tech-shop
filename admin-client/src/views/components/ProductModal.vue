<template>
  <a-modal
    okText="Lưu"
    cancelText="Huỷ"
    style="top: 10px"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    title="Chỉnh sửa sản phẩm"
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
          @change="handleFileChange"
        />
      </a-form-item>
      <a-form-item
        label="Tên sản phẩm"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-input v-model:value="product.name" />
      </a-form-item>
      <a-form-item
        label="Giá"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-input v-model:value="product.price" />
      </a-form-item>
      <a-form-item
        label="Danh mục"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-input v-model:value="product.category" />
      </a-form-item>
      <a-form-item
        label="Số lượng"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-input v-model:value="product.stock" />
      </a-form-item>
      <a-form-item
        label="Mô tả"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-input v-model:value="product.description" />
      </a-form-item>
      <a-form-item
        label="Hãng"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-input v-model:value="product.brand" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup>
  import { failImg } from "@/assets/co";
import { message } from "ant-design-vue";
import { reactive, ref, watch } from "vue";
  const tmp = ref(1)
    const form = reactive({})
  const props = defineProps({
    visible: Boolean,
    productData: Object,
  })
  const emits = defineEmits(["update:visible", "updateDetails"])

  const product = reactive({ ...props.productData })

  watch(
    () => props.productData,
    (newData) => {
      Object.assign(product, newData)
    },
    { deep: true, immediate: true }
  )

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

  const handleOk = async () => {
    try {
      emits("updateDetails", product)
      emits("update:visible", false)
      // product.image = null
      // ref.fileInput.value = null
      // ref.fileInput.value = ""
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    emits("update:visible", false)
    // product.image = null
    // ref.fileInput.value = null
    // ref.fileInput.value = ""
  }
</script>
<style scoped></style>
