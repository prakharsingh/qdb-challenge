import * as React from 'react';
import { cleanup, waitFor } from '@testing-library/react';
import { Layout } from 'antd';
import fetch from 'jest-fetch-mock';

import renderWithRouter from '../../test-utils/render-with-router';
import SideNavImpl from './side-nav';

const SideNav = () => (
  <Layout>
    <SideNavImpl />
  </Layout>
);

describe('<SideNav/>', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  afterEach(cleanup);

  it('SHOULD render successfully', async () => {
    const { asFragment, getByTitle } = renderWithRouter(SideNav);
    const title = await waitFor(() => getByTitle('QDB Challenge'));

    expect(title.innerHTML).toBe('QDB Challenge');
    expect(asFragment()).toMatchSnapshot();
  });

  it('SHOULD render loading state', async () => {
    const { getByTestId } = renderWithRouter(SideNav);

    const title = await waitFor(() => getByTestId('loading-container'));
    expect(title.children).toHaveLength(1);
  });

  it('SHOULD render user details after fetching user', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ name: 'Fake User', email: 'fake@email.com' })
    );
    const { getByTestId } = renderWithRouter(SideNav);

    const userName = await waitFor(() => getByTestId('user-name'));
    const userEmail = await waitFor(() => getByTestId('user-email'));

    expect(userName.innerHTML).toBe('Fake User');
    expect(userEmail.innerHTML).toBe('fake@email.com');
  });
});
