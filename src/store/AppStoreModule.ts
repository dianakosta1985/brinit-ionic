import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { loadingReducer } from './loading/loading.reducers';
import { loginReducer } from './login/login.reducers';
import { LoginEffects } from './login/login.effects';
import { registerReducer } from './register/register.reducers';
import { RegisterEffects } from './register/register.effects';
import { requestsReducer } from './requests/requests.reducer';
import { RequestsEffects } from './requests/requests.effects';

export const AppStoreModule = [
  StoreModule.forRoot([]),
  StoreModule.forFeature('loading', loadingReducer),
  StoreModule.forFeature('login', loginReducer),
  StoreModule.forFeature('register', registerReducer),
  StoreModule.forFeature('requests', requestsReducer),
  EffectsModule.forRoot([]),
  EffectsModule.forFeature([LoginEffects]),
  EffectsModule.forFeature([RegisterEffects]),
  EffectsModule.forFeature([RequestsEffects]),
];
