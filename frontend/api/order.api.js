import axios from 'axios'

const orderApi = axios.create({
    baseURL:'http://localhost:8000/order/',
});

export const getAllOrders = () => {
    return orderApi.get('/')
}

export const getOrder = (id) => {
    return orderApi.get(`/${id}/`)
}

export const getEspecificOrder = (data) => {
    return axios.get('http://localhost:8000/especificOrder/', data)
}

export const editOrder = (id, task) => {
    return orderApi.put(`/${id}/`, task)
}

export const createOrder = (task) => {
    return orderApi.post('/', task)
}

export const deleteOrder = (id) => {
    return orderApi.delete(`/${id}/`)
}