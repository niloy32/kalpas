import {createReducer, current} from '@reduxjs/toolkit';
import {AppInitialState} from './AppInitialState';
import {login, loginFail, loginSuccess, recoverPassword} from './Login.action';
import {LoginState} from './LoginState';

const initialState: LoginState = AppInitialState.login;

export const logReducer = createReducer(initialState, builder => {
  builder.addCase(recoverPassword, () => {
    return initialState;
  });
  builder.addCase(login, currentState => {
    return {
      ...currentState,
      error: null,
      isLoggedIn: false,
      isLoggingIn: true,
    };
  });
  builder.addCase(loginSuccess, currentState => {
    return {
      ...currentState,
      error: null,
      isLoggedIn: true,
      isLoggingIn: false,
    };
  });
  builder.addCase(loginFail, (currentState, action) => {
    return {
      ...currentState,
      error: action.payload,
      isLoggedIn: false,
      isLoggingIn: false,
    };
  });
});
