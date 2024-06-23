<template>
  <div>
    <!-- Reviews tổng quan -->
    <div class="mb-4 p-4 flex items-start border rounded w-3/4">
      <div class="w-1/3">
        <p class="text-lg font-semibold">Overview</p>
        <div class="flex items-center mb-2">
          <a-rate
            :value="averageRating"
            allow-half
            disabled
          />
          <p class="text-3xl ml-2">{{ averageRating }}/5</p>
        </div>
        <p>Total Reviews: {{ totalReviews }}</p>
      </div>
      <div class="w-2/3 flex flex-col-reverse border-l-2 pl-3">
        <div
          v-for="(count, star) in starCounts"
          :key="star"
          class="flex items-center mb-2"
        >
          {{ star }} <StarFilled class="text-xl text-yellow-300 f" />
          <a-progress
            class="w-3/5"
            :percent="(count / totalReviews) * 100"
          />
          <div>{{ count }} reviews</div>
        </div>
      </div>
    </div>
    <div>
      <!-- Hiển thị danh sách review -->
      <Review
        v-for="review in currentReviews"
        :key="review.id"
        :review="review"
      />
    </div>
    <div class="w-3/5 flex justify-center mt-4">
      <!-- Hiển thị phân trang -->
      <CommonPagination
        :total="total"
        :pageSize="pageSize"
        :current="currentPage"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
  import { computed, defineProps, ref } from "vue"
  import Review from "./Review.vue"

  const props = defineProps({
    reviews: {
      type: Array,
      required: true,
    },
  })

  const currentPage = ref(1)
  const pageSize = 5
  const total = props.reviews.length

  const currentReviews = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize
    const endIndex = startIndex + pageSize
    return props.reviews.slice(startIndex, endIndex)
  })

  const handlePageChange = (page) => {
    currentPage.value = page
  }

  // Tính toán thông tin đánh giá tổng quan
  const averageRating = computed(() => {
    const total = props.reviews.reduce((sum, review) => sum + review.rating, 0)
    return total / props.reviews.length
  })

  const totalReviews = computed(() => props.reviews.length)

  const starCounts = computed(() => {
    const counts = {}
    // Khởi tạo số lượng đánh giá cho mỗi số sao từ 1 đến 5 là 0
    for (let i = 5; i >= 1; i--) {
      counts[i] = 0
    }
    // Đếm số lượng đánh giá cho mỗi số sao
    props.reviews.forEach((review) => {
      counts[review.rating]++
    })
    return counts
  })
</script>

<style scoped></style>
