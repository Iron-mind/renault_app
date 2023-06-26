import axios from 'axios'

const demandApi = axios.create({
    baseURL:'http://localhost:8000/demand/',
});

export const createDemand = (task) => {
    return demandApi.post('/', task)
}

export const editDemand = (id, task) => {
    return demandApi.put(`/${id}/`, task)
}

export const getDemand = (data) => {
    return axios.get('http://localhost:8000/demand/', {params: data})
}

export const getAllSellers = () => {
    return axios.get('http://localhost:8000/staffSeller/')
}

export const getAllClients = () => {
    return axios.get('http://localhost:8000/client/')
}
