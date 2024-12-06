<template>
  <div class="container mx-auto">
    <div class="mx-auto max-w-screen-lg py-8">
      <!-- Page title -->
      <div class="mb-4 flex items-baseline">
        <h2 class="text-2xl font-semibold">
          {{ product.category }}
        </h2>
      </div>
      <!-- Product info -->
      <div class="rounded-lg border bg-white p-4 shadow">
        <div class="flex flex-wrap place-content-center">
          <!-- Product image -->
          <div class="w-full md:w-2/5">
            <ProductImageCarousel :images="product.images" />
          </div>
          <!-- Product info -->
          <div class="w-full md:w-1/2 md:pl-8">
            <!-- Product name -->
            <h1 class="text-2xl font-semibold">{{ product.name }}</h1>
            <!-- Product rating -->
            <div class="mt-2 flex flex-row items-baseline">
              <!-- Rating -->
              <div class="mr-1 font-semibold">
                {{ product.rating }}
              </div>
              <a-rate
                class="flex"
                v-model:value="product.rating"
                allow-half
                disabled
              />
              <a-divider class="mt-1 text-gray-500" type="vertical" />
              <!-- Number of reviews -->
              <div class="ml-2 text-sm text-gray-500">
                {{ product.numReviews }} đánh giá
              </div>
            </div>
            <!-- Product price -->
            <div
              class="mt-3 rounded-lg border border-[#fde68a] bg-gradient-to-b from-[#fffbeb] to-white p-4"
            >
              <div class="text-sm text-gray-500">Mua ngay với giá:</div>
              <div class="text-3xl font-semibold text-red-500">
                {{ formatCurrency(product.price) }}
              </div>
              <a-divider />
              <div class="flex items-center">
                <SafetyCertificateTwoTone
                  style="font-size: 20px; color: blue; margin-right: 5px"
                />
                <p>Cam kết hàng chính hãng 100%</p>
              </div>
              <div class="mt-2 flex items-center">
                <PhoneTwoTone
                  style="font-size: 20px; color: blue; margin-right: 5px"
                />
                <span>
                  Gọi đặt mua:
                  <a class="font-bold text-blue-500" href="tel:1900123456"
                    >1900 123 456</a
                  >
                  (8:00 - 21:30)
                </span>
              </div>
            </div>
            <!-- Product brand -->
            <div class="mt-2 flex items-center">
              <p>Thương hiệu:&nbsp;</p>
              <a class="text-blue-500" href="javascript:void(0)">{{
                product.brand
              }}</a>
            </div>
            <!-- Product sold -->
            <div class="mt-2 flex items-center text-gray-500">
              <p>Đã bán: {{ product.sold }}</p>
            </div>
            <a-divider dotted />
            <div class="mt-4 flex w-full gap-4">
              <div class="w-1/2">
                <a-button
                  block
                  class="flex items-center justify-center border-blue-500 text-blue-500"
                  size="large"
                  :disabled="product.stock === 0"
                  @click="addToCart(product, 1)"
                >
                  <ShoppingCartOutlined style="font-size: 20px" />Thêm vào giỏ
                </a-button>
              </div>
              <div class="w-1/2">
                <a-button
                  block
                  danger
                  type="primary"
                  size="large"
                  :disabled="product.stock === 0"
                  @click="buyNow(product)"
                >
                  Mua ngay
                </a-button>
              </div>
            </div>
            <!-- <div class="w-full flex gap-6 mt-4">
              <div class="w-1/4">
                <a-button
                  block
                  :disabled="product.stock === 0"
                  class="text-white bg-blue-400"
                  @click="() => router.go(-1)"
                >
                  Quay lại
                </a-button>
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <div class="flex gap-4">
        <!-- Product description -->
        <div class="mt-8 w-2/3 break-words rounded bg-white p-4 shadow-md">
          <h2 class="my-4 text-xl font-semibold">Bài viết đánh giá</h2>
          <div>
            <div
              :class="{
                'line-clamp-5 max-h-32 overflow-hidden': !showFullDescription,
              }"
              v-html="formattedDescription"
            ></div>
            <div class="flex justify-center">
              <a-button
                type="link"
                class="mt-4 text-lg font-medium"
                @click="showFullDescription = !showFullDescription"
              >
                {{ showFullDescription ? "Thu gọn" : "Xem thêm" }}
              </a-button>
            </div>
          </div>
        </div>
        <div class="w-1/3">
          <ShoppingAssurance />
        </div>
      </div>
      <h2 class="mt-12 text-xl font-semibold">Đánh giá {{ product.name }}</h2>
      <!-- <div v-if="product && product?.reviews?.length > 0"></div>
      <div v-else></div> -->
      <!-- Reviews Section -->
      <div class="mt-6">
        <!-- Reviews List -->
        <div class="my-4 space-y-6">
          <!-- No reviews -->
          <div
            v-if="reviews.length === 0"
            class="w-full bg-white text-center text-gray-500"
            style="background: #ffffff"
          >
            <a-empty
              class="p-12"
              imageStyle="background: #FFFFFF"
              description="Sản phẩm Chưa có đánh giá nào"
            />
          </div>
          <!-- Reviews -->
          <div v-else>
            <CustomerReviews :reviews="reviews" />
          </div>
        </div>
        <!-- Review Form -->
        <h2 class="mb-6 text-2xl font-bold">Đánh giá sản phẩm</h2>
        <div
          v-if="authStore.isAuthenticated"
          class="mb-8 mt-4 rounded-lg border bg-white p-6"
        >
          <h3 class="text-lg font-semibold">
            Viết đánh giá của bạn về {{ product.name }}
          </h3>
          <a-form class="mt-6" :model="reviewForm" @finish="submitReview">
            <a-form-item
              label="Bạn cảm thấy sản phẩm như thế nào? (chọn sao nhé):"
            >
              <a-rate v-model:value="reviewForm.rating" />
            </a-form-item>
            <a-form-item label="Họ tên">
              <a-input
                class="w-1/2"
                v-model:value="reviewForm.fullname"
                placeholder="Nhập họ tên"
              />
            </a-form-item>
            <a-form-item label="Nhận xét">
              <a-textarea
                v-model:value="reviewForm.comment"
                :rows="4"
                placeholder="Mời bạn chia sẻ thêm một số cảm nhận về sản phẩm..."
              />
            </a-form-item>
            <a-form-item class="flex justify-center">
              <a-button
                type="primary"
                html-type="submit"
                :loading="isSubmittingReview"
                size="large"
                class="min-w-40 px-2 py-2"
              >
                Gửi đánh giá ngay
              </a-button>
            </a-form-item>
          </a-form>
        </div>
        <a-alert
          v-else
          message="Vui lòng đăng nhập để đánh giá sản phẩm"
          type="info"
          show-icon
          class="mb-8"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// Imports
import CustomerReviews from "../components/CustomerReviews.vue";
import { useCartStore } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";
import { message } from "ant-design-vue";
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { getProductByDetailUrl } from "../../api/productService";
import ShoppingAssurance from "../components/ShoppingAssurance.vue";
import { formatCurrency } from "@/utils/currency";
import { formatDate } from "@/utils/utils";
import ProductImageCarousel from "./ProductImageCarousel.vue";
import { SafetyCertificateTwoTone, PhoneTwoTone } from "@ant-design/icons-vue";
import { ShoppingCartOutlined } from "@ant-design/icons-vue";
import { getProductReviews, createProductReview } from "@/api/reviewService";

// Store
const cartStore = useCartStore();
const authStore = useAuthStore();
// Router
const router = useRouter();

// Props
const props = defineProps({
  detailUrl: String,
});

// Data
const product = ref({});

const selectedImage = ref("");

const showFullDescription = ref(false);

const reviews = ref([]);
const isSubmittingReview = ref(false);
const reviewForm = ref({
  fullname: "",
  rating: 0,
  comment: "",
});

// Method
const getProductDetail = async () => {
  try {
    const response = await getProductByDetailUrl(props.detailUrl);
    if (!response.data) {
      router.push({ name: "not-found" });
    }
    console.log(`🚀 ~ getProductDetail ~ response:`, response);
    product.value = { ...response.data };
  } catch (error) {
    message.error("Failed to fetch products:", error);
  }
};

/**
 * Adds a product to the cart.
 *
 * @param {Object} product - The product to be added.
 * @param {number} [addedQuantity=1] - The quantity of the product to be added. Defaults to 1.
 * @return {void} This function does not return anything.
 */
const addToCart = (product, addedQuantity = 1, buyNow = false) => {
  console.log(`🚀 ~ addToCart ~ product:`, product);
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
    if (buyNow) {
      router.push({ name: "cart" });
    }
  } catch (error) {
    console.log(`🚀 ~ addToCart ~ error:`, error);
    message.error(error);
  }
};

/**
 * Adds 1 product to cart and redirects to cart.
 *
 * @return {void} This function does not return anything.
 */
const buyNow = (product) => {
  // Add 1 product to cart and redirect to cart
  addToCart(product, 1, true);
};

// Submit review
const submitReview = async () => {
  if (!reviewForm.value.rating) {
    message.error("Vui lòng chọn số sao đánh giá");
    return;
  }
  try {
    isSubmittingReview.value = true;
    await createProductReview(product.value._id, {
      fullName: reviewForm.value.fullname,
      rating: reviewForm.value.rating,
      comment: reviewForm.value.comment,
    });
    // Reset form
    reviewForm.value = {
      fullname: "",
      rating: 0,
      comment: "",
    };
    // Reload reviews
    await loadReviews();
    message.success("Đã gửi đánh giá thành công");
  } catch (error) {
    message.error("Không thể gửi đánh giá. Vui lòng thử lại");
  } finally {
    isSubmittingReview.value = false;
  }
};

// Load product reviews
const loadReviews = async () => {
  console.log(`🚀 ~ loadReviews ~ product.value._id:`, product.value._id);
  try {
    const response = await getProductReviews(product.value._id);
    reviews.value = response.data;
  } catch (error) {
    message.error("Không thể tải đánh giá sản phẩm");
  }
};

// Computed property để xử lý description có \n và format URL ảnh
const formattedDescription = computed({
  get: () => {
    if (!product.value.description) return "";

    let text = product.value.description.replace(/\\n/g, "\n");

    // Format lại URL trong thẻ href và src
    text = text.replace(
      /href="\\&quot;(.*?)\\&quot;"/g,
      (match, url) => `href="${url}"`,
    );
    text = text.replace(
      /src="\\&quot;(.*?)\\&quot;"/g,
      (match, url) => `src="${url}"`,
    );

    return text;
  },
  set: (value) => {
    product.value.description = value;
  },
});

// Lifecycle
onMounted(async () => {
  // Get product detail on mount
  await getProductDetail();

  // Load product reviews
  await loadReviews();
  console.log(product);
});
</script>

<style scoped>
.star {
  cursor: pointer;
  font-size: 1.5rem;
}

.active {
  color: #ffd700; /* Màu vàng */
}

.text-gray-500 {
  opacity: 0.5; /* Màu xám mờ */
}

#quantity {
  text-align: center !important;
}

.a-empty-description {
  background: white;
}
</style>
