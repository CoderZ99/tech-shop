import api from "./api";

// Auth endpoint
const path = "/api/v1/auth";

export const loginUser = async (userData) => {
  try {
    // Define endpoint
    const endpoint = `${path}/login`;
    // Call API
    const response = await api.post(endpoint, userData);
    console.log(`🚀 ~ login ~ response:`, response);

    return response;
  } catch (error) {
    console.log(`🚀 ~ register ~ error:`, error.response.data);
    throw error.response.data;
  }
};

export const register = async (userData) => {
  console.log(`🚀 ~ register ~ userData:`, userData);
  try {
    // Define endpoint
    const endpoint = `${path}/register`;
    // Call API
    const response = await api.post(endpoint, userData);
    console.log(`🚀 ~ register ~ response:`, response);

    // Return data
    return response;
  } catch (error) {
    console.log(`🚀 ~ register ~ error:`, error.response.data);
    throw error.response.data;
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await api.post(`${path}/verify`, { verifyToken: token });
    console.log(`verifyEmail ~ response: ${response}`);
    return response;
  } catch (error) {
    throw error.response?.data || { message: "Có lỗi xảy ra" };
  }
};
// export const logout = async () => {
//   const endpoint = `${path}/logout`
//   const response = await api.post(endpoint)
//   console.log(`🚀 ~ logout ~ response:`, response)
// }

export const forgotPassword = async (email) => {
  try {
    const response = await api.post(`${path}/forgot`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Có lỗi xảy ra" };
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post(`${path}/reset`, { token, newPassword });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Có lỗi xảy ra" };
  }
};

export const changePassword = async (passwordData) => {
  try {
    const response = await api.post(`${path}/change-password`, passwordData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Có lỗi xảy ra" };
  }
};
