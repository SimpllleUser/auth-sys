import { RouteRecordRaw } from 'vue-router';
import { setRoutesForAuthedUsers } from '@/services/router-service.service';

export const routes: Array<RouteRecordRaw> = [
  ...setRoutesForAuthedUsers([
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue'),
    },
  ]),
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/sign-in',
    name: 'SignInView',
    component: () => import('../views/SignInView.vue'),
  },
];
