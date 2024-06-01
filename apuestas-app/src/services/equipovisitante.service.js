import { CORE_API_URL } from "@/constants/session";
import axios from "axios";

const api = axios.create({
  baseURL: `${CORE_API_URL}/visitante`,
});

export const getAllEquipoVisitante = async () => {
  return api.get(`/`)
      .then((response) => {
        return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addEquipoVisitante = async (equipo) => {
  return api.post(`/`, equipo)
      .then((response) => {
        return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteEquipoVisitante = async (id) => {
  return api.delete(`/${id}`)
      .then((response) => {
        return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateEquipoVisitante = async (id, equipo) => {
  return api.put(`/${id}`, equipo)
      .then((response) => {
        return response.data;
    })
    .catch((error) => {
      return error;
    });
};
