import { CORE_API_URL } from "@/constants/session";
import axios from "axios";

const api = axios.create({
  baseURL: CORE_API_URL,
});

export const createUser = async (data) => {
    console.log(data);
    return api.post(`/users`, data)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
    });
};

export const loginUser = async (credentials) => {
    return api.post(`users/login`, credentials)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
    });
};

export const getUserById = async (id) => {
  return api.get(`users/usuario/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};