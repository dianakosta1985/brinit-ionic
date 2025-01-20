import { AppState } from './AppState';

export const AppInitialState: AppState = {
  loading: {
    show: false,
  },
  login: {
    error: null,
    isRecoveredPassword: false,
    isRecoveringPassword: false,
    isLoggedIn: false,
    isLoggingIn: false,
    user: null,
  },
  register: {
    error: null,
    isRegistered: false,
    isRegistring: false,
  },
  requests: {
    requestsData: [],
    error: null,
  },
};
