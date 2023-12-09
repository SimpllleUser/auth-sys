<template>
  <div class="home">
    <img v-if="user" alt="Vue logo" :src="user.photoURL" />
    <button @click="signInByGoogle">Sign in by Google</button>
    <button @click="singOutUserByGoogle">Sign out</button>
    {{ user }}
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import { useGoogleAuthStore } from '../store/useGoogleAuth';

const googleAuthStore = useGoogleAuthStore();

const { user } = storeToRefs(googleAuthStore);
const { singOutUserByGoogle, signInByGoogle } = googleAuthStore;

</script>
