import fireBaseAuth, {
  getAuth,
  onAuthStateChanged,
  CompleteFn,
  ErrorFn,
  NextOrObserver,
  User,
  UserCredential,
} from 'firebase/auth';
import { Ref } from 'vue';
import { Nullable } from '@/types/base';

export type BaseUserCredential = UserCredential;
export type BaseUser = User;

export const signOut = (successCallBack?: () => void, errorCallBack?: (e: unknown) => void) => async (): Promise<void> => {
  try {
    await fireBaseAuth.signOut(getAuth());
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

export default {
  signOut,
  getCurrentUer,
  onChnageAuthState,
  getAuth,
  getters,
};
