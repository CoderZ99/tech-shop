import api from "./api";

// order endpoint
const path = "/api/v1/product"

export const fetchProducts = async () => {
    try {
        const endpoint = `${path}/`
        const response = await api.get(endpoint)
        console.log(`🚀 ~ fetchProducts ~ response:`, response)
        return response
    } catch (error) {
        console.log(error.response.data)
        throw error.response.data
    }
};
  

export const updateProduct = async (id, product) => {
    try {
        const endpoint = `${path}/${id}`
        const response = await api.put(endpoint, product)
        console.log(`🚀 ~ updateProduct ~ response:`, response)
        return response
    } catch (error) {
        console.log(error.response.data)
        throw error.response.data
    }
};

export const deleteProduct = async (id, product) => {
    try {
        const endpoint = `${path}/delete/${id}`
        const response = api.put(endpoint, product)
        console.log(`🚀 ~ deleteProduct ~ response:`, response)
        return response
    } catch (error) {
        console.log(error.response.data)
        throw error.response.data
    }
};

export const createProduct = async (product) => {
    try {
        const endpoint = `${path}/create`
        const response = await api.post(endpoint, product)
        console.log(`🚀 ~ createProduct ~ response:`, response)
        return response
    } catch (error) {
        console.log(error.response.data)
        throw error.response.data
    }
}