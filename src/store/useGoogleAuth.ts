import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import baseAuthService from '../services/base-auth';
import googleAuthService from '@/services/google-auth';
import { Nullable } from '@/types/base';
import { BaseUserCredential } from '@/services/base-auth';

const { getters } = baseAuthService;

export const useGoogleAuthStore = defineStore('googleAuth', () => {
  const userCredential = ref<Nullable<BaseUserCredential>>(null);

  const currentUser = computed(getters.currentUser(userCredential));
  const isAuthed = computed(getters.isAuthed(userCredential));

  const signIn = async () => {
    userCredential.value = await googleAuthService.signIn();
  };

  const signOut = googleAuthService.signOut(() => {
    userCredential.value = null;
  }, console.log);

  return {
    signIn,
    signOut,
    currentUser,
    isAuthed,
  };
});
