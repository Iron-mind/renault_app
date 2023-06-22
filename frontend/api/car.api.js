import { apiLink } from "./config";
import axios from "axios";
export const getAllCars = (query) => {
    
    return axios.get(apiLink+'car/', {params: query})
    }