import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

type GuardedPath = RouteRecordRaw & { meta: { requiresAuth: boolean } };
type Route = Array<GuardedPath | RouteRecordRaw>

const makePrivateRoute = (router: RouteRecordRaw): GuardedPath => ({
  ...router,
  meta: { ...router.meta, requiresAuth: true },
});

export const setRoutesForAuthedUsers = (
  routesForAuthedUsers: Array<RouteRecordRaw>,
): Array<RouteRecordRaw> => routesForAuthedUsers.map(makePrivateRoute);

export const initOnChecGuardedRoutes = (routes: Route) => (path: RouteLocationNormalized): boolean => {
  const actualPath = routes.find(({ name }) => name === path.name);
  return (actualPath && Boolean(actualPath?.meta?.requiresAuth)) || false;
};
