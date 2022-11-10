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
  onIdTokenChanged,
  signInWithPopup
} from 'firebase/auth';
import Router, { useRouter } from 'next/router';

import { useUserLazyQuery } from '../../graphql/graphql-types';
import { avenueApi } from '../../lib/api';
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
  const { query } = useRouter();
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const [getUser] = useUserLazyQuery();

  const setLoading = (isLoading = true) =>
    dispatch({
      type: AUTH_ACTION_TYPE.LOADING,
      payload: isLoading,
    });

  const signIn = async () => {
    try {
      setLoading();
      await signInWithPopup(auth, provider);
    } catch (error) {
      const {
        code: errorCode,
        message: errorMessage,
        customData: { email },
      } = error;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(errorCode, errorMessage, email, credential);
      toast.error(errorMessage);
    }

    setLoading(false);
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
    onIdTokenChanged(auth, async (user) => {
      if (user) {
        const accessToken = await user.getIdToken();
        GraphQLClient.setLink(getApolloLink(accessToken));
        console.log(accessToken, user.uid);

        dispatch({
          type: AUTH_ACTION_TYPE.ACCESS_TOKEN,
          payload: {
            accessToken,
          },
        });
      }
    });
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const accessToken = await user.getIdToken();
          GraphQLClient.setLink(getApolloLink(accessToken));
          console.log(accessToken, user.uid);

          const {
            loading: userLoading,
            error: userError,
            data: userData,
          } = await getUser({
            variables: {
              uid: user.uid,
            },
          });

          if (!userData.user.length) return toast.error('User unauthorized to access Dashboard');

          const { data: userPermissions } = await avenueApi.get('/auth', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          dispatch({
            type: AUTH_ACTION_TYPE.SIGN_IN,
            payload: {
              accessToken,
              firebase: user,
              uid: user.uid,
              permissions: userPermissions?.permissions,
              userID: userData.user[0].id,
              ...userData.user[0],
            },
          });
          const { continueUrl } = query;
          if (continueUrl) {
            Router.push(`${continueUrl}`);
          } else {
            Router.push('/dashboard');
          }
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
