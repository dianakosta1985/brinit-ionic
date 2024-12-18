import { createReducer, on } from '@ngrx/store';
import { LoginState } from './LoginState';
import {
  login,
  loginFail,
  loginSuccess,
  recoverPassword,
  recoverPasswordFail,
  recoverPasswordSuccess,
} from './login.actions';
import { AppInitialState } from '../AppInitialState';
import { Action } from 'rxjs/internal/scheduler/Action';

const initialState: LoginState = AppInitialState.login;

const reducer = createReducer(
  initialState,
  on(recoverPassword, (currentState) => {
    return {
      ...currentState,
      error: null,
      isRecoveredPassword: false,
      isRecoveringPassword: true,
    };
  }),
  on(recoverPasswordSuccess, (currentState) => {
    return {
      ...currentState,
      error: null,
      isRecoveredPassword: true,
      isRecoveringPassword: false,
    };
  }),
  on(recoverPasswordFail, (currentState, action) => {
    return {
      ...currentState,
      error: action.error,
      isRecoveredPassword: false,
      isRecoveringPassword: false,
    };
  }),
  on(login, (currentState, action) => {
    return {
      ...currentState,
      error: null,
      user: null,
      isLoggingIn: true,
      isLoggedIn: false,
    };
  }),
  on(loginSuccess, (currentState, action) => {
    return {
      ...currentState,
      error: null,
      user: action.user,
      isLoggingIn: false,
      isLoggedIn: true,
    };
  }),
  on(loginFail, (currentState, action) => {
    return {
      ...currentState,
      error: action.error,
      user: null,
      isLoggingIn: false,
      isLoggedIn: false,
    };
  })
);

export function loginReducer(state: LoginState, action: any) {
  return reducer(state, action);
}
