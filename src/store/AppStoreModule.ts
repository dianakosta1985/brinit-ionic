import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { loadingReducer } from './loading/loading.reducers';
import { loginReducer } from './login/login.reducers';
import { LoginEffects } from './login/login.effects';

export const AppStoreModule = [
  StoreModule.forRoot([]),
  StoreModule.forFeature('loading', loadingReducer),
  StoreModule.forFeature('login', loginReducer),
  EffectsModule.forRoot([]),
  EffectsModule.forFeature([LoginEffects]),
];
