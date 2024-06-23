<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <!-- Carousel -->
    <a-carousel
      autoplay
      class="mb-8"
    >
      <div
        v-for="(banner, index) in banners"
        :key="index"
      >
        <img
          :src="banner.image"
          :alt="banner.title"
          class="w-full h-64 object-cover"
        />
      </div>
    </a-carousel>

    <!-- Product Rows -->
    <div
      v-for="(category, index) in categories"
      :key="index"
      class="mb-8"
    >
      <h3 class="text-xl font-semibold mb-4">{{ category.name }}</h3>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div
          v-for="product in category.products"
          :key="product.id"
          class="bg-white p-4 rounded shadow-md"
        >
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-32 object-cover mb-4"
          />
          <h4 class="text-lg font-semibold">{{ product.name }}</h4>
          <p>{{ product.price.toLocaleString() }}₫</p>
          <button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // import "ant-design-vue/dist/antd.css"

  const banners = [
    { id: 1, title: "Banner 1", image: "https://via.placeholder.com/800x400" },
    { id: 2, title: "Banner 2", image: "https://via.placeholder.com/800x400" },
    { id: 3, title: "Banner 3", image: "https://via.placeholder.com/800x400" },
  ]

  const categories = [
    {
      name: "Điện Thoại",
      products: [
        {
          id: 1,
          name: "iPhone 13",
          price: 25000000,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          name: "Samsung Galaxy S21",
          price: 22000000,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 3,
          name: "OnePlus 9",
          price: 20000000,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 4,
          name: "Xiaomi Mi 11",
          price: 18000000,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 5,
          name: "Oppo Find X3",
          price: 17000000,
          image: "https://via.placeholder.com/150",
        },
      ],
    },
    {
      name: "Laptop",
      products: [
        {
          id: 1,
          name: "MacBook Pro",
          price: 40000000,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          name: "Dell XPS 13",
          price: 35000000,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 3,
          name: "HP Spectre x360",
          price: 32000000,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 4,
          name: "Asus ZenBook",
          price: 30000000,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 5,
          name: "Lenovo ThinkPad X1",
          price: 28000000,
          image: "https://via.placeholder.com/150",
        },
      ],
    },
    {
      name: "Máy Tính Bảng",
      products: [
        {
          id: 1,
          name: "iPad Pro",
          price: 30000000,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          name: "Samsung Galaxy Tab S7",
          price: 22000000,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 3,
          name: "Surface Pro 7",
          price: 25000000,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 4,
          name: "Lenovo Tab P11",
          price: 18000000,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 5,
          name: "Huawei MatePad Pro",
          price: 19000000,
          image: "https://via.placeholder.com/150",
        },
      ],
    },
    {
      name: "Đồng Hồ Thông Minh",
      products: [
        {
          id: 1,
          name: "Apple Watch Series 6",
          price: 12000000,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          name: "Samsung Galaxy Watch 3",
          price: 10000000,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 3,
          name: "Garmin Fenix 6",
          price: 15000000,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 4,
          name: "Fitbit Versa 3",
          price: 7000000,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 5,
          name: "Huawei Watch GT 2",
          price: 5000000,
          image: "https://via.placeholder.com/150",
        },
      ],
    },
    {
      name: "Phụ Kiện",
      products: [
        {
          id: 1,
          name: "AirPods Pro",
          price: 6000000,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          name: "Samsung Galaxy Buds+",
          price: 3000000,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 3,
          name: "Anker PowerCore 10000",
          price: 1000000,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 4,
          name: "Logitech MX Master 3",
          price: 2000000,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 5,
          name: "Sandisk Extreme Pro SSD",
          price: 4000000,
          image: "https://via.placeholder.com/150",
        },
      ],
    },
  ]
</script>

<style scoped></style>
