import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of, switchMap, tap } from 'rxjs';

import {
  createOffer,
  createOfferFailure,
  createOfferSucess,
} from './offers.actiions';
import { OffersService } from 'src/app/services/offers/offer.service';

@Injectable()
export class OffersEffects {
  constructor(
    private actions$: Actions,
    private offersService: OffersService
  ) {}

  createOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createOffer),
      mergeMap((action) =>
        this.offersService.postOffer(action.newOffer).pipe(
          tap((offer) => console.log('Fetched Offers:', offer)),
          map((result) => createOfferSucess({ result })),
          catchError((error) => {
            console.error('Error fetching offers:', error);
            return of(createOfferFailure({ error: error.message }));
          })
        )
      )
    )
  );
}
