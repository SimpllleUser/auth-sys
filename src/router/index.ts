import { createRouter, createWebHistory } from 'vue-router';

import { routes } from '../router/routes';
import { storage } from '@/services/local-storage';
import { initOnChecGuardedRoutes } from '../services/router-service';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const getUser = () => JSON.parse(storage.getItem('user'));

const isGuardedPath = initOnChecGuardedRoutes(routes);

/// TODO before each callback make like method with set default page for redirect and init routes

router.beforeEach((to, from, next) => {
  const user = getUser();
  const isGuarded = isGuardedPath(to);

  if (isGuarded && !user) {
    if (to.name === 'Login') {
      next(from);
    } else {
      next({ name: 'Login' });
    }
  } else {
    next();
  }
});
export default router;
