<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <button @click="signInByGoogle">Sign in by Google</button>
    <button @click="singOutUser">Sign out</button>

    {{ user }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';
import {
  getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut,
} from 'firebase/auth';
import { firebase } from '../plugins/firebase';

const user = ref<any>('');

// SIGN IN BY GOOGLE PROVIDER
const signInByGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const res = await signInWithPopup(getAuth(), provider);

  // SAVE TO STORAGE
  localStorage.setItem('user', JSON.stringify(res));

  user.value = res;
  console.log(res);
};

// CHECK STATUS USER (AUTH OR NOT)
onAuthStateChanged(getAuth(), (actualUser) => {
  if (actualUser) {
    console.log('Користувач авторизований:', actualUser.uid);
  } else {
    console.log('Користувач не авторизований');
  }
});

// LOGOUT USER
const singOutUser = async () => {
  await signOut(getAuth());

  localStorage.setItem('user', JSON.stringify({}));

  user.value = {};
};
</script>
