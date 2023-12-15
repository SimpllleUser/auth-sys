import {
  getAuth,
  onAuthStateChanged,
  CompleteFn,
  ErrorFn,
  NextOrObserver,
  User,
  UserCredential,
  signOut as signOutGoogle,
} from 'firebase/auth';
import { Ref } from 'vue';
import { Nullable } from '@/types/base';
import { storage } from './local-storage';

export type BaseUserCredential = UserCredential;
export type BaseUser = User;

export const signOut = (successCallBack?: () => void, errorCallBack?: (e: unknown) => void) => async (): Promise<void> => {
  try {
    await signOutGoogle(getAuth());
    if (successCallBack) successCallBack();
  } catch (error) {
    if (errorCallBack) errorCallBack(error);
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

const getters = {
  currentUser: (
    userCredential: Ref<Nullable<BaseUserCredential>>,
  ) => (): Nullable<BaseUser> => userCredential.value?.user || null,
  isAuthed: (
    userCredential: Ref<Nullable<BaseUserCredential>>,
  ) => () => userCredential.value?.user?.uid,
};

const saveUser = <T = unknown>(user: T) => {
  storage.setItem('user', JSON.stringify(user));
};

const getSavedUser = <T = string>():T => (storage.getItem('user')
  ? JSON.parse(storage.getItem('user'))
  : {});

export default {
  signOut,
  getCurrentUer,
  onChnageAuthState,
  getAuth,
  saveUser,
  getSavedUser,
  getters,
};
