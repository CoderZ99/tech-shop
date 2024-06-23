// stores/cartStore.js
import { priceToNumber } from "@/utils/currency"
import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useCartStore = defineStore("cart", () => {
  const items = ref([])

  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const selectedItems = computed(() => {
    return items.value.filter((item) => item.selected)
  })

  const totalSelectedPrice = computed(() => {
    return selectedItems.value.reduce(
      (total, item) => total + priceToNumber(item.price) * item.quantity,
      0
    )
  })

  const addItem = (product, quantity = 1) => {
    const existingItem = items.value.find((item) => item._id === product._id)
    console.log(`🚀 ~ addItem ~ existingItem:`, existingItem)

    if (existingItem) {
      if (existingItem.quantity + 1 > product.stock) {
        return -1
      }
      existingItem.quantity += quantity
      return 1
    } else {
      items.value.push({ ...product, quantity, selected: false })
      return 0
    }
  }

  const removeItem = (productId) => {
    items.value = items.value.filter((item) => item._id !== productId)
  }

  const updateItemQuantity = (productId, quantity) => {
    const item = items.value.find((item) => item._id === productId)
    if (item) {
      item.quantity = quantity
    }
  }

  const selectItem = (productId) => {
    const item = items.value.find((item) => item.id === productId)
    if (item) {
      item.selected = !item.selected
    }
  }

  const selectAllItems = (selected) => {
    items.value.forEach((item) => (item.selected = selected))
  }

  const clearSelectedItems = () => {
    items.value = items.value.filter((item) => item.selected === true)
  }

  const clearCart = () => {
    items.value = []
  }

  return {
    items,
    addItem,
    removeItem,
    updateItemQuantity,
    selectItem,
    selectAllItems,
    clearCart,
    totalItems,
    selectedItems,
    totalSelectedPrice,
  }
})
