import api from "./api";

// Auth endpoint
const path = "/api/v1/review/product";

export const getProductReviews = async (productId) => {
  try {
    const endpoint = `${path}/${productId}`;
    const response = await api.get(endpoint);
    return response;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const createProductReview = async (productId, reviewData) => {
  try {
    const endpoint = `${path}/${productId}`;
    return await api.post(endpoint, reviewData);
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};
