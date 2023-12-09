import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import { User, UserCredential } from 'firebase/auth';
import { Nullable } from '@/types/base';

import baseAuthService, { UserParams } from '@/services/base-auth';

export const useGoogleAuthStore = defineStore('baseAuth', () => {
  const userCredential = ref<Nullable<UserCredential>>(null);

  const user = computed((): Nullable<User> => userCredential.value?.user || null);
  const isAuthed = computed(() => userCredential.value?.user?.uid);

  const signIn = async (userParams: UserParams) => {
    try {
      userCredential.value = await baseAuthService.signIn(userParams);
    } catch (e) {
      console.log(e);
    }
  };

  const signUp = async (userParams: UserParams) => {
    try {
      userCredential.value = await baseAuthService.signUp(userParams);
    } catch (e) {
      console.log(e);
    }
  };

  const singOut = async () => {
    try {
      const isResetedAuthSession = await baseAuthService.singOut();
      if (!isResetedAuthSession) return;
      userCredential.value = null;
    } catch (e) { console.log(e); }
  };

  const getCurrentUser = baseAuthService.getCurrentUer;

  return {
    signIn, signUp, singOut, getCurrentUser, user, isAuthed,
  };
});
