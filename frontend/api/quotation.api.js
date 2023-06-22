import axios from 'axios'
import { apiLink } from './config'

export const getAllQuotation = () => {
    return axios.get(apiLink+'quotation/')
}

