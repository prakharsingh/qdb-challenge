import * as React from 'react';
import {
  act as ReactAct,
  cleanup,
  waitFor,
  render,
  screen,
} from '@testing-library/react';
import { act as HooksAct, renderHook } from '@testing-library/react-hooks';
import fetch from 'jest-fetch-mock';

import {
  UserContext,
  UserProvider,
  INITIAL_STATE,
  reducer,
  IUserContext,
  actionTypes,
} from './user.provider';

const Component = (): JSX.Element => {
  const { isLoading, currentUser } = React.useContext<IUserContext>(
    UserContext
  );
  return (
    <div>
      {isLoading && 'Loading...'}
      {currentUser && currentUser.name}
    </div>
  );
};

const Wrapper = () => (
  <UserProvider>
    <Component />
  </UserProvider>
);

describe('UserProvider', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  afterEach(cleanup);

  it('SHOULD display user details after fetching', async () => {
    fetch.mockResponse(JSON.stringify({ name: 'Fake User' }));

    const { rerender } = render(<Wrapper />);

    const loading = await waitFor(() => screen.getByText('Loading...'));

    expect(loading).toBeVisible();

    rerender(<Wrapper />);
    rerender(<Wrapper />);
    rerender(<Wrapper />);

    const details = await waitFor(() => screen.getByText('Fake User'));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(details).toBeVisible();
  });
});

describe('reducer', () => {
  it('SHOULD not update state upon invalid action', () => {
    const { result } = renderHook(() =>
      React.useReducer(reducer, INITIAL_STATE)
    );
    const [, dispatch] = result.current;

    HooksAct(() => {
      dispatch({ type: 'FAKE_ACTION' });
    });

    expect(result.current[0]).toEqual(INITIAL_STATE);
  });

  it('SHOULD update state upon valid action', () => {
    const { result } = renderHook(() =>
      React.useReducer(reducer, INITIAL_STATE)
    );
    const [, dispatch] = result.current;

    expect(result.current[0]).toEqual(INITIAL_STATE);

    HooksAct(() => {
      dispatch({ type: actionTypes.FETCH_USER });
    });

    expect(result.current[0]).toEqual({ ...INITIAL_STATE, isLoading: true });
  });
});
