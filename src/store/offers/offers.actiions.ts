import { createAction, props } from '@ngrx/store';
import { OffersState } from './offersState';
import { Offer } from 'utiles/types';

export const createOffer = createAction(
  '[Offer] Create Offer',
  props<{ newOffer: Offer }>()
);

export const createOfferSucess = createAction(
  '[Offer] Create Offer Success',
  props<{ result: Offer }>()
);

export const createOfferFailure = createAction(
  '[Offer] Create Offer Failure',
  props<{ error: string }>()
);
