import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  UserCredential,
  CompleteFn,
  ErrorFn,
  NextOrObserver,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Nullable } from '@/types/base';

export interface UserParams {
  email: string;
  password: string;
}

export enum AuthActions {
  SignIn = 'SignIn',
  SignUp = 'SignUp',
}

const actionsAuth: Record<AuthActions, any> = {
  [AuthActions.SignIn]: signInWithEmailAndPassword,
  [AuthActions.SignUp]: createUserWithEmailAndPassword,
};

const getBaseAction = (actionType: AuthActions) => (params: UserParams): Promise<Nullable<UserCredential>> | null => {
  try {
    const result = actionsAuth[actionType](params) as Promise<UserCredential>;
    return result;
  } catch (error: any) {
    return null;
  }
};

const signIn = getBaseAction(actionsAuth.SignIn);
const signUp = getBaseAction(actionsAuth.SignUp);

export const singOut = async (): Promise<boolean> => {
  try {
    await signOut(getAuth());
    return true;
  } catch {
    return false;
  }
};

const getCurrentUer = () => new Promise((resolve, reject) => {
  const removeListener = onAuthStateChanged(
    getAuth(),
    (user) => {
      removeListener();
      resolve(user);
    },
    reject,
  );
});

const onChnageAuthState = (
  nextOrObserver: NextOrObserver<User>,
  error?: ErrorFn | undefined,
  completed?: CompleteFn | undefined,
) => {
  onAuthStateChanged(getAuth(), nextOrObserver, error, completed);
};

export default {
  signIn,
  signUp,
  singOut,
  getCurrentUer,
  onChnageAuthState,
};
