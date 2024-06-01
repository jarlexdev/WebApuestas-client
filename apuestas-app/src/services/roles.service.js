import axios from 'axios';
import { CORE_API_URL } from "@/constants/session";

const api = axios.create({
  baseURL: CORE_API_URL,
});

export const getRoles = async () => {
  try {
    const response = await api.get('/roles');
    return response.data;
  } catch (error) {
    console.error('Error getting roles:', error);
    throw error;
  }
};

export const addRole = async (role) => {
  try {
    const response = await api.post('/roles', role);
    return response.data;
  } catch (error) {
    console.error('Error adding role:', error);
    throw error;
  }
};

export const deleteRole = async (id) => {
  try {
    const response = await api.delete(`/roles/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting role:', error);
    throw error;
  }
};

export const updateRole = async (id, role) => {
  try {
    const response = await api.put(`/roles/${id}`, role);
    return response.data;
  } catch (error) {
    console.error('Error updating role:', error);
    throw error;
  }
};
