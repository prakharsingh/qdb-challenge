import * as React from 'react';
import { cleanup, waitFor } from '@testing-library/react';

import renderWithRouter from '../../test-utils/render-with-router';
import App from './app';

describe('<App/>', () => {
  afterEach(cleanup);

  it('SHOULD render successfully', async () => {
    const { asFragment, getByTestId } = renderWithRouter(App);
    const container = await waitFor(() => getByTestId('container'));

    expect(container.children).toHaveLength(2);
    expect(asFragment()).toMatchSnapshot();
  });
});
