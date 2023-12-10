import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import { Nullable } from '@/types/base';

import baseAuthService from '../services/base-auth';
import emailPasswordAuthService, { UserParams } from '@/services/emailPassword-auth';
import { BaseUserCredential } from '@/services/base-auth';

const { getters } = baseAuthService;

export const useEmailPasswordStore = defineStore('email-password', () => {
  const userCredential = ref<Nullable<BaseUserCredential>>(null);

  const currentUser = computed(getters.currentUser(userCredential));
  const isAuthed = computed(getters.isAuthed(userCredential));

  const signIn = async (userParams: UserParams) => {
    userCredential.value = await emailPasswordAuthService.signIn(userParams);
  };

  const signUp = async (userParams: UserParams) => {
    userCredential.value = await emailPasswordAuthService.signUp(userParams);
  };

  const signOut = emailPasswordAuthService.signOut(() => {
    userCredential.value = null;
  }, console.log);

  return {
    signIn,
    signUp,
    signOut,
    currentUser,
    isAuthed,
  };
});
