/* eslint-disable @typescript-eslint/no-empty-function */

import { RouteLocationNormalized } from 'vue-router';
import { initOnChecGuardedRoutes, setRoutesForAuthedUsers } from '../../../src/services/router-service.service';

const PRIVATE_ROUTES = setRoutesForAuthedUsers([
  {
    path: '/foo',
    name: 'HomeFoo',
    component: () => {},
  },
  {
    path: '/about-foo',
    name: 'AboutFoo',
    component: () => {},
  },
]);

const PUBLIC_ROUTES = [
  {
    path: '/login-foo',
    name: 'LoginFoo',
    component: () => {},
  },
  {
    path: '/sign-in-foo',
    name: 'SignInViewFoo',
    component: () => {},
  },
];

const isGuardedPath = initOnChecGuardedRoutes([
  ...PRIVATE_ROUTES,
  ...PUBLIC_ROUTES,
]);

describe('setRoutesForAuthedUsers', () => {
  it('Shoud be set guarded routes and not change accessable routes', () => {
    setRoutesForAuthedUsers(PRIVATE_ROUTES).forEach((route) => {
      expect(route.meta?.requiresAuth).toBe(true);
    });
  });

  it('should return true for a private route', () => {
    const GUARD_PATH = PRIVATE_ROUTES[0] as unknown as RouteLocationNormalized;

    const result = isGuardedPath(GUARD_PATH);
    expect(result).toBe(true);
  });

  it('should return false for a public route', () => {
    const GUARD_PATH = PUBLIC_ROUTES[0] as unknown as RouteLocationNormalized;

    const result = isGuardedPath(GUARD_PATH);
    expect(result).toBe(false);
  });

  it('should return false for a public route', () => {
    const NO_EXIST_PATH = { name: 'NoExistPath', path: `id-${Date.now()}` } as unknown as RouteLocationNormalized;

    const result = isGuardedPath(NO_EXIST_PATH);
    expect(result).toBe(false);
  });
});
