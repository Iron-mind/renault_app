import axios from 'axios'

const partsApi = axios.create({
    baseURL:'http://localhost:8000/parts/',
});

export const getAllParts = () => {
    return partsApi.get('/')
}

export const getPart = (id) => {
    return partsApi.get(`/${id}/`)
}

export const editPart = (id, task) => {
    return partsApi.put(`/${id}/`, task)
}

export const createPart = (task) => {
    return partsApi.post('/', task)
}

export const deletePart = (id) => {
    return partsApi.delete(`/${id}/`)
}
