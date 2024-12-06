<template>
  <a-spin
    :spinning="spinning"
    :delay="delayTime"
    size="large"
  >
    <div>
      <div class="w-full flex mb-4">
        <div class="text-2xl font-semibold">Chỉnh sửa thông tin sản phẩm</div>
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
                  <p>Đường dẫn sẽ không hợp lệ như:</p>
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
            label="Hình ảnh sản phẩm"
            name="images"
            class="flex flex-row gap-4"
          >
            <a-upload
              v-model:fileList="selectedImages"
              list-type="picture-card"
              :multiple="true"
              :before-upload="() => false"
              @preview="handlePreview"
              @remove="handleRemove"
            >
              <!-- <div v-if="selectedImages.length < maxImages"> -->
              <div>
                <plus-outlined />
                <div class="mt-2">Thêm ảnh</div>
              </div>
              <!-- </div> -->
            </a-upload>
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
            label="Mô tả sản phẩm"
            name="description"
          >
            <PrimeEditor
              v-model="formattedDescription"
              editorStyle="height: 320px"
              class="custom-editor"
            />
          </a-form-item>
          <a-divider class="my-4" />
          <div class="flex gap-6 justify-end mt-6">
            <a-button
              :size="'large'"
              @click="router.push({ name: 'product' })"
              >Huỷ thao tác</a-button
            >
            <a-button
              type="primary"
              :size="'large'"
              @click="onSubmit"
              >Lưu thay đổi</a-button
            >
          </div>
        </a-form>
      </div>
    </div>
  </a-spin>
</template>

<script setup>
  import { updateProduct, getProduct } from "@/api/productService"
  import { PlusOutlined, QuestionCircleTwoTone } from "@ant-design/icons-vue"
  import { message } from "ant-design-vue"
  import { onMounted, onUnmounted, ref, computed } from "vue"
  import { useRouter } from "vue-router"
  import { destroyImage, uploadProductImage } from "../../api/cloudinaryService"
  import { PRODUCT_CATEGORY } from "../../constant"
  import { useProductStore } from "../../stores/productStore"
  import { validateImageType } from "../../utils/utils"

  // define ref
  const router = useRouter()
  const productStore = useProductStore()
  const formRef = ref()
  const spinning = ref(false)
  const delayTime = 200
  const displayRowDescription = 6
  const maxImages = 4

  // Form data
  const product = ref({
    name: "",
    price: 0,
    category: PRODUCT_CATEGORY.NONE,
    stock: 0,
    sold: 0,
    slug: "",
    brand: "",
    description: "",
    images: [],
  })

  // Image ref
  const previewVisible = ref(false)
  const previewImage = ref("")
  const previewTitle = ref("")
  const selectedImages = ref([])
  const deletedImages = ref([])

  // Current product id
  const productId = router.currentRoute.value.params.id
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    previewImage.value = file.url || file.preview
    previewVisible.value = true
    previewTitle.value =
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
  }

  const cancelPreview = () => {
    previewVisible.value = false
    previewTitle.value = ""
  }

  const handleRemove = (file) => {
    console.groupCollapsed(`🚀 ~ remove image file`)
    // Nếu là file cũ (chỉ có publicId)
    if (file.publicId && file.publicId.length > 0) {
      console.log(`🚀 ~ push new item to delete list`, file.publicId)
      deletedImages.value.push({ publicId: file.publicId, isDestroy: false })
    }
    console.log(`🚀 ~ handleRemove ~ file:`, file)
    console.groupEnd()
  }

  // Form submission
  const onSubmit = async () => {
    formRef.value
      .validate()
      .then(async () => {
        await handleSubmit()
      })
      .catch((error) => {
        console.log(`🚀 ~ onSubmit ~ error:`, error)
        message.error("Lỗi khi đồng bộ thông tin!!!")
      })
  }

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Spin
      spinning.value = true
      // Delete images if they are deleted
      if (deletedImages.value.length > 0) {
        try {
          deletedImages.value.map((image) => {
            console.log(`🚀 ~ image:`, image.publicId)
            destroyImage(image.publicId)
            image.isDestroy = true
          })
        } catch (error) {
          message.error(`Có lỗi xảy ra khi xóa ảnh`)
        }
        console.log(`🚀 ~ deletedImages.value:`, deletedImages.value)
      }

      // Delete images if they are deleted
      product.value.images = product.value.images.filter(
        (image) =>
          !deletedImages.value.some(
            (deletedImg) =>
              deletedImg.publicId === image.publicId &&
              deletedImg.isDestroy === true
          )
      )

      // Upload images if they are new
      const newImages = selectedImages.value
        .filter((image) => image.originFileObj) // filter new products
        .map((image) => {
          validateImageType([image])
          return image.originFileObj
        })

      console.log("New images to upload:", newImages)

      const uploadResult = await uploadProductImage(newImages)
      console.log(`🚀 ~ handleSubmit ~ uploadResult:`, uploadResult)
      uploadResult.forEach((item) =>
        product.value.images.push({
          publicId: item.public_id,
          url: item.secure_url,
        })
      )

      console.log(product.value)
      // Call api
      const editResult = await updateProduct(productId, product.value)
      console.table(editResult)
      message.success("Cập nhật sản phẩm thành công")
      productStore.clearSelectedProduct()
      formRef.value.resetFields()
      router.push({ name: "product" })
    } catch (error) {
      console.log(`🚀 ~ handleSubmit ~ error:`, error.message)
      message.error("Có lỗi xảy ra khi cập nhật sản phẩm")
    } finally {
      spinning.value = false
    }
  }

  // Computed property để xử lý description có \n và format URL ảnh
  const formattedDescription = computed({
    get: () => {
      if (!product.value.description) return ""

      let text = product.value.description.replace(/\\n/g, "\n")

      // Format lại URL trong thẻ href và src
      text = text.replace(
        /href="\\&quot;(.*?)\\&quot;"/g,
        (match, url) => `href="${url}"`
      )
      text = text.replace(
        /src="\\&quot;(.*?)\\&quot;"/g,
        (match, url) => `src="${url}"`
      )

      return text
    },
    set: (value) => {
      product.value.description = value
    },
  })

  // Validation rules
  const rules = {
    name: [
      {
        required: true,
        message: "Vui lòng nhập tên sản phẩm",
        trigger: "blur",
      },
    ],
    price: [
      {
        required: true,
        message: "Vui lòng nhập giá sản phẩm",
        trigger: "blur",
      },
    ],
    category: [
      {
        required: true,
        message: "Vui lòng chọn loại sản phẩm",
        trigger: "blur",
      },
    ],
    stock: [
      {
        required: true,
        message: "Vui lòng nhập số lượng sản phẩm",
        trigger: "blur",
      },
    ],
    slug: [
      {
        required: true,
        message: "Vui lòng nhập đường dẫn tĩnh",
        trigger: "blur",
      },
      {
        pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        message: "Đường dẫn tĩnh không hợp lệ",
        trigger: "blur",
      },
    ],
  }

  // Load product data when component mounts
  onMounted(async () => {
    try {
      // get product from store
      const selectedProduct = productStore.selectedProduct
      // if selectedProduct is not null
      if (!selectedProduct) {
        productResponse = await getProduct(productId)
        productStore.selectedProduct = productResponse.data
      }
      product.value = { ...selectedProduct }
      // product.images = selectedProduct.images
      if (selectedProduct.images && selectedProduct.images.length > 0) {
        selectedImages.value = selectedProduct.images.map((image) => ({
          publicId: image.publicId,
          url: image.url,
        }))
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi tải sản phẩm")
      console.log(error.message)
    }
  })

  // Clear product store when component unmounts
  onUnmounted(() => {
    productStore.clearSelectedProduct()
  })

  // Image handling functions
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }
</script>

<style>
  /* Custom styling cho PrimeEditor để phù hợp với giao diện Ant Design */
  .custom-editor .ql-toolbar.ql-snow {
    border: 1px solid #d9d9d9;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-color: #fff;
  }

  /* Ẩn nút heading */
  .custom-editor .ql-toolbar .ql-header,
  .custom-editor .ql-toolbar .ql-clean,
  .custom-editor .ql-toolbar .ql-image,
  .custom-editor .ql-toolbar .ql-code-block {
    display: none !important;
  }

  .custom-editor .ql-container.ql-snow {
    border: 1px solid #d9d9d9;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  .custom-editor .ql-editor {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    background-color: #fff;
    min-height: 320px;
  }

  .custom-editor .ql-toolbar button:hover,
  .custom-editor .ql-toolbar button:focus {
    color: #1890ff;
  }

  .custom-editor .ql-toolbar button.ql-active {
    color: #1890ff;
  }
</style>
