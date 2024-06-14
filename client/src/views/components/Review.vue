<template>
  <div class="mb-4 p-4 border rounded w-3/4">
    <div class="flex items-start">
      <div class="w-1/5 pr-2">
        <p class="font-semibold">{{ review.author }}</p>
        <p class="text-gray-500">{{ review.createDate }}</p>
      </div>
      <div class="w-4/5 pl-2">
        <div class="flex items-center mb-2">
          <a-rate
            :value="review.rating"
            allow-half
            disabled
          />
          <p class="ml-2 font-semibold">{{ review.title }}</p>
          <p class="ml-2">{{ review.rating }}/5</p>
        </div>
        <p>{{ review.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { defineProps } from "vue"

  const props = defineProps({
    review: {
      type: Object,
      required: true,
    },
  })
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
    color: #6b7280; /* TailwindCSS gray-500 */
  }

  .border-l {
    border-left-width: 1px;
  }

  .h-full {
    height: 100%;
  }

  .mx-2 {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  .pl-2 {
    padding-left: 0.5rem;
  }

  .pr-2 {
    padding-right: 0.5rem;
  }
</style>
