import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from '../AppInitialState';
import { RegisterState } from './RegisterState';
import { register, registerFail, registerSuccess } from './register.actions';

const initialState = AppInitialState.register;
const reducer = createReducer(
  initialState,
  on(register, (state) => {
    return {
      ...state,
      error: null,
      isRegistered: false,
      isRegistring: true,
    };
  }),
  on(registerSuccess, (state) => {
    return {
      ...state,
      error: null,
      isRegistered: true,
      isRegistring: false,
    };
  }),
  on(registerFail, (state) => {
    return {
      ...state,
      error: state.error,
      isRegistered: false,
      isRegistring: false,
    };
  })
);

export function registerReducer(state: RegisterState, action: any) {
  return reducer(state, action);
}
