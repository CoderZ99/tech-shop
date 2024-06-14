// stores/cart.js (Pinia store)
import { defineStore } from "pinia"

//
// User store
export const useUserStore = defineStore("user", {
  state: () => ({
    username: "",
    name: "",
    image: "",
    phone: "",
    address: "",
  }),
  getters: {
    getUsername(state) {
      return state.username
    },
    getName(state) {
      return state.name
    },
    getImage(state) {
      return state.image
    },
    getPhone(state) {
      return state.phone
    },
    getAddress(state) {
      return state.address
    },
  },
  actions: {},
})
