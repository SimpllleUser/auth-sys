import api from './api';
import { UserParams } from './emailPassword-auth';

const signIn = async (params: UserParams) => {
  /// TODO add set property token by api
  const result = await api.post('/login', params);
  return result.data;
};

const signUp = async (params: UserParams) => {
  /// TODO add set property token by api
  const result = await api.post('/register', params);
  return result.data;
};

const signOut = () => {
  /// TODO add reset property token by api
};

export default {
  signIn,
  signUp,
};
