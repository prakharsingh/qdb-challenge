import * as React from 'react';
import { cleanup } from '@testing-library/react';

import renderWithRouter from '../../test-utils/render-with-router';
import Router from './router';

describe('<Router/>', () => {
  const { container } = renderWithRouter(Router);

  afterEach(cleanup);

  it('SHOULD redirect to `/dashboard` by default', () => {
    expect(container.innerHTML).toMatch('Dashboard View');
  });
});
