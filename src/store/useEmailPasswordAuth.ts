import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';

import { Nullable } from '@/types/base';

import emailPasswordAuthService, { UserParams } from '@/services/emailPassword-auth';
import { BaseUserCredential } from '@/services/base-auth';

const { getters } = emailPasswordAuthService;

export const useEmailPasswordStore = defineStore('email-password', () => {
  const userCredential = ref<Nullable<BaseUserCredential>>(emailPasswordAuthService.getSavedUser());

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

  watch(
    () => userCredential.value,
    (user) => {
      emailPasswordAuthService.saveUser<BaseUserCredential | string>(user || '');
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
