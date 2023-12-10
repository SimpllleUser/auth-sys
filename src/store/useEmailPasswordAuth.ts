import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';

import { Nullable } from '@/types/base';

import baseAuthService from '../services/base-auth';
import emailPasswordAuthService, { UserParams } from '@/services/emailPassword-auth';
import { BaseUserCredential } from '@/services/base-auth';
import { storage } from '@/services/local-storage';

const { getters } = baseAuthService;

const getInitedUseEmailPasswordStore = () => (storage.getItem('user') ? JSON.parse(storage.getItem('user')) : {});

const saveObjectToStorage = (key: string, value: any) => {
  storage.setItem(key, JSON.stringify(value));
};

export const useEmailPasswordStore = defineStore('email-password', () => {
  const userCredential = ref<Nullable<BaseUserCredential>>(getInitedUseEmailPasswordStore());

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
      saveObjectToStorage('user', user);
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
