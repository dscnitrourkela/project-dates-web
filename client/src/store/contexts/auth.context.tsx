/* eslint-disable no-console */
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer
} from 'react';

import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth';
import Router from 'next/router';

import { app } from '../../lib/firebase';
import { AUTH_ACTION_TYPE } from '../actions';
import {
  authInitialState,
  AuthInitialState,
  authReducer
} from '../reducers';

interface AuthContextType extends AuthInitialState {
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthConsumer = AuthContext.Consumer;
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within a AuthProvider');

  return context;
};

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const AuthProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const setLoading = (loading = true) =>
    dispatch({
      type: AUTH_ACTION_TYPE.LOADING,
      payload: loading,
    });

  const signIn = async () => {
    try {
      setLoading();
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const { accessToken } = credential;
      const { user } = result;
      dispatch({
        type: AUTH_ACTION_TYPE.SIGN_IN,
        payload: {
          ...user,
          accessToken,
        },
      });
    } catch (error) {
      setLoading(false);
      const {
        code: errorCode,
        message: errorMessage,
        customData: { email },
      } = error;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(errorCode, errorMessage, email, credential);
    }
  };

  const signOut = async () => {
    setLoading();
    try {
      await auth.signOut();
      dispatch({
        type: AUTH_ACTION_TYPE.SIGN_OUT,
      });
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setLoading();
          // TODO:
          /**
           * 1. Fetch User from database
           * 2. if user, dispatch it
           * 3. if no user, redirect to create form
           *    and then dispatch
           */

          const accessToken = await user.getIdToken();
          dispatch({
            type: AUTH_ACTION_TYPE.SIGN_IN,
            payload: {
              ...user,
              accessToken,
            },
          });
          Router.push('/dashboard');
        } else {
          Router.push('/login');
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    });
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
