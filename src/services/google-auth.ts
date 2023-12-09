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
} from 'firebase/auth';

export type GoogleUserCredential = UserCredential;
export type GoogleUser = User;

const signInByGoogle = async (): Promise<GoogleUserCredential> => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(getAuth(), provider);
  return result;
};

const onChnageAuthState = (
  nextOrObserver: NextOrObserver<GoogleUser>,
  error?: ErrorFn | undefined,
  completed?: CompleteFn | undefined,
) => {
  onAuthStateChanged(getAuth(), nextOrObserver, error, completed);
};

export const singOutUser = async (): Promise<boolean> => {
  try {
    await signOut(getAuth());
    return true;
  } catch {
    return false;
  }
};

export default {
  signInByGoogle,
  onChnageAuthState,
  singOutUser,
};
