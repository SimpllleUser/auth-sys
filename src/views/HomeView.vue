<template>
  <div class="home">
    <auth-form />
    <!-- <img v-if="currentUser" alt="Vue logo" :src="currentUser.photoURL" />
    <button @click="signIn">Sign in by Google</button>
    <button @click="signOut">Sign out</button>
    {{ currentUser }} -->
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import { useGoogleAuthStore } from '../store/useGoogleAuth';
import AuthForm from '../components/AuthForm.vue';

const googleAuthStore = useGoogleAuthStore();

const { currentUser } = storeToRefs(googleAuthStore);
const { signOut, signIn } = googleAuthStore;
</script>
