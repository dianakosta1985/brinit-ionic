import { ModalState } from './confirmModal/modalState';
import { LoadingState } from './loading/LoadingState';
import { LoginState } from './login/LoginState';
import { RegisterState } from './register/RegisterState';
import { RequestsState } from './requests/requestsState';
import { ProductsState } from './products/productsState';
import { OffersState } from './offers/offersState';
export interface AppState {
  loading: LoadingState;
  modal: ModalState;
  login: LoginState;
  register: RegisterState;
  requests: RequestsState;
  products: ProductsState;
  offers: OffersState;
}
