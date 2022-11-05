import { AUTH_ACTION_TYPE, AuthActionType } from '../actions';

export const authInitialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export type AuthInitialState = typeof authInitialState;

export const authReducer = (state: AuthInitialState, action: AuthActionType): AuthInitialState => {
  switch (action.type) {
    case AUTH_ACTION_TYPE.INITIALIZE:
      return {
        ...state,
        ...(action.payload
          ? {
              isAuthenticated: true,
              isLoading: false,
              user: action.payload,
            }
          : {
              isLoading: false,
            }),
      };

    case AUTH_ACTION_TYPE.SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case AUTH_ACTION_TYPE.SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};
