<template>
  <a-carousel
    arrows
    dots-class="slick-dots slick-thumb"
    effect="scroll x"
  >
    <template #customPaging="props">
      <a>
        <img :src="getImgUrl(props.i)" />
      </a>
    </template>
    <div
      v-for="image in props.images"
      :key="image.publicId"
    >
      <img :src="image.url" />
    </div>
  </a-carousel>
</template>

<script setup>
  // Props với giá trị mặc định
  const props = defineProps({
    images: {
      type: Array,
      default: () => [],
    },
  })

  const getImgUrl = (index) => {
    return props.images[index].url
  }
</script>

<!-- <style scoped>
  /* For demo */
  :deep(.slick-dots) {
    position: relative;
    height: auto;
  }

  :deep(.slick-slide img) {
    border: 5px solid #fff;
    display: block;
    margin: auto;
    max-width: 80%;
  }
  :deep(.slick-arrow) {
    display: none !important;
  }
  :deep(.slick-thumb) {
    bottom: 0px;
  }
  :deep(.slick-thumb li) {
    width: 60px;
    height: 45px;
  }
  :deep(.slick-thumb li img) {
    width: 100%;
    height: 100%;
    filter: grayscale(10%);
    display: block;
  }
  :deep .slick-thumb li.slick-active img {
    width: 100%;
    filter: grayscale(0%);
    border: 1px solid skyblue;
    border-radius: 8px;
  }
</style> -->

<style scoped>
  /* For demo */
  :deep(.slick-dots) {
    position: relative;
    height: auto;
  }

  :deep(.slick-slide img) {
    border: 5px solid #fff;
    display: block;
    margin: auto;
    max-width: 80%;
  }
  :deep(.slick-arrow) {
    display: none !important;
  }

  :deep(.slick-track) {
    display: flex;
    align-items: center;
  }
  :deep(.slick-thumb) {
    bottom: 0px;
    object-fit: contain;
  }
  :deep(.slick-thumb li) {
    width: 60px;
    height: 60px;
    overflow: hidden; /* Hide content outside the border */
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Add transition for smooth effect */
  }
  :deep(.slick-thumb li img) {
    width: 100%;
    height: 100%;
    filter: grayscale(10%);
    display: block;
    object-fit: contain;
  }

  :deep(li.slick-active) {
    width: 60px !important;
  }

  :deep(.slick-dots li.slick-active img) {
    filter: grayscale(0%);
    border-radius: 8px;
    border: 1px solid skyblue;
  }
  :deep(.slick-thumb li:hover) {
    border-radius: 8px;
    transform: scale(1.1); /* Scale up the item on hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add a shadow effect */
  }
</style>
