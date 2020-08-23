import React, { createContext, useEffect, useReducer } from 'react';
import { User } from '../types/user';
import { fetchUser } from '../services/user';
import { useLocalStorage } from '../hooks';

interface IProps {
  children: React.ReactChild;
}

interface IState {
  isLoading: boolean;
  currentUser?: User;
}

interface IAction {
  type: string;
  payload?: any;
}

const base = '@user';
const STORAGE_KEY = 'user';

export const actionTypes = {
  FETCH_USER: `${base}/FETCH_USER`,
  FETCH_USER_SUCCESS: `${base}/FETCH_USER_SUCCESS`,
  FETCH_USER_FAILURE: `${base}/FETCH_USER_FAILURE`,
};

export const INITIAL_STATE = {
  isLoading: false,
  currentUser: undefined,
};

export const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case actionTypes.FETCH_USER:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload.currentUser,
      };
    case actionTypes.FETCH_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export interface IUserContext extends IState {
  // can have additional items
}

export const UserContext = createContext<IUserContext>(null as any);

export const UserProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [storedValue, setValue] = useLocalStorage(STORAGE_KEY, undefined);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      await fetchUserAsync({ signal: controller.signal });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserAsync = async (options: object) => {
    dispatch({ type: actionTypes.FETCH_USER });

    try {
      let currentUser: User;
      if (storedValue) {
        currentUser = storedValue;
      } else {
        currentUser = await fetchUser(options);
        setValue(currentUser);
      }
      dispatch({
        type: actionTypes.FETCH_USER_SUCCESS,
        payload: { currentUser },
      });
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_USER_FAILURE });
    }
  };

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};
