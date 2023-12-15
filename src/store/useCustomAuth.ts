import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';

import { Nullable } from '@/types/base';

import customAuthService, { UserCredential } from '@/services/custom-provider-auht';
import { UserParams } from '@/services/emailPassword-auth';
import router from '@/router';

export const useCustomAuthStore = defineStore('custom-auth', () => {
  const userCredential = ref<Nullable<UserCredential>>(
    customAuthService.getSavedUser<UserCredential>(),
  );

  const currentUser = computed(() => userCredential.value);
  const isAuthed = computed(() => Boolean(userCredential.value));

  const signIn = async (userParams: UserParams) => {
    userCredential.value = await customAuthService.signIn(userParams);
  };

  const signUp = async (userParams: UserParams) => {
    userCredential.value = await customAuthService.signUp(userParams);
  };

  const signOut = async () => {
    userCredential.value = null;
    await router.push({ path: '/' });
  };

  watch(
    () => userCredential.value,
    (user) => {
      customAuthService.saveUser<UserCredential | string>(user || '');
      customAuthService.setAuthToken(user?.accessToken);
    },
  );

  return {
    signIn,
    signUp,
    signOut,
    currentUser,
    isAuthed,
  };
});
