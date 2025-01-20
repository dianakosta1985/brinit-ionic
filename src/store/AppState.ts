import { LoadingState } from './loading/LoadingState';
import { LoginState } from './login/LoginState';
import { RegisterState } from './register/RegisterState';
import { RequestsState } from './requests/requestsState';

export interface AppState {
  loading: LoadingState;
  login: LoginState;
  register: RegisterState;
  requests: RequestsState;
}
