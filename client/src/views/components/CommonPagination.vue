<template>
  <div>
    <a-pagination
      :current="current"
      :total="total"
      :pageSize="pageSize"
      @change="handleChange"
      :show-size-changer="false"
      :hideOnSinglePage="true"
      simple
    />
  </div>
</template>

<script setup>
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
      default: 5,
    },
  })

  const emits = defineEmits(["change"])

  const handleChange = (page) => {
    emits("change", page)
  }
</script>
