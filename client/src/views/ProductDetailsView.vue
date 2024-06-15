<template>
  <div class="container mx-auto py-8">
    <div class="max-w-screen-lg mx-auto">
      <h1 class="text-3xl font-semibold mb-4">{{ product.name }}</h1>
      <div class="flex flex-wrap items-center">
        <div class="w-full md:w-2/5">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full"
          />
        </div>
        <div class="w-full md:w-1/2 md:pl-8">
          <p class="text-lg font-semibold mb-2">Description:</p>
          <p>{{ product.description }}</p>
          <p class="text-lg font-semibold mt-4">Price: ${{ product.price }}</p>
          <div class="flex items-center mt-2">
            <div class="rating">
              <a-rate
                :value="product.rating"
                allow-half
                disabled
              />
            </div>
            <p class="ml-2">{{ product.rating }}/5</p>
          </div>
          <div class="flex items-center mt-2 text-gray-500">
            <p>
              Stock:
              <span :class="{ 'text-gray-500': product.stock === 0 }">{{
                product.stock
              }}</span>
            </p>
            <span class="mx-2">|</span>
            <p>Sold: {{ product.sold }}</p>
          </div>
          <div class="flex items-center mt-4">
            <p class="mr-4">Quantity:</p>
            <input
              v-model="quantity"
              type="number"
              min="1"
              :max="product.stock"
              class="w-16 px-2 py-1 border rounded"
            />
          </div>
          <button
            :disabled="product.stock === 0"
            class="bg-blue-500 text-white px-4 py-2 mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <!-- Customer Reviews Component -->
      <CustomerReviews :reviews="product.reviews" />
    </div>
  </div>
</template>

<script setup>
  import { reactive, ref } from "vue"
  import CustomerReviews from "./components/CustomerReviews.vue"

  const product = reactive({
    // id: 1,
    // name: "Product Name",
    // description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    // price: 19.99,
    // image: "https://via.placeholder.com/400",
    // stock: 10,
    // rating: 4.5, // Rating out of 5
    // sold: 100, // Number of units sold
    // reviews: [
    //   {
    //     id: 1,
    //     author: "John Doe",
    //     title: "Great Product!",
    //     rating: 4,
    //     content: "Great product! Really enjoyed using it.",
    //     createDate: "2024-01-15",
    //   },
    //   {
    //     id: 2,
    //     author: "Jane Smith",
    //     title: "Excellent Quality",
    //     rating: 5,
    //     content: "Excellent quality, will definitely buy again!",
    //     createDate: "2024-01-12",
    //   },
    //   {
    //     id: 2,
    //     author: "Jane Smith",
    //     title: "Excellent Quality",
    //     rating: 5,
    //     content: "Excellent quality, will definitely buy again!",
    //     createDate: "2024-01-12",
    //   },
    //   {
    //     id: 2,
    //     author: "Jane Smith",
    //     title: "Excellent Quality",
    //     rating: 5,
    //     content: "Excellent quality, will definitely buy again!",
    //     createDate: "2024-01-12",
    //   },
    //   {
    //     id: 2,
    //     author: "Jane Smith",
    //     title: "Excellent Quality",
    //     rating: 5,
    //     content: "Excellent quality, will definitely buy again!",
    //     createDate: "2024-01-12",
    //   },
    //   {
    //     id: 2,
    //     author: "Jane Smith",
    //     title: "Excellent Quality",
    //     rating: 5,
    //     content: "Excellent quality, will definitely buy again!",
    //     createDate: "2024-01-12",
    //   },
    //   {
    //     id: 2,
    //     author: "Jane Smith",
    //     title: "Excellent Quality",
    //     rating: 5,
    //     content: "Excellent quality, will definitely buy again!",
    //     createDate: "2024-01-12",
    //   },
    //   {
    //     id: 2,
    //     author: "Jane Smith",
    //     title: "Excellent Quality",
    //     rating: 5,
    //     content: "Excellent quality, will definitely buy again!",
    //     createDate: "2024-01-12",
    //   },
    //   {
    //     id: 2,
    //     author: "Jane Smith",
    //     title: "Excellent Quality",
    //     rating: 5,
    //     content: "Excellent quality, will definitely buy again!",
    //     createDate: "2024-01-12",
    //   },
    //   {
    //     id: 2,
    //     author: "Jane Smith",
    //     title: "Excellent Quality",
    //     rating: 5,
    //     content: "Excellent quality, will definitely buy again!",
    //     createDate: "2024-01-12",
    //   },
    // ],
  })

  const quantity = ref(1)
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
</style>
