import { CORE_API_URL } from "@/constants/session";
import axios from "axios";

const api = axios.create({
  baseURL: CORE_API_URL,
});

export const getAllEquipoLocal = async () => {
  return api.get(`/local`)
      .then((response) => {
          return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addEquipoLocal = async (equipo) => {
  return api.post(`/local`, equipo)
      .then((response) => {
          return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteEquipoLocal = async (id) => {
  return api.delete(`/local/${id}`)
      .then((response) => {
          return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateEquipoLocal = async (id, equipo) => {
  return api.put(`/local/${id}`, equipo)
      .then((response) => {
          return response.data;
    })
    .catch((error) => {
      return error;
    });
};
