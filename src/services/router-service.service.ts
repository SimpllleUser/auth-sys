import { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { BaseUser } from './base-auth.service';

export type GuardedPath = RouteRecordRaw & { meta: { requiresAuth: boolean } };
export type BaseRoute = GuardedPath | RouteRecordRaw
export type BaseRoutes = Array<BaseRoute>

interface RedirectToAccessPage {
  getUser: () => BaseUser
  isGuardedPath: (path: RouteLocationNormalized) => boolean
  // firstAccesdPageName: string
}

const makePrivateRoute = (router: RouteRecordRaw): GuardedPath => ({
  ...router,
  meta: { ...router.meta, requiresAuth: true },
});

// export const isRequiresAuth = (route: BaseRoute) => route.meta?.requiresAuth

export const PAGE_NAME_LOGIN = 'Login';

export const setRoutesForAuthedUsers = (
  routesForAuthedUsers: Array<RouteRecordRaw>,
): Array<RouteRecordRaw> => routesForAuthedUsers.map(makePrivateRoute);

export const initOnChecGuardedRoutes = (
  routes: BaseRoutes,
) => (
  path: RouteLocationNormalized,
): boolean => {
  const actualPath = routes.find(({ name }) => name === path.name);
  return (actualPath && Boolean(actualPath?.meta?.requiresAuth)) || false;
};

export const redirectToAccessPage = ({
  getUser,
  isGuardedPath,
}: RedirectToAccessPage) => (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const isGuarded = isGuardedPath(to);

  if (isGuarded && !getUser()) {
    if (to.name === PAGE_NAME_LOGIN) {
      next(from);
    } else {
      next({ name: PAGE_NAME_LOGIN });
    }
  } else {
    next();
  }
};
