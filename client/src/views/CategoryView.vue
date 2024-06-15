a
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h2 class="text-2xl font-semibold mb-4">Danh Mục</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="category in categories"
        :key="category.id"
        class="bg-white p-6 rounded shadow-md"
      >
        <img
          :src="category.image"
          :alt="category.name"
          class="w-full h-32 object-cover mb-4"
        />
        <h3 class="text-xl font-semibold">{{ category.name }}</h3>
        <p>{{ category.description }}</p>
        <button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Xem sản phẩm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  const categories = [
    {
      id: 1,
      name: "Danh mục 1",
      description: "Mô tả danh mục 1",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Danh mục 2",
      description: "Mô tả danh mục 2",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Danh mục 3",
      description: "Mô tả danh mục 3",
      image: "https://via.placeholder.com/150",
    },
  ]
</script>

<style scoped></style>
