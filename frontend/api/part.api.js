import axios from 'axios'

export const getAllParts = () => {
    return axios.get('http://localhost:8000/parts/')
}

export const getPart = (id) => {
    return axios.get(`http://localhost:8000/parts/${id}/`)
}
