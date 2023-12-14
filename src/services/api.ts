import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_DEFAULT_API_URL,
});

export const setAuthToken = (token: string) => {
  api.defaults.headers.common.Authorization = token;
};

export default api;
