<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Welcome to Our E-Commerce Store</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded shadow p-4"
      >
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-40 object-cover mb-4 rounded"
        />
        <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
        <p class="text-gray-700">{{ product.description }}</p>
        <div class="mt-4 flex justify-between items-center">
          <span class="text-lg font-bold">{{ product.price }}</span>
          <div class="flex justify-between items-center">
            <a-tooltip placement="bottomLeft">
              <template #title>
                <span>Xem chi tiết</span>
              </template>
              <a-button
                @click="viewDetails(product)"
                type="default"
                class="flex items-center justify-center"
                block
                shape="round"
                ><EyeOutlined
              /></a-button>
            </a-tooltip>
            <a-tooltip placement="bottomRight">
              <template #title>
                <span>Thêm vào giỏ hàng</span>
              </template>
              <a-button
                @click="addToCart(product)"
                type="primary"
                class="flex items-center justify-center ml-4"
                block
                shape="round"
                ><ShoppingCartOutlined
              /></a-button>
            </a-tooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  // Imports
  import EyeOutlined from "@ant-design/icons-vue/EyeOutlined"
  import ShoppingCartOutlined from "@ant-design/icons-vue/ShoppingCartOutlined"
  import { ref } from "vue"

  // Data
  const products = ref([
    {
      id: 1,
      name: "Product 1",
      description: "Description for Product 1",
      price: "$100",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description for Product 2",
      price: "$150",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description for Product 3",
      price: "$120",
      image: "https://via.placeholder.com/300",
    },
    // Add more mock data below
    {
      id: 4,
      name: "Product 4",
      description: "Description for Product 4",
      price: "$90",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 5,
      name: "Product 5",
      description: "Description for Product 5",
      price: "$80",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 6,
      name: "Product 6",
      description: "Description for Product 6",
      price: "$70",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 7,
      name: "Product 7",
      description: "Description for Product 7",
      price: "$60",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 8,
      name: "Product 8",
      description: "Description for Product 8",
      price: "$50",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 9,
      name: "Product 9",
      description: "Description for Product 9",
      price: "$40",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 10,
      name: "Product 10",
      description: "Description for Product 10",
      price: "$30",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 11,
      name: "Product 11",
      description: "Description for Product 11",
      price: "$20",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 12,
      name: "Product 12",
      description: "Description for Product 12",
      price: "$10",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 13,
      name: "Product 13",
      description: "Description for Product 13",
      price: "$200",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 14,
      name: "Product 14",
      description: "Description for Product 14",
      price: "$190",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 15,
      name: "Product 15",
      description: "Description for Product 15",
      price: "$180",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 16,
      name: "Product 16",
      description: "Description for Product 16",
      price: "$170",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 17,
      name: "Product 17",
      description: "Description for Product 17",
      price: "$160",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 18,
      name: "Product 18",
      description: "Description for Product 18",
      price: "$240",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 19,
      name: "Product 19",
      description: "Description for Product 19",
      price: "$230",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 20,
      name: "Product 20",
      description: "Description for Product 20",
      price: "$220",
      image: "https://via.placeholder.com/300",
    },
  ])

  const viewDetails = (product) => {
    // Logic to view product details
  }

  const addToCart = (product) => {
    // Logic to add product to cart
  }
</script>

<style scoped>
  /* Custom styles can go here */
</style>
