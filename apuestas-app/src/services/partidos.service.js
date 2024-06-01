import { CORE_API_URL } from "@/constants/session";
import axios from "axios";

const api = axios.create({
  baseURL: CORE_API_URL,
});

export const getAllPartidos = async () => {
  return api.get(`/partido`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getPartidoById = async (id) => {
  return api.get(`/partido/partido/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const addPartido = async (data) => {
  return api.post(`/partido`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updatePartido = async (id, data) => {
  return api.put(`/partido/${id}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const deletePartido = async (id) => {
  return api.delete(`/partido/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const finalizarPartido = async (data) => {
  return api.post(`/finalizacion`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const getFinalizados = async () => {
  return api.get(`/finalizacion`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};