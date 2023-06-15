import axios from 'axios'
const apiLink = 'http://localhost:8000/'
export const getAllParts = () => {
    return axios.get('http://localhost:8000/parts/')
}

export const getPart = (id) => {
    return axios.get(`http://localhost:8000/parts/${id}/`)
}
