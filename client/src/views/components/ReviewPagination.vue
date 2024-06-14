<template>
  <div>
    <a-pagination
      :total="total"
      :current="current"
      :pageSize="pageSize"
      @change="handleChange"
    />
  </div>
</template>

<script setup>
  import { defineEmits, defineProps } from "vue"

  const props = defineProps({
    total: {
      type: Number,
      required: true,
    },
    current: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 5, // Đặt giá trị mặc định là 5
    },
  })

  const emits = defineEmits(["change"])

  const handleChange = (page) => {
    emits("change", page)
  }
</script>
