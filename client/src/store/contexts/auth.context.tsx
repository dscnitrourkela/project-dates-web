/* eslint-disable no-console */
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer
} from 'react';
import { toast } from 'react-toastify';

import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth';
import Router from 'next/router';

import { useUserLazyQuery } from '../../graphql/graphql-types';
import {
  getApolloLink,
  GraphQLClient
} from '../../lib/apollo';
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
  const [getUser, { loading: userLoading, error: userError, data: userData }] = useUserLazyQuery();

  const setLoading = (isLoading = true) =>
    dispatch({
      type: AUTH_ACTION_TYPE.LOADING,
      payload: isLoading,
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
      toast.error(errorMessage);
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
      toast.error(error.message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setLoading();

          const accessToken = await user.getIdToken();
          GraphQLClient.setLink(getApolloLink(accessToken));

          await getUser({
            variables: {
              uid: user.uid,
            },
          });

          // if (!userLoading && !userData?.user[0] && !userError) {
          //   toast.error('User not registered. Please register via the Avenue App');
          //   Router.push('/login');
          //   return;
          // }

          // if (!userLoading && userError) {
          //   toast.error('Something went wrong, please try again');
          //   Router.push('/login');
          //   return;
          // }

          dispatch({
            type: AUTH_ACTION_TYPE.SIGN_IN,
            payload: {
              ...user,
              accessToken,
              ...(!userLoading && userData?.user[0] ? userData.user[0] : {}),
            },
          });
          Router.push('/dashboard');
        } else {
          Router.push('/login');
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
        toast.error(error.message);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, userLoading]);

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
