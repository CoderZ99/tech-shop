<template>
  <a-result
    status="404"
    title="404"
    sub-title="Xin lỗi, trang bạn truy cập không tồn tại."
  >
    <template #extra>
      <a-button type="primary" @click="() => $router.go(-1)"  >Quay trở lại</a-button>
    </template>
  </a-result>
</template>

<script>
</script>
