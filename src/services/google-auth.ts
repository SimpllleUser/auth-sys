import firebaseAuth, {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  UserCredential,
  CompleteFn,
  ErrorFn,
  NextOrObserver,
  User,
} from 'firebase/auth';

export type GoogleUserCredential = UserCredential;
export type GoogleUser = User;

const signIn = async (): Promise<GoogleUserCredential> => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(getAuth(), provider);
  return result;
};

export const signOut = async (): Promise<boolean> => {
  try {
    await firebaseAuth.signOut(getAuth());
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
  signOut,
  onChnageAuthState,
  getCurrentUer,
};
