import { User } from 'firebase/auth';

export enum AUTH_ACTION_TYPE {
  LOADING = 'LOADING',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

export interface IUser extends User {
  name?: string;
  rollNumber?: string;
  accessToken: string;
  uid: string;
}

export interface AuthLoadingActionType {
  type: AUTH_ACTION_TYPE.LOADING;
  payload: boolean;
}

export interface AuthUpdateActionType {
  type: AUTH_ACTION_TYPE.SIGN_IN;
  payload?: IUser;
}

export interface AuthSignoutActionType {
  type: AUTH_ACTION_TYPE.SIGN_OUT;
}

export type AuthActionType = AuthLoadingActionType | AuthUpdateActionType | AuthSignoutActionType;
