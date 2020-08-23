import fetch from 'jest-fetch-mock';
import fetchUserService from './fetch-user';

describe('fetchUserService', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('SHOULD fetch user successfully', async () => {
    fetch.mockResponseOnce(JSON.stringify({ name: 'Fake User' }));

    const response = await fetchUserService({});

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      `https://jsonplaceholder.typicode.com/users/1`
    );
    expect(response).toEqual({ name: 'Fake User' });
  });

  // it('SHOULD ')
});
