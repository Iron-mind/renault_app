import axios from 'axios'
import { apiLink } from './config'

const quotationApi = axios.create({
    baseURL:'http://localhost:8000/quotation/',
});

export const getAllQuotation = () => {
    return quotationApi.get('/')
}

export const createQuotation = (data) => {
    return quotationApi.post('/',data)
}

