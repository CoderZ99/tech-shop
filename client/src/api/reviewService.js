import api from "./api";

// Auth endpoint
const path = "/api/v1/review";

export const getProductReviews = async (productId) => {
  try {
    const endpoint = `${path}/product/${productId}`;
    const response = await api.get(endpoint);
    return response;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const createProductReview = async (productId, reviewData) => {
  try {
    const endpoint = `${path}/product/${productId}`;
    return await api.post(endpoint, reviewData);
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const updateProductReview = async (reviewId, reviewData) => {
  try {
    const endpoint = `${path}/update/${reviewId}`;
    return await api.put(endpoint, reviewData);
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const deleteProductReview = async (reviewId) => {
  try {
    const endpoint = `${path}/delete/${reviewId}`;
    return await api.delete(endpoint);
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const getUserReviews = async () => {
  try {
    const endpoint = `${path}/user`;
    const response = await api.get(endpoint);
    return response;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};
