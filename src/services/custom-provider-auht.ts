import api from './api';
import { UserParams } from './emailPassword-auth';
import { storage } from './local-storage';

export interface User {
  id: string;
  email: string;
}

export interface UserCredential {
  accessToken: string;
  user: User
}

const signIn = async (params: UserParams): Promise<UserCredential> => {
  const result = await api.post('/login', params);
  return result.data;
};

const signUp = async (params: UserParams): Promise<UserCredential> => {
  const result = await api.post('/register', params);
  return result.data;
};

const setAuthToken = (token = '') => {
  storage.setItem('token', token);
};

export default {
  signIn,
  signUp,
  setAuthToken,
};
