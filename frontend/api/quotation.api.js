import axios from 'axios'

export const getAllQuotation = () => {
    return axios.get('http://localhost:8000/quotation/')
}

