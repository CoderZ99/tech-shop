<template>
  <div class="container mx-auto px-4 py-6">
    <!-- Carousel -->
    <div class="mb-12">
      <a-carousel autoplay class="rounded-lg shadow-lg">
        <div
          v-for="(banner, index) in banners"
          :key="index"
          class="relative h-[400px] overflow-hidden"
        >
          <img
            :src="banner.image"
            :alt="banner.title"
            class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h3 class="text-2xl font-bold text-white">{{ banner.title }}</h3>
          </div>
        </div>
      </a-carousel>
    </div>

    <!-- Categories -->
    <!-- <div class="mb-12">
      <h2 class="mb-6 text-3xl font-bold">Danh mục sản phẩm</h2>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <a-card
          v-for="category in categories"
          :key="category.id"
          class="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
          :bordered="false"
        >
          <div class="flex flex-col items-center justify-center text-center">
            <div class="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <img :src="category.icon" :alt="category.name" class="h-6 w-6 text-gray-700" />
            </div>
            <p class="font-medium text-gray-800">{{ category.name }}</p>
          </div>
        </a-card>
      </div>
    </div> -->

    <!-- Sản phẩm bán chạy nhất -->
    <div class="mb-12">
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-3xl font-bold">Sản phẩm bán chạy nhất</h2>
        <!-- <a-button type="link" class="text-lg" @click="router.push('/products?sort=sold:desc')">Xem tất cả</a-button> -->
      </div>
      <a-spin :spinning="loading">
        <div class="relative">
          <a-button 
            class="absolute -left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full flex h-8 w-8 items-center justify-center bg-white shadow-md hover:bg-gray-50"
            shape="circle"
            @click="scrollProducts('bestselling', 'left')"
          >
            <template #icon><LeftOutlined class="text-gray-600" /></template>
          </a-button>
          <a-button 
            class="absolute -right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full flex h-8 w-8 items-center justify-center bg-white shadow-md hover:bg-gray-50"
            shape="circle"
            @click="scrollProducts('bestselling', 'right')"
          >
            <template #icon><RightOutlined class="text-gray-600" /></template>
          </a-button>
          <div class="overflow-hidden px-4">
            <div 
              ref="bestsellingContainer"
              class="flex gap-4 transition-transform duration-300 ease-in-out"
              :style="{ transform: `translateX(-${scrollPosition.bestselling}px)` }"
            >
              <div 
                v-for="item in bestsellingProducts" 
                :key="item._id"
                class="w-[220px] flex-shrink-0 flex"
              >
                <router-link :to="`/products/${item.slug}`" class="w-full">
                  <a-card 
                    hoverable 
                    :body-style="{ padding: '16px' }"
                    class="h-full group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <template #cover>
                      <div class="relative aspect-square overflow-hidden">
                        <a-image
                          :preview="false"
                          v-if="item?.images[0]?.url"
                          :src="item.images[0].url"
                          :alt="item.name"
                          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div v-if="item.discount > 0" class="absolute left-2 top-2 rounded bg-red-500 px-2 py-1 text-sm text-white">
                          -{{ item.discount }}%
                        </div>
                      </div>
                    </template>
                    <h3 class="mb-2 line-clamp-2 min-h-[48px] text-lg font-medium">{{ item.name }}</h3>
                    <p class="mb-2 text-xl font-bold text-red-500">{{ formatCurrency(item.price) }}</p>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <StarFilled class="mr-1 text-yellow-400" />
                        <span class="text-base">{{ item.rating }} ({{ item.numReviews }})</span>
                      </div>
                      <span class="text-base text-gray-500">Đã bán {{ item.sold }}</span>
                    </div>
                  </a-card>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </a-spin>
    </div>

    <!-- Sản phẩm được đánh giá cao nhất -->
    <div class="mb-12">
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-3xl font-bold">Sản phẩm được đánh giá hàng đầu</h2>
        <!-- <a-button type="link" class="text-lg" @click="router.push({ path: '/products', query: { sort: 'rating:desc' }})">Xem tất cả</a-button> -->
      </div>
      <a-spin :spinning="loading">
        <div class="relative">
          <a-button 
            class="absolute -left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full flex h-8 w-8 items-center justify-center bg-white shadow-md hover:bg-gray-50"
            shape="circle"
            @click="scrollProducts('toprated', 'left')"
          >
            <template #icon><LeftOutlined class="text-gray-600" /></template>
          </a-button>
          <a-button 
            class="absolute -right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full flex h-8 w-8 items-center justify-center bg-white shadow-md hover:bg-gray-50"
            shape="circle"
            @click="scrollProducts('toprated', 'right')"
          >
            <template #icon><RightOutlined class="text-gray-600" /></template>
          </a-button>
          <div class="overflow-hidden px-4">
            <div 
              ref="topratedContainer"
              class="flex gap-4 transition-transform duration-300 ease-in-out"
              :style="{ transform: `translateX(-${scrollPosition.toprated}px)` }"
            >
              <div 
                v-for="item in topRatedProducts" 
                :key="item._id"
                class="w-[220px] flex-shrink-0 flex"
              >
                <router-link :to="`/products/${item.slug}`" class="w-full">
                  <a-card 
                    hoverable 
                    :body-style="{ padding: '16px' }"
                    class="h-full group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <template #cover>
                      <div class="relative aspect-square overflow-hidden">
                        <a-image
                          :preview="false"
                          v-if="item?.images[0]?.url"
                          :src="item.images[0].url"
                          :alt="item.name"
                          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div v-if="item.discount > 0" class="absolute left-2 top-2 rounded bg-red-500 px-2 py-1 text-sm text-white">
                          -{{ item.discount }}%
                        </div>
                      </div>
                    </template>
                    <h3 class="mb-2 line-clamp-2 min-h-[48px] text-lg font-medium">{{ item.name }}</h3>
                    <p class="mb-2 text-xl font-bold text-red-500">{{ formatCurrency(item.price) }}</p>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <StarFilled class="mr-1 text-yellow-400" />
                        <span class="text-base">{{ item.rating }} ({{ item.numReviews }})</span>
                      </div>
                      <span class="text-base text-gray-500">Đã bán {{ item.sold }}</span>
                    </div>
                  </a-card>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </a-spin>
    </div>

    <!-- Sản phẩm mới nhất -->
    <div class="mb-12">
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-3xl font-bold">Sản phẩm mới nhất</h2>
        <!-- <a-button type="link" class="text-lg" @click="router.push('/products?sort=createdAt:desc')">Xem tất cả</a-button> -->
      </div>
      <a-spin :spinning="loading">
        <div class="relative">
          <a-button 
            class="absolute -left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full flex h-8 w-8 items-center justify-center bg-white shadow-md hover:bg-gray-50"
            shape="circle"
            @click="scrollProducts('newest', 'left')"
          >
            <template #icon><LeftOutlined class="text-gray-600" /></template>
          </a-button>
          <a-button 
            class="absolute -right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full flex h-8 w-8 items-center justify-center bg-white shadow-md hover:bg-gray-50"
            shape="circle"
            @click="scrollProducts('newest', 'right')"
          >
            <template #icon><RightOutlined class="text-gray-600" /></template>
          </a-button>
          <div class="overflow-hidden px-4">
            <div 
              ref="newestContainer"
              class="flex gap-4 transition-transform duration-300 ease-in-out"
              :style="{ transform: `translateX(-${scrollPosition.newest}px)` }"
            >
              <div 
                v-for="item in newestProducts" 
                :key="item._id"
                class="w-[220px] flex-shrink-0 flex"
              >
                <router-link :to="`/products/${item.slug}`" class="w-full">
                  <a-card 
                    hoverable 
                    :body-style="{ padding: '16px' }"
                    class="h-full group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <template #cover>
                      <div class="relative aspect-square overflow-hidden">
                        <a-image
                          :preview="false"
                          v-if="item?.images[0]?.url"
                          :src="item.images[0].url"
                          :alt="item.name"
                          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div v-if="item.discount > 0" class="absolute left-2 top-2 rounded bg-red-500 px-2 py-1 text-sm text-white">
                          -{{ item.discount }}%
                        </div>
                      </div>
                    </template>
                    <h3 class="mb-2 line-clamp-2 min-h-[48px] text-lg font-medium">{{ item.name }}</h3>
                    <p class="mb-2 text-xl font-bold text-red-500">{{ formatCurrency(item.price) }}</p>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <StarFilled class="mr-1 text-yellow-400" />
                        <span class="text-base">{{ item.rating }} ({{ item.numReviews }})</span>
                      </div>
                      <span class="text-base text-gray-500">Đã bán {{ item.sold }}</span>
                    </div>
                  </a-card>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </a-spin>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchProducts } from "../api/productService";
import { formatCurrency } from "@/utils/currency";
import { StarFilled, LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(true);
const bestsellingContainer = ref(null);
const topratedContainer = ref(null);
const newestContainer = ref(null);

const scrollPosition = ref({
  bestselling: 0,
  toprated: 0,
  newest: 0
});

const scrollProducts = (section, direction) => {
  const container = {
    bestselling: bestsellingContainer.value,
    toprated: topratedContainer.value,
    newest: newestContainer.value
  }[section];

  if (!container) return;

  const cardWidth = 220; // Chiều rộng cố định của card
  const gapWidth = 16; // Khoảng cách giữa các card (gap-4 = 16px)
  const scrollAmount = (cardWidth + gapWidth) * 4; // Di chuyển 4 card mỗi lần
  const maxScroll = container.scrollWidth - container.offsetWidth;
  
  if (direction === 'right') {
    scrollPosition.value[section] = Math.min(
      scrollPosition.value[section] + scrollAmount,
      maxScroll
    );
  } else {
    scrollPosition.value[section] = Math.max(
      scrollPosition.value[section] - scrollAmount,
      0
    );
  }
};

// State
const banners = ref([
  {
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    title: "Khám phá công nghệ mới",
  },
  {
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    title: "Thiết bị thông minh",
  },
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    title: "Giải pháp số",
  },
]);

const categories = ref([
  { id: 1, name: 'Điện thoại', icon: '/icons/phone.svg' },
  { id: 2, name: 'Laptop', icon: '/icons/laptop.svg' },
  { id: 3, name: 'Máy tính bảng', icon: '/icons/tablet.svg' },
  { id: 4, name: 'Tai nghe', icon: '/icons/headphone.svg' },
  { id: 5, name: 'Đồng hồ', icon: '/icons/watch.svg' },
  { id: 6, name: 'Phụ kiện', icon: '/icons/accessory.svg' },
]);

const bestsellingProducts = ref([]);
const topRatedProducts = ref([]);
const newestProducts = ref([]);

// Fetch data
const fetchBestsellingProducts = async () => {
  try {
    const response = await fetchProducts({ sort: "sold:desc", page: 1, limit: 10 }
    );
    bestsellingProducts.value = response?.data?.products?.docs;
  } catch (error) {
    console.error('Error fetching bestselling products:', error);
  }
};

const fetchTopRatedProducts = async () => {
  try {
    const response = await fetchProducts({ sort: "rating:desc", page: 1, limit: 10 }
    );
    topRatedProducts.value = response?.data?.products?.docs;
  } catch (error) {
    console.error('Error fetching top rated products:', error);
  }
};

const fetchNewestProducts = async () => {
  try {
    const response = await fetchProducts({ sort: "createdAt:desc",  limit: 10 });
  newestProducts.value = response?.data?.products?.docs;
  } catch (error) {
    console.error('Error fetching newest products:', error);
  }
};

// Fetch all data on mount
onMounted(async () => {
  try {
    await Promise.all([
      fetchBestsellingProducts(),
      fetchTopRatedProducts(),
      fetchNewestProducts(),
    ]);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
});
</script>
