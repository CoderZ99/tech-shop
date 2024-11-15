<template>
  <div>
    <div class="w-full flex mb-4">
      <div class="text-2xl font-semibold">Thêm sản phẩm mới</div>
    </div>
    <div>
      <a-divider
        style="height: 3px"
        class="my-4 text-center text-xl font-semibold"
      >
        Thông tin sản phẩm
      </a-divider>

      <a-form
        ref="formRef"
        :rules="rules"
        layout="vertical"
        :model="product"
      >
        <a-form-item
          label="Tên sản phẩm"
          name="name"
        >
          <a-input
            v-model:value="product.name"
            placeholder="Nhập tên sản phẩm"
          />
        </a-form-item>

        <div class="grid grid-cols-2 gap-4">
          <a-form-item
            label="Giá (VND)"
            name="price"
          >
            <a-input-number
              v-model:value="product.price"
              :min="0"
              class="w-full"
            />
          </a-form-item>

          <a-form-item
            label="Loại sản phẩm"
            name="category"
          >
            <a-select v-model:value="product.category">
              <a-select-option
                v-for="category in PRODUCT_CATEGORY"
                :value="category"
                >{{ category }}</a-select-option
              >
            </a-select>
          </a-form-item>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <a-form-item
            label="Số lượng còn lại"
            name="stock"
          >
            <a-input-number
              v-model:value="product.stock"
              :min="0"
              class="w-full"
            />
          </a-form-item>
          <a-form-item
            label="Đã bán"
            name="sold"
          >
            <a-input-number
              v-model:value="product.sold"
              :min="0"
              class="w-full"
            />
          </a-form-item>
        </div>
        <a-form-item
          label="Slug"
          name="slug"
        >
          <div class="flex gap-3">
            <a-input
              v-model:value="product.slug"
              placeholder="Nhập đường dẫn tĩnh"
            />
            <a-tooltip
              placement="right"
              color="skyblue"
            >
              <template #title>
                <p>Đường dẫn khớp với các chuỗi như:</p>
                <p>abc</p>
                <p>a-b-c</p>
                <p>xyz-uvw</p>
                <p>Nhưng nó sẽ không khớp với:</p>
                <p>Abc (chứa chữ hoa)</p>
                <p>a-b-c- (kết thúc bằng dấu gạch nối)</p>
                <p>-abc (bắt đầu bằng dấu gạch nối)</p>
                <p>a b (chứa khoảng trắng)</p>
                <p>a.b (chứa dấu chấm)</p>
              </template>
              <QuestionCircleTwoTone />
            </a-tooltip>
          </div>
        </a-form-item>
        <a-form-item
          label="Thương hiệu"
          name="brand"
        >
          <a-input
            v-model:value="product.brand"
            placeholder="Nhập thương hiệu"
          />
        </a-form-item>
        <a-form-item
          label="Thêm hình cho sản phẩm (chọn tối đa 4 ảnh)"
          name="images"
          class="flex flex-row gap-4"
        >
          <a-upload
            v-model:fileList="selectedImages"
            list-type="picture-card"
            :max-count="maxImages"
            :multiple="true"
            :before-upload="() => false"
            @preview="handlePreview"
            @remove="handleRemove"
          >
            <div v-if="selectedImages.length < maxImages">
              <plus-outlined />
              <div class="mt-2">Thêm ảnh</div>
            </div>
          </a-upload>
          <div class="flex gap-6">
            <a-button
              :disabled="selectedImages.length === 0"
              @click="selectedImages = []"
              :size="'large'"
              class="flex items-center mt-4"
            >
              <ClearOutlined /> Xoá ảnh đã chọn
            </a-button>
          </div>
          <a-modal
            :open="previewVisible"
            :title="previewTitle"
            :footer="null"
            @cancel="cancelPreview"
          >
            <img
              alt="example"
              style="width: 100%"
              :src="previewImage"
            />
          </a-modal>
        </a-form-item>
        <a-form-item
          label="Mô tả"
          name="description"
        >
          <a-textarea
            v-model:value="product.description"
            :rows="displayRowDescription"
          />
        </a-form-item>
        <a-divider class="my-4" />
        <div class="flex gap-6 justify-end mt-6">
          <a-button
            :size="'large'"
            @click="$router.push({ name: 'product' })"
            >Huỷ thao tác</a-button
          >
          <a-button
            type="primary"
            :size="'large'"
            @click="handleSubmit"
            >Lưu thao tác</a-button
          >
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup>
  //import section
  import { createProduct } from "@/api/productService"
  import {
    ClearOutlined,
    PlusOutlined,
    QuestionCircleTwoTone,
  } from "@ant-design/icons-vue"
  import { message, Modal } from "ant-design-vue"
  import { h, ref } from "vue"
  import { useRouter } from "vue-router"
  import { uploadProductImage } from "../../api/cloudinaryService"
  import { PRODUCT_CATEGORY } from "../../constant"

  //define constant
  const maxImages = 4
  const displayRowDescription = 6

  //define props, emits, refs
  const formRef = ref()
  const router = useRouter()
  const selectedImages = ref([])
  const previewVisible = ref(false)
  const previewImage = ref("")
  const previewTitle = ref("")
  const product = ref({
    name: "",
    images: [],
    slug: "",
    brand: "",
    category: PRODUCT_CATEGORY.NONE,
    description: "",
    price: 0,
    sold: 0,
    stock: 0,
  })

  //define form rule
  const rules = {
    name: [
      {
        required: true,
        message: "Tên sản phẩm không để trống",
        trigger: "blur",
      },
    ],
    slug: [
      {
        required: true,
        message: "Đường dẫn tĩnh không để trống",
        trigger: "blur",
      },
      {
        pattern: /^[a-z0-9](-?[a-z0-9])*?$/,
        message: "Đường dẫn tĩnh phải phù hợp",
        trigger: "blur",
      },
    ],
    brand: [
      {
        required: true,
        message: "Thương hiệu không để trống",
        trigger: "blur",
      },
    ],
  }

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }
  const cancelPreview = () => {
    previewVisible.value = false
    previewTitle.value = ""
  }
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    previewImage.value = file.url || file.preview
    previewVisible.value = true
    previewTitle.value =
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
  }

  const handleRemove = (file) => {
    const index = selectedImages.value.indexOf(file)
    const newSelectedImages = selectedImages.value.slice()
    newSelectedImages.splice(index, 1)
    selectedImages.value = newSelectedImages
  }

  const beforeUpload = () => {
    const files = selectedImages.value.map((file) => file.originFileObj)
    files.forEach((file) => {
      // Allowed file types
      const allowedTypes = ["image/jpeg", "image/png"]
      const isValidFileType = allowedTypes.includes(file.type)

      // File size limit (2MB)
      const maxSize = 2 * 1024 * 1024 // 2MB in bytes
      const isValidFileSize = file.size <= maxSize

      // Validate file type
      if (!isValidFileType) {
        message.error("Bạn chỉ có thể tải lên tệp JPG/PNG!")
        throw new Error("Bạn chỉ có thể tải lên tệp JPG/PNG!")
      }

      // Validate file size
      if (!isValidFileSize) {
        message.error(
          `Hình ảnh phải nhỏ hơn 2MB! Kích thước hiện tại: ${(
            file.size /
            1024 /
            1024
          ).toFixed(2)}MB`
        )
        throw new Error("Kích thước tập tin không hợp lệ")
      }
    })
  }

  const handleUpload = async () => {
    if (selectedImages.value.length === 0) {
      message.info("Thêm sản phẩm mà không có ảnh")
    } else {
      // Convert selectedImages to an array of File objects
      const files = selectedImages.value.map((file) => file.originFileObj)
      // Upload selected images to cloud before submit
      const uploadResult = await uploadProductImage(files)
      if (uploadResult[0]?.error?.message) {
        throw new Error("Có lỗi xảy ra khi tải ảnh lên cloudinary")
      }
      console.log(`🚀 ~ handleSubmit ~ uploadResult:`, uploadResult)
      uploadResult.forEach((item) =>
        product.value.images.push({
          publicId: item.public_id,
          url: item.secure_url,
        })
      )
      console.log(`🚀 ~ handleSubmit ~ product.value:`, product.value)
      message.success("Tải ảnh lên cloudinary thành công")
    }
  }

  const showContinueConfirm = () => {
    Modal.confirm({
      title: "Bạn có muốn tiếp tục thêm sản phẩm mới",
      content: h("div", {}, [
        h("p", "Nhấn nút Ok để tiếp tục thêm sản phẩm."),
        h("p", "Nhấn nút Back để quay lại danh sách sản phẩm."),
      ]),
      okText: "Ok",
      cancelText: "Back",
      onOk() {
        formRef.value.resetFields()
        selectedImages.value = []
      },
      onCancel() {
        router.push({ name: "product" })
      },
      centered: true,
    })
  }

  // Handle add new product form submission
  const handleSubmit = async () => {
    try {
      // Check file valid
      beforeUpload()
      // Upload images
      await handleUpload()
      // Create new product
      const createResult = await createProduct(product.value)
      console.table(createResult.data)
      if (createResult.status !== 201) {
        throw new Error("Tạo sản phẩm mới thất bại")
      }
      message.success("Tạo sản phẩm mới thành công")
      showContinueConfirm()
    } catch (error) {
      console.log(`🚀 ~ handleSubmit ~ error:`, error?.message)
      message.error("Có lỗi xảy ra khi tạo sản phẩm mới")
    }
  }
</script>
