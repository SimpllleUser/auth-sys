import MockAdapter from 'axios-mock-adapter';
import api, { setAuthToken } from '@/services/api.services';

describe('MyComponent', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  afterEach(() => {
    mock.restore();
  });

  it('Is valid token in API after call set token', async () => {
    const token = 'testToken';

    console.log(process.env);

    /// Set some token text
    setAuthToken(token);
    expect(api.defaults.headers.common.Authorization).toBe(token);

    /// Set empty
    const emptyToken = '';
    setAuthToken(emptyToken);

    expect(api.defaults.headers.common.Authorization).toBe(emptyToken);
  });
});
