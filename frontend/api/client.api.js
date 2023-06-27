import axios from "axios";
import { apiLink } from "./config";

export function getClients(query={}) {
  return axios.get(`${apiLink}client/`, {params: query});
}