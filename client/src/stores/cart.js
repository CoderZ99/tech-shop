// stores/cart.js (Pinia store)
import { defineStore } from "pinia"

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [],
    cartTotal: 0,
  }),
  // Getters
  getters: {
    /**
     * Retrieves the cart items from the state.
     *
     * @return {Array} The array of cart items.
     */
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
    // Update cart total
    updateCartTotal(total) {
      state.cartTotal = total
    },
    // Update cart items
    updateCartItems(items) {
      state.cartItems = items
    },
    // Remove item from cart
    removeProductFromCart(index) {
      state.cartItems.splice(index, 1)
      console.log(`Cart items updated: ${this.cartItems}`)
    },
    // Clear cart
    clearCart() {
      state.cartItems = []
    },
  },
})
