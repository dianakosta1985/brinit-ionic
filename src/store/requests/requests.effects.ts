import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import {
  loadRequests,
  loadRequestsSuccess,
  loadRequestsFailure,
} from './requests.actions';
import { RequestsService } from 'src/app/services/requests/requests.service';

@Injectable()
export class RequestsEffects {
  constructor(
    private actions$: Actions,
    private requestsService: RequestsService
  ) {}

  loadRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRequests),
      // tap(() => console.log('Action received: loadRequests')),
      mergeMap(() =>
        this.requestsService.fetchRequests().pipe(
          // tap((requests) => console.log('Fetched requests:', requests)),
          map((requestsData) => loadRequestsSuccess({ requestsData })),
          catchError((error) => {
            console.error('Error fetching requests:', error);
            return of(loadRequestsFailure({ error: error.message }));
          })
        )
      )
    )
  );
}
