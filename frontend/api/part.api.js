import axios from 'axios'
import { apiLink } from './config'
export const getAllParts = () => {
    return axios.get(apiLink+'parts/')
}

export const getPart = (id) => {
    return axios.get(apiLink+`parts/${id}/`)
}
