<template>
  <a-modal
    v-model:visible="props.visible"
    title="Cập Nhật Trạng Thái Đơn Hàng"
    @ok="handleUpdateStatus"
    @cancel="handleCancel"
  >
    <div class="space-y-4">
      <div class="flex items-center gap-2">
        <span class="font-medium">Mã đơn hàng:</span>
        <a-tag color="blue">{{ props.order.value._id.toUpperCase() }}</a-tag>
      </div>

      <div class="flex items-center gap-2">
        <span class="font-medium">Trạng thái hiện tại:</span>
        <a-tag :color="getStatusColor(props.order.value.status)">
          {{ getStatusLabel(props.order.value.status) }}
        </a-tag>
      </div>

      <div class="flex items-center gap-2">
        <span class="font-medium">Trạng thái mới:</span>
        <a-select
          v-model:value="newStatus"
          style="width: 200px"
        >
          <a-select-option
            v-for="status in orderStatuses"
            :key="status.value"
            :value="status.value"
          >
            {{ status.label }}
          </a-select-option>
        </a-select>
      </div>
    </div>
  </a-modal>
</template>

<script setup>
  import { ref } from "vue"
  import { message } from "ant-design-vue"
  import { getStatusLabel, getStatusColor, orderStatuses } from "@/utils/utils"

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

  const emit = defineEmits(["cancel", "update"])

  const newStatus = ref("")

  const handleUpdateStatus = () => {
    if (newStatus.value === "") {
      message.warning("Vui lòng chọn trạng thái mới")
      return
    }
    if (newStatus.value === props.order.value.status) {
      message.warning(
        "Vui lòng chọn trạng thái mới khác với trạng thái hiện tại"
      )
      return
    } else {
      emit("update", newStatus.value)
      return
    }
  }

  const handleCancel = () => {
    emit("cancel")
  }
</script>

<style scoped>
  .space-y-4 > * + * {
    margin-top: 1rem;
  }
</style>
