import axios from 'axios'
import { apiLink } from './config'

const quotationApi = axios.create({
    baseURL:'http://localhost:8000/quotation/',
});
  
export const getAllQuotation = () => {
    return quotationApi.get('/')
}

export const getQuotation = (id) => {
    return quotationApi.get(`/${id}/`)
}

export const getQuotations = (data) => {
    return quotationApi.get(`/`, {params:data})
}

export const editQuotation = (id, data) => {
    return quotationApi.put(`/${id}/`, data)
}

export const createQuotation = (data) => {
    return quotationApi.post('/',data)
}

export const deleteQuotation = (id) => {
    return quotationApi.delete(`/${id}/`)
}

export const getAllCars = () => {
    return axios.get('http://localhost:8000/car/')
}

export const getWorker = (data) => {
    return axios.get('http://localhost:8000/staffSeller/', {params: data})
}

export const getClient = (data) => {
    return axios.get('http://localhost:8000/client/', {params: data})
}

export const getCar = (data) => {
    return axios.get('http://localhost:8000/car/', {params: data})
}


