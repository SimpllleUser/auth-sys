import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Nullable } from '@/types/base';

import baseAuthService, { BaseUserCredential } from './base-auth.service';

export interface UserParams {
  email: string;
  password: string;
}

export enum AuthActions {
  SignIn = 'SignIn',
  SignUp = 'SignUp',
}

type AuthActionFactory = (
  auth: Auth,
  email: string,
  password: string
) => Promise<BaseUserCredential>;

const actionsAuth: Record<AuthActions, AuthActionFactory> = {
  [AuthActions.SignIn]: signInWithEmailAndPassword,
  [AuthActions.SignUp]: createUserWithEmailAndPassword,
};

const authActionFactory = (actionType: AuthActions) => async (params: UserParams): Promise<Nullable<BaseUserCredential>> => {
  try {
    const result = await actionsAuth[actionType](
      baseAuthService.getAuth(),
      params.email,
      params.password,
    );
    return result;
  } catch {
    return null;
  }
};

const signIn = authActionFactory(AuthActions.SignIn);
const signUp = authActionFactory(AuthActions.SignUp);

export default {
  signIn,
  signUp,
  ...baseAuthService,
};
