import api from './axios';


export const signin = async (credentials) => {
  const response = await api.post('/auth/signin', credentials);
  return response.data;
};


export const signup = async (userData) => {
  const response = await api.post('/auth/signup', userData);
  return response.data;
};