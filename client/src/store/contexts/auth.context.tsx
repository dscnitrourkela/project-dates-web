/* eslint-disable no-console */
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef
} from 'react';

import { auth, ENABLE_AUTH } from '../../lib/auth';
import { AUTH_ACTION_TYPE, User } from '../actions';
import {
  authInitialState,
  AuthInitialState,
  authReducer
} from '../reducers';

interface AuthContextType extends AuthInitialState {
  signIn: (user: User) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within a AuthProvider');

  return context;
};

export const AuthConsumer = AuthContext.Consumer;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const initialized = useRef(false);

  const initialize = async () => {
    if (initialized.current) return;

    initialized.current = true;

    /**
     * Check if auth has been skipped
     * From sign-in page we may have set "skip-auth" to "true"
     */
    const authSkipped = globalThis.sessionStorage.getItem('skip-auth') === 'true';
    if (authSkipped)
      return dispatch({
        type: AUTH_ACTION_TYPE.INITIALIZE,
        payload: {},
      });

    /**
     * Check if authentication with Zalter is enabled
     * If not, then set user as authenticated
     */
    if (!ENABLE_AUTH)
      return dispatch({
        type: AUTH_ACTION_TYPE.INITIALIZE,
        payload: {},
      });

    try {
      if (!auth) return console.error('Auth undefined');
      // Check if user is authenticated
      const isAuthenticated = await auth.isAuthenticated();

      if (isAuthenticated)
        return dispatch({
          type: AUTH_ACTION_TYPE.INITIALIZE,
          payload: {},
        });

      dispatch({
        type: AUTH_ACTION_TYPE.INITIALIZE,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: AUTH_ACTION_TYPE.INITIALIZE,
      });
    }
  };

  const signIn = (user: User) =>
    dispatch({
      type: AUTH_ACTION_TYPE.INITIALIZE,
      payload: user,
    });

  const signOut = () =>
    dispatch({
      type: AUTH_ACTION_TYPE.SIGN_OUT,
    });

  useEffect(() => {
    initialize().catch(console.error);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
