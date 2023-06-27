import axios from 'axios';
import { apiLink } from './config';
export function loginUser(data) {
    console.log(data);
  return axios.post(`${apiLink}login/`, data);
}

export function registerUser(data, type='client') {

  return axios.post(`${apiLink+type}/`, data).catch(err => {
    alert(err.message);
  });
}

export function updateUser(data, id, type='client') {
  return axios.put(`${apiLink+type}/${id}/`, data).catch(err => {
    alert(err.message);
  });
}

export function registerStaff(data, type='staff') {
  return axios.post(`${apiLink+type}/`, data).catch(err => {
    alert(err.message);
  });
}