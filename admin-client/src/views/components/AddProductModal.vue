<template>
    <a-modal
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      title="Thêm sản phẩm"
    >
      <a-form :form="form">
        <a-form-item label="Tên sản phẩm">
          <a-input v-model:value="formData.name" />
        </a-form-item>
        <a-form-item label="Hình ảnh">
          <input type="file" @change="handleFileChange" />
        </a-form-item>
        <a-form-item label="Hãng">
          <a-input v-model:value="formData.brand" />
        </a-form-item>
        <a-form-item label="Giá">
          <a-input v-model:value="formData.price" type="number" />
        </a-form-item>
        <a-form-item label="Danh mục">
          <a-input v-model:value="formData.category" />
        </a-form-item>
      </a-form>
    </a-modal>
  </template>
  
  <script setup>
  import { reactive, ref } from "vue";
  
  const props = defineProps({
    visible: Boolean,
  });
  
  const emit = defineEmits(["update:visible", "addProduct"]);
  
    const { visible } = ref(props);
    const form = reactive({})
    const formData = ref({
    name: "",
    image: "",
    brand: "",
    price: 0,
    category: "",
  });
  
  const handleOk = () => {
    emit("addProduct", formData.value);
    emit("update:visible", false);
  };
  
  const handleCancel = () => {
    emit("update:visible", false);
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        formData.value.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  </script>
  