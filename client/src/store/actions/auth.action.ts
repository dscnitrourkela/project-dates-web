import { User } from 'firebase/auth';

export enum AUTH_ACTION_TYPE {
  LOADING = 'LOADING',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  ACCESS_TOKEN = 'ACCESS_TOKEN',
}

export interface IUser {
  firebase: User;
  name?: string;
  rollNumber?: string;
  accessToken: string;
  uid: string;
  permissions?: Record<string, boolean | string[]>;
  userID?: string;
}

export interface AuthLoadingActionType {
  type: AUTH_ACTION_TYPE.LOADING;
  payload: boolean;
}

export interface AuthAccessTokenActionType {
  type: AUTH_ACTION_TYPE.ACCESS_TOKEN;
  payload: {
    accessToken: string;
  };
}

export interface AuthUpdateActionType {
  type: AUTH_ACTION_TYPE.SIGN_IN;
  payload?: IUser;
}

export interface AuthSignoutActionType {
  type: AUTH_ACTION_TYPE.SIGN_OUT;
}

export type AuthActionType =
  | AuthLoadingActionType
  | AuthUpdateActionType
  | AuthSignoutActionType
  | AuthAccessTokenActionType;
