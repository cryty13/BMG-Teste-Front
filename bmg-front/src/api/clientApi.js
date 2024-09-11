// clientApi.js
import axios from 'axios';

const API_URL = 'https://localhost:9005/api/client';

export const createClient = async (clientData) => {
  const response = await axios.post(API_URL, clientData, {
    headers: {
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  });
  return response.data;
};

export const fetchClients = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  });
  return response.data;
};

export const deleteClient = async (clientId) => {
  const response = await axios.delete(API_URL+"/"+`${clientId}`, {
    headers: {
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  });
  return response.data;
};