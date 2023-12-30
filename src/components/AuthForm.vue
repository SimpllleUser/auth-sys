<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { UserParams } from '@/services/emailPassword-auth';
// import { useEmailPasswordStore } from '../store/useEmailPasswordAuth';

// const emailPasswordStore = useEmailPasswordStore();

// const { signIn, signUp, signOut } = emailPasswordStore;
// const { currentUser, isAuthed } = storeToRefs(emailPasswordStore);

import { useCustomAuthStore } from '../store/custom-auth';

const customAuthStore = useCustomAuthStore();

const { signIn, signUp, signOut } = customAuthStore;
const { currentUser, isAuthed } = storeToRefs(customAuthStore);

const isSignIn = ref(true);

const actionName = computed(() => (isSignIn.value ? 'Sign in' : 'Sign Up'));
const actionMethod = computed(() => (isSignIn.value ? signIn : signUp));
const userForm = ref({
  email: '',
  password: '',
});

const onSubmit = async () => {
  await actionMethod.value(userForm.value);
};
</script>

<template>
  <div>
    <h2 @click="isSignIn = !isSignIn">{{ actionName }}</h2>
    <form @submit.prevent="onSubmit">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="userForm.email" required />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="userForm.password" required />

      <button type="submit" v-if="!isAuthed">Submit</button>
      <button v-else type="button" @click="signOut">signOut</button>
    </form>
    <div>
      {{ currentUser }}
    </div>
  </div>
</template>

<style scoped></style>
