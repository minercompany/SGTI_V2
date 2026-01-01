import axios from 'axios';

const API_URL = '/api/v1';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const modulesService = {
    // Tasks
    getTasks: async () => {
        const response = await axios.get(`${API_URL}/tasks`, getAuthHeader());
        return response.data;
    },
    createTask: async (task: any) => {
        const response = await axios.post(`${API_URL}/tasks`, task, getAuthHeader());
        return response.data;
    },

    // Socios
    getSocios: async () => {
        const response = await axios.get(`${API_URL}/socios`, getAuthHeader());
        return response.data;
    },
    createSocio: async (socio: any) => {
        const response = await axios.post(`${API_URL}/socios`, socio, getAuthHeader());
        return response.data;
    },

    // Knowledge Base
    getKnowledge: async () => {
        const response = await axios.get(`${API_URL}/knowledge`, getAuthHeader());
        return response.data;
    },
    createKnowledge: async (kb: any) => {
        const response = await axios.post(`${API_URL}/knowledge`, kb, getAuthHeader());
        return response.data;
    }
};
