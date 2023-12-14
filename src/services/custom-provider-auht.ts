import api from './api';
import { UserParams } from './emailPassword-auth';

const signIn = async (params: UserParams) => {
  const result = await api.post('/login', params);
  return result.data;
};

const signUp = async (params: UserParams) => {
  const result = await api.post('/register', params);
  return result.data;
};

export default {
  signIn,
  signUp,
};
