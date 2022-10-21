import {createAction} from '@reduxjs/toolkit';
import {User} from './User';

export const recoverPassword = createAction('[Recover password]');

export const login = createAction('[Login]');

export const loginSuccess = createAction('[Login] Success', (user: User) => ({
  payload: user,
}));
export const loginFail = createAction('[Login] Fail', (error: any) => ({
  payload: error,
}));

export const logout = createAction('[Logout]');
