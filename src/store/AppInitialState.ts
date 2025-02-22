import { AppState } from './AppState';

export const AppInitialState: AppState = {
  loading: {
    show: false,
  },
  modal: {
    showModal: false,
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
    requestsLst: [],
    error: null,
  },
  products: {
    newProduct: null,
    productsLst: [],
    error: null,
  },
  offers: {
    created_offer: null,
    matched_requests: [],
    error: null,
  },
};
