export enum AUTH_ACTION_TYPE {
  INITIALIZE = 'INITIALIZE',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

export interface User {
  x?: string;
}

export interface AuthUpdateActionType {
  type: AUTH_ACTION_TYPE.INITIALIZE | AUTH_ACTION_TYPE.SIGN_IN;
  payload?: User;
}

export interface AuthSignoutActionType {
  type: AUTH_ACTION_TYPE.SIGN_OUT;
}

export type AuthActionType = AuthUpdateActionType | AuthSignoutActionType;
