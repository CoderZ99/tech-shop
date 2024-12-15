<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="mb-6 text-2xl font-bold">Đánh giá của tôi</h2>

    <!-- Loading state -->
    <a-spin :spinning="loading">
      <!-- No reviews -->
      <div v-if="reviews.length === 0" class="text-center text-gray-500">
        Bạn chưa có đánh giá nào
      </div>

      <!-- Reviews list -->
      <div v-else class="space-y-4">
        <div
          v-for="review in reviews"
          :key="review._id"
          class="rounded-lg border bg-white p-4 shadow"
        >
          <div class="flex items-start justify-between">
            <div class="flex-grow">
              <div class="mb-2">
                <a-rate v-model:value="review.rating" disabled />
                <span class="ml-2 text-gray-600">({{ review.rating }}/5)</span>
              </div>
              <div class="mb-2">
                <router-link
                  v-if="review.product"
                  :to="{
                    name: 'product-details',
                    params: { detailUrl: review.product.slug },
                  }"
                  class="text-blue-600 hover:text-blue-800"
                >
                  {{ review?.product?.name }}
                </router-link>
              </div>
              <p class="text-gray-800">Nội dung: {{ review.comment }}</p>
              <p class="mt-2 text-sm text-gray-500">
                Đăng vào: {{ formatDate(review.createdAt) }}
              </p>
            </div>
            <!-- Buttons -->
            <div class="mr-2 mt-4">
              <a-button
                class="mb-3 flex min-w-32 items-center justify-center"
                type="primary"
                @click="openEditModal(review)"
                size="large"
              >
                <template #icon><EditOutlined /></template>
                Sửa
              </a-button>
              <a-popconfirm
                title="Bạn có chắc chắn muốn xóa đánh giá này?"
                ok-text="Có"
                cancel-text="Không"
                @confirm="deleteReview(review._id)"
              >
                <a-button
                  class="flex min-w-32 items-center justify-center"
                  size="large"
                  danger
                >
                  <template #icon><DeleteOutlined /></template>
                  Xóa
                </a-button>
              </a-popconfirm>
            </div>
          </div>
        </div>
      </div>
    </a-spin>

    <!-- Edit Review Modal -->
    <a-modal
      v-model:visible="editModalVisible"
      title="Chỉnh sửa đánh giá"
      @ok="handleEditSubmit"
      okText="Cập nhật"
      cancelText="Huỷ"
      :confirmLoading="editLoading"
    >
      <a-form :model="editForm" layout="vertical">
        <a-form-item label="Số điểm đánh giá">
          <a-rate v-model:value="editForm.rating" />
        </a-form-item>
        <a-form-item label="Nội dung nhận xét">
          <a-textarea
            v-model:value="editForm.comment"
            :rows="4"
            placeholder="Nhập nhận xét của bạn"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { message } from "ant-design-vue";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import {
  getUserReviews,
  updateProductReview,
  deleteProductReview,
} from "@/api/reviewService";

const reviews = ref([]);
const loading = ref(false);
const editModalVisible = ref(false);
const editLoading = ref(false);

const editForm = ref({
  reviewId: null,
  rating: 0,
  comment: "",
  productId: null,
});

// Format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Load user reviews
const loadReviews = async () => {
  loading.value = true;
  try {
    const response = await getUserReviews();
    reviews.value = response.data;
  } catch (error) {
    message.error("Không thể tải đánh giá");
  } finally {
    loading.value = false;
  }
};

// Open edit modal
const openEditModal = (review) => {
  editForm.value = {
    reviewId: review._id,
    rating: review.rating,
    comment: review.comment,
    productId: review.product._id,
  };
  editModalVisible.value = true;
};

// Handle edit submit
const handleEditSubmit = async (review) => {
  console.log(`🚀 ~ handleEditSubmit ~ review:`, review);
  if (!editForm.value.rating) {
    message.warning("Vui lòng chọn số sao đánh giá");
    return;
  }

  editLoading.value = true;
  try {
    await updateProductReview(editForm.value.reviewId, {
      rating: editForm.value.rating,
      comment: editForm.value.comment,
      productId: editForm.value.productId,
    });
    message.success("Cập nhật đánh giá thành công");
    editModalVisible.value = false;
    await loadReviews();
  } catch (error) {
    message.error("Không thể cập nhật đánh giá");
  } finally {
    editLoading.value = false;
  }
};

// Delete review
const deleteReview = async (reviewId) => {
  loading.value = true;
  try {
    await deleteProductReview(reviewId);
    message.success("Xóa đánh giá thành công");
    await loadReviews();
  } catch (error) {
    message.error("Không thể xóa đánh giá");
  } finally {
    loading.value = false;
  }
};

// Load reviews on mount
onMounted(() => {
  loadReviews();
});
</script>
