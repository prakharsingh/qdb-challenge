import * as React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

export default (Component: React.ComponentType) =>
  render(<Component />, { wrapper: MemoryRouter });
