// stores/dashboardStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useDashboardStore = defineStore('dashboard', () => {
    const selectedTab = ref("user") // User tab by default

    const setUser = () => {
        selectedTab.value = "user"
    }
    
    const setProduct = () => {
        selectedTab.value = "product"
    }

    const setOrder = () => {   
        selectedTab.value = "order"
    }

    return {
        selectedTab,
        setUser,
        setProduct,
        setOrder
    }
})
