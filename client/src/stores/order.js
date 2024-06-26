import { defineStore } from "pinia"
import { ref } from "vue"

export const useOrderStore = defineStore("order", () => {
  const details = ref({})

  const setDetails = (data) => {
    details.value = data
    }

  const clearDetails = () => {
    details.value = {}
  }
  return { details, setDetails, clearDetails }
})
