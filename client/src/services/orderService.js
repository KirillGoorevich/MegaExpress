import http from "./httpService";
const apiUrl = process.env.REACT_APP_API_URL;

export const createOrder = (order) => http.post(`${apiUrl}/orders/`, order);

export const getOrders = () => http.get(`${apiUrl}/orders/orders`);

export const deleteOrder = (userId) => http.delete(`${apiUrl}/orders/${userId}`);