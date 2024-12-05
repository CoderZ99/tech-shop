import api from "./api";

const path = "/api/v1/order";

export const createOrder = async (order) => {
  try {
    const endpoint = `${path}/create`;
    console.log(`🚀 ~ createOrder ~ order:`, order);
    const response = await api.put(endpoint, order);
    console.log(`🚀 ~ createOrder ~ response:`, response);
    return response;
  } catch (error) {
    console.log(`🚀 ~ createOrder ~ error:`, error.response.data);
    throw error.response.data;
  }
};

export const fetchOrders = async (username) => {
  try {
    console.log(`🚀 ~ fetchOrders ~ username:`, username);
    const endpoint = `${path}/user/${username}`;
    const response = await api.get(endpoint);
    console.log(`🚀 ~ fetchOrders ~ response:`, response);
    return response;
  } catch (error) {
    console.log(`🚀 ~ fetchOrders ~ error:`, error.response.data);
    throw error.response.data;
  }
};

export const getOrders = async (id) => {
  try {
    console.log(`🚀 ~ getOrders ~ orderId:`, id);
    const endpoint = `${path}/${id}`;
    const response = await api.get(endpoint);
    console.log(`🚀 ~ getOrders ~ response:`, response);
    return response;
  } catch (error) {
    console.log(`🚀 ~ getOrders ~ error:`, error);
    throw error.response.data;
  }
};

export const updateOrder = async (order) => {
  try {
    const endpoint = `${path}/payment`;
    const response = await api.put(endpoint, { id: order._id, isPaid: true });
    console.log(`🚀 ~ updateOrder ~ response:`, response);
    return response;
  } catch (error) {
    console.log(`🚀 ~ updateOrder ~ error:`, error.response.data);
    throw error.response.data;
  }
};

export const cancelOrder = async (
  orderId,
  orderItems,
  status = "cancelled",
) => {
  try {
    console.log(`updateOrderStatus.orderId:`, orderId);
    console.log(`updateOrderStatus.orderItems:`, orderItems);
    console.log(`updateOrderStatus.status:`, status);
    const endpoint = `${path}/update`;
    const response = await api.put(endpoint, {
      id: orderId,
      status: status,
      orderItems: orderItems,
    });
    console.log(`updateOrderStatus.response:`, response);
    return response;
  } catch (error) {
    console.log(`updateOrderStatus.error:`, error.response.data);
    throw error.response.data;
  }
};
