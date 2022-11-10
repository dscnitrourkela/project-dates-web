import {
  AUTH_ACTION_TYPE,
  AuthActionType,
  IUser
} from '../actions';

export const authInitialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export type AuthInitialState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: null | IUser;
};

export const authReducer = (state: AuthInitialState, action: AuthActionType): AuthInitialState => {
  switch (action.type) {
    case AUTH_ACTION_TYPE.LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case AUTH_ACTION_TYPE.SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };

    case AUTH_ACTION_TYPE.ACCESS_TOKEN:
      return {
        ...state,
        user: {
          ...state.user,
          accessToken: action.payload.accessToken,
        },
      };

    case AUTH_ACTION_TYPE.SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };

    default:
      return state;
  }
};
