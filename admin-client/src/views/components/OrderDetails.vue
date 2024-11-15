<template>
  <a-modal
    v-model:visible="props.visible"
    title="Chi Tiết Đơn Hàng"
    @cancel="handleCancel"
    :footer="null"
  >
    <p><strong>Mã đơn hàng:</strong> {{ props.order.value._id }}</p>
    <p>
      <strong>Ngày đặt:</strong>
      {{ new Date(props.order.value.orderAt).toLocaleDateString("vi-VN") }}
    </p>
    <p>
      <strong>Hình thức thanh toán: </strong
      >{{ props.order.value.paymentMethod }}
    </p>
    <p v-if="props.order.value.isPaid === true">
      <strong>Đã thanh toán</strong>
    </p>
    <p v-if="props.order.value.isPaid === false">
      <strong>Chưa thanh toán</strong>
    </p>
    <a-divider />
    <p>
      <strong>Tên người nhận:</strong> {{ props.order.value.receiver.name }}
    </p>
    <p>
      <strong>Số điện thoại:</strong> {{ props.order.value.receiver.phone }}
    </p>
    <p>
      <strong>Địa chỉ nhận:</strong> {{ props.order.value.receiver.address }}
    </p>
    <a-divider />
    <div
      v-for="(item, index) in props.order.value.orderItems"
      :key="index"
    >
      <p>
        <strong>Tên sản phẩm:</strong> {{ item.name }} -
        <strong>Số lượng:</strong>
        {{ item.quantity }}
      </p>
      <p>Giá sản phẩm: {{ item.price }}đ</p>
    </div>
    <a-divider />
    <div class="mx-auto">
      <strong>Tổng tiền: </strong> {{ props.order.value.totalPrice }}đ
    </div>
  </a-modal>
</template>

<script setup>
  import { onMounted } from "vue"
  //   import { Modal } from "ant-design-vue"

  const props = defineProps({
    visible: {
      type: Boolean,
      required: true,
    },
    order: {
      type: Object,
      required: true,
    },
  })

  const emit = defineEmits(["close"])

  const handleCancel = () => {
    emit("close")
  }

  onMounted(() => {
    console.log(`🚀 ~ onMounted ~ props.order:`, props.order)
  })
</script>
