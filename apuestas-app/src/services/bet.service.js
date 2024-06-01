import { CORE_API_URL } from "@/constants/session";
import axios from "axios";

const api = axios.create({
  baseURL: CORE_API_URL,
});

// Obtener todas las apuestas
export const getAllApuestas = async () => {
  return api.get(`/apuesta`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

// Obtener una apuesta por ID
export const getApuestaById = async (id) => {
  return api.get(`/apuesta/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}; 

// Crear una nueva apuesta
export const createApuesta = async (data) => {
  return api.post(`/apuesta`, data)
      .then((response) => {
        console.log(response)
        return response.data;
        c
    })
    .catch((error) => {
      return error.response.data;
    });
};

// Actualizar una apuesta por ID
export const updateApuesta = async (id, data) => {
  return api.put(`/apuesta/${id}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

// Eliminar una apuesta por ID
export const deleteApuesta = async (id) => {
  return api.delete(`/apuesta/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const getApuestasByUserId = async (idUsuario) => {
  return api.get(`apuesta/usuario/${idUsuario}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};