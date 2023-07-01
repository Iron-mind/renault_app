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

export const getOrders = (data) => {
    return orderApi.get('/', {params: data})
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

export const getWorker = (data) => {
    return axios.get('http://localhost:8000/staffSeller/', {params: data})
}

export const getClient = (data) => {
    return axios.get('http://localhost:8000/client/', {params: data})
}