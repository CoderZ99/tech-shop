import api from "./api";

// Auth endpoint
const path = "/api/v1/product";

// Get all products
export const fetchProducts = async (query) => {
  try {
    // Define endpoint
    const endpoint = `${path}/`;
    // Call API
    const response = await api.get(endpoint, { params: query });
    console.log(`fetchProducts ~ response:`, response);

    // Return data
    return response;
  } catch (error) {
    console.log(`fetchProducts ~ error:`, error.response.data);
    throw error.response.data;
  }
};

// Get product by id
export const getProductById = async (id) => {
  return api.get(`${path}/${id}`);
};

// Get product by detail url
export const getProductByDetailUrl = async (url) => {
  const endpoint = `${path}/detail/${url}`;
  return api.get(endpoint);
};
