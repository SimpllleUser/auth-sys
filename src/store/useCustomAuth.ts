import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';

import { Nullable } from '@/types/base';

import customAuthService from '@/services/custom-provider-auht';
import { BaseUserCredential } from '@/services/base-auth';
import { storage } from '@/services/local-storage';
import { UserParams } from '@/services/emailPassword-auth';
import router from '@/router';

const getInitedUser = () => (storage.getItem('user') ? JSON.parse(storage.getItem('user')) : {});

const saveObjectToStorage = (key: string, value: any) => {
  storage.setItem(key, JSON.stringify(value));
};

export const useCustomAuthStore = defineStore('custom-auth', () => {
  const userCredential = ref<Nullable<BaseUserCredential>>(getInitedUser());

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
