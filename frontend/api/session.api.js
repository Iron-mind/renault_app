import axios from 'axios';
const apiLink = 'http://localhost:8000/'
export function loginUser(data) {
    console.log(data);
  return axios.post(`${apiLink}login/`, data);
}

export function registerUser(data, type='client') {

  return axios.post(`${apiLink+type}/`, data).catch(err => {
    alert(err.message);
  });
}