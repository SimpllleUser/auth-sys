import { createRouter, createWebHistory } from 'vue-router';

import { routes } from '../router/routes';
import { storage } from '@/services/local-storage';
import { initOnChecGuardedRoutes, redirectToAccessPage } from '../services/router-service';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const getUser = () => JSON.parse(storage.getItem('user'));
const isGuardedPath = initOnChecGuardedRoutes(routes);
// const firstAccesdPageName: string = routes.find(isRequiresAuth)?.name?.toString() || ''

router.beforeEach(redirectToAccessPage({ getUser, isGuardedPath }));

export default router;
