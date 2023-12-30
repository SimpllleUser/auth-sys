/* eslint-disable @typescript-eslint/no-empty-function */

import { RouteLocationNormalized } from 'vue-router';
import { IdTokenResult } from 'firebase/auth';
import {
  initOnChecGuardedRoutes,
  setRoutesForAuthedUsers,
  redirectToAccessPage,
} from '../../../src/services/router-service.service';
import { BaseUser } from '@/services/base-auth.service';

const mockUser: BaseUser = {
  uid: 'sampleUid',
  email: 'user@example.com',
  emailVerified: true,
  isAnonymous: false,
  metadata: {
    creationTime: '2023-01-01T12:00:00Z',
    lastSignInTime: '2023-01-05T15:30:00Z',
  },
  providerData: [
    {
      uid: 'providerUid1',
      displayName: 'Provider 1',
      email: 'provider1@example.com',
      phoneNumber: '+1234567890',
      photoURL: 'https://example.com/provider1.jpg',
      providerId: 'provider1',
    },
    {
      uid: 'providerUid2',
      displayName: 'Provider 2',
      email: 'provider2@example.com',
      phoneNumber: '+9876543210',
      photoURL: 'https://example.com/provider2.jpg',
      providerId: 'provider2',
    },
  ],
  refreshToken: 'sampleRefreshToken',
  tenantId: 'sampleTenantId',
  delete(): Promise<void> {
    throw new Error('Function not implemented.');
  },
  getIdToken(): Promise<string> {
    throw new Error('Function not implemented.');
  },
  getIdTokenResult(): Promise<IdTokenResult> {
    throw new Error('Function not implemented.');
  },
  reload(): Promise<void> {
    throw new Error('Function not implemented.');
  },
  toJSON(): object {
    throw new Error('Function not implemented.');
  },
  displayName: null,
  phoneNumber: null,
  photoURL: null,
  providerId: '',
};

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

const isGuardedPath = initOnChecGuardedRoutes([...PRIVATE_ROUTES, ...PUBLIC_ROUTES]);

describe('Router service', () => {
  const getUserMock = jest.fn(() => mockUser);
  const isGuardedPathMock = jest.fn((path: RouteLocationNormalized) => Boolean(path.meta?.requiresAuth));

  const redirectToAccess = redirectToAccessPage({
    getUser: getUserMock,
    isGuardedPath: isGuardedPathMock,
  });

  beforeEach(() => {
    getUserMock.mockClear();
    isGuardedPathMock.mockClear();
  });

  it('Shoud be set guarded routes and not change accessable routes', () => {
    setRoutesForAuthedUsers(PRIVATE_ROUTES).forEach((route) => {
      expect(route.meta?.requiresAuth).toBe(true);
    });
  });

  it('Should return true for a private route', () => {
    const GUARD_PATH = PRIVATE_ROUTES[0] as unknown as RouteLocationNormalized;

    const result = isGuardedPath(GUARD_PATH);
    expect(result).toBe(true);
  });

  it('Should return false for a public route', () => {
    const GUARD_PATH = PUBLIC_ROUTES[0] as unknown as RouteLocationNormalized;

    const result = isGuardedPath(GUARD_PATH);
    expect(result).toBe(false);
  });

  it('Should return false for a public route', () => {
    const NO_EXIST_PATH = { name: 'NoExistPath', path: `id-${Date.now()}` } as unknown as RouteLocationNormalized;

    const result = isGuardedPath(NO_EXIST_PATH);
    expect(result).toBe(false);
  });

  it('Should allow access to non-guarded path', () => {
    const to = PUBLIC_ROUTES[0] as unknown as RouteLocationNormalized;
    const from = { name: 'PreviousPage', path: '/previous-page' } as unknown as RouteLocationNormalized;
    const nextMock = jest.fn();

    redirectToAccess(to, from, nextMock);

    expect(getUserMock).not.toHaveBeenCalled();
    expect(isGuardedPathMock).toHaveBeenCalledWith(to);
    expect(nextMock).toHaveBeenCalledWith();
  });

  it('Should allow access to a guarded route with authentication', () => {
    const getUser = jest.fn(() => (mockUser as BaseUser));
    const isGuardedPath = jest.fn(() => true);
    const to = PRIVATE_ROUTES[0] as unknown as RouteLocationNormalized;
    const from = PUBLIC_ROUTES[0] as unknown as RouteLocationNormalized;
    const next = jest.fn();

    redirectToAccessPage({ getUser, isGuardedPath })(to, from, next);

    expect(getUser).toHaveBeenCalled();
    expect(isGuardedPath).toHaveBeenCalledWith(to);
    expect(next).toHaveBeenCalled();
  });

  it('Should not allow access to a guarded route without authentication', () => {
    const getUser = jest.fn(() => (null as unknown as BaseUser));
    const isGuardedPath = jest.fn(() => true);
    const to = PUBLIC_ROUTES[0] as unknown as RouteLocationNormalized;
    const from = PRIVATE_ROUTES[0] as unknown as RouteLocationNormalized;
    const next = jest.fn();

    redirectToAccessPage({ getUser, isGuardedPath })(to, from, next);

    expect(getUser).toHaveBeenCalled();
    expect(isGuardedPath).toHaveBeenCalledWith(to);
    expect(next).toHaveBeenCalledWith({ name: 'Login' });
  });
});
