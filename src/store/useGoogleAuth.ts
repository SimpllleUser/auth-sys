import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import auth, { GoogleUser, GoogleUserCredential } from '@/services/google-auth';
import { Nullable } from '@/types/base';

export const useGoogleAuthStore = defineStore('googleAuth', () => {
  const userCredential = ref<Nullable<GoogleUserCredential>>(null);

  const user = computed((): Nullable<GoogleUser> => userCredential.value?.user || null);
  const isAuthed = computed(() => userCredential.value?.user?.uid);

  const signInByGoogle = async () => {
    try {
      userCredential.value = await auth.signInByGoogle();
    } catch (e) {
      console.log(e);
    }
  };

  const singOutUserByGoogle = async () => {
    try {
      const isResetedAuthSession = await auth.singOutUser();
      if (!isResetedAuthSession) return;
      userCredential.value = null;
    } catch (e) { console.log(e); }
  };

  auth.onChnageAuthState((data) => {
    console.log('onChnageAuthState :: ', { data });
  });

  // const signIn = () => {};

  // const signUp = () => {};

  // const singOutUser = () => {};

  return {
    signInByGoogle, singOutUserByGoogle, user, isAuthed,
  };
});
