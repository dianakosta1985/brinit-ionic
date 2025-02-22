import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from '../AppInitialState';
import { Offer } from 'utiles/types';
import { createOfferFailure, createOfferSucess } from './offers.actiions';
import { OffersState } from './offersState';

const initialState = AppInitialState.offers;

export const reducer = createReducer(
  initialState,
  on(createOfferFailure, (state) => ({
    ...state,
    error: state.error,
  })),
  on(createOfferSucess, (state, { result }) => ({
    ...state,
    result,
  }))
);

export function offersReducer(state: any, action: any) {
  return reducer(state, action);
}
