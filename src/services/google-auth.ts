import {
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import baseAuthService, { BaseUserCredential } from './base-auth';

const signIn = async (): Promise<BaseUserCredential> => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(baseAuthService.getAuth(), provider);
  return result;
};

export default {
  signIn,
  ...baseAuthService,
};
