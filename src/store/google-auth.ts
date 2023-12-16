import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';

import { Nullable } from '@/types/base';

import googleAuthService from '@/services/google-auth.service';
import { BaseUserCredential } from '@/services/base-auth.service';

const { getters } = googleAuthService;

export const useGoogleAuthStore = defineStore('googleAuth', () => {
  const userCredential = ref<Nullable<BaseUserCredential>>(googleAuthService.getSavedUser());

  const currentUser = computed(getters.currentUser(userCredential));
  const isAuthed = computed(getters.isAuthed(userCredential));

  const signIn = async () => {
    userCredential.value = await googleAuthService.signIn();
  };

  const signOut = googleAuthService.signOut(() => {
    userCredential.value = null;
  }, console.log);

  watch(
    () => userCredential.value,
    (user) => {
      googleAuthService.saveUser<BaseUserCredential | string>(user || '');
    },
  );

  return {
    signIn,
    signOut,
    currentUser,
    isAuthed,
  };
});
