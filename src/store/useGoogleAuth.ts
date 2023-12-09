import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import googleAuthService, { GoogleUser, GoogleUserCredential } from '@/services/google-auth';
import { Nullable } from '@/types/base';

export const useGoogleAuthStore = defineStore('googleAuth', () => {
  const userCredential = ref<Nullable<GoogleUserCredential>>(null);

  const user = computed((): Nullable<GoogleUser> => userCredential.value?.user || null);
  const isAuthed = computed(() => userCredential.value?.user?.uid);

  const signInByGoogle = async () => {
    try {
      userCredential.value = await googleAuthService.signIn();
    } catch (e) {
      console.log(e);
    }
  };

  const singOutUserByGoogle = async () => {
    try {
      const isResetedAuthSession = await googleAuthService.signOut();
      if (!isResetedAuthSession) return;
      userCredential.value = null;
    } catch (e) {
      console.log(e);
    }
  };

  const getCurrentUser = googleAuthService.getCurrentUer;
  const { onChnageAuthState } = googleAuthService;

  return {
    signInByGoogle,
    singOutUserByGoogle,
    getCurrentUser,
    onChnageAuthState,
    user,
    isAuthed,
  };
});
