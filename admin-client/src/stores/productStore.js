import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
  const selectedProduct = ref(null)

  function setSelectedProduct(product) {
    selectedProduct.value = product
  }

  function clearSelectedProduct() {
    selectedProduct.value = null
  }

  return {
    selectedProduct,
    setSelectedProduct,
    clearSelectedProduct
  }
})
