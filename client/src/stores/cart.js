// stores/cart.js (Pinia store)
import { defineStore } from "pinia"

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [],
    cartTotal: 0,
  }),
  // Getters
  getters: {
    getCartItems(state) {
      return state.cartItems
    },
    getCountItems(state) {
      return state.cartItems.length
    },
    // Get selected items
    getSelectedItems(state) {
      let selectedItems = state.cartItems.filter(
        (item) => item.selected === true
      )
      return selectedItems
    },
    getCartTotal(state) {
      return state.cartTotal
    },
  },
  actions: {
    // Actions update cartItems
    updateCartItems(cartItems) {
      this.cartItems = [...cartItems]
      console.table(`Cart items updated: ${this.cartItems}`)
    },

    // Actions update cartTotal
    updateCartTotal(cartTotal) {
      this.cartTotal = cartTotal
      console.log(`Cart total updated: ${this.cartTotal}`)
    },
  },
})
