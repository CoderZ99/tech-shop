// stores/cart.js (Pinia store)
import { defineStore } from "pinia"

export const useAuthStore = defineStore("user", {
  state: () => ({
    token: "",
  }),
  getters: {
    saveToken(state) {
      return state.token
    },
  },
  actions: {
    login(userData) {},
  },
})
