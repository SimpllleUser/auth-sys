import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './services/firebase';

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app');
