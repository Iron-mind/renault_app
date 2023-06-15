import axios from 'axios';
const apiLink = 'http://localhost:8000/'
export function loginUser(data) {
    console.log(data);
  return axios.post(`${apiLink}login/`, data);
}