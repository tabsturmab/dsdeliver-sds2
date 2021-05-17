import axios from "axios";

//https://andre-aulas-sds2.herokuapp.com
const API_URL = 'http://192.168.0.26:8085';

export function fetchOrders() {
    return axios(`${API_URL}/orders`);
}

export function confirmDelivery(orderId: number) {
    return axios.put(`${API_URL}/orders/${orderId}/delivered`);
}