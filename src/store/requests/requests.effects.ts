import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of, tap } from 'rxjs';
import {
  loadRequests,
  loadRequestsSuccess,
  loadRequestsFailure,
  deleteRequest,
  deleteRequestFailure,
  deleteRequestSucess,
  createRequest,
  createRequestSucess,
  createRequestFailure,
} from './requests.actions';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { show } from '../loading/loading.actions';

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
          map((requestsLst) => loadRequestsSuccess({ requestsLst })),
          catchError((error) => {
            console.error('Error fetching requests:', error);
            return of(loadRequestsFailure({ error: error.message }));
          })
        )
      )
    )
  );

  createRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createRequest),
      // tap(() => console.log('Action received: loadRequests')),
      mergeMap((action) =>
        this.requestsService.postRequest(action.newRequest).pipe(
          // tap((requests) => console.log('Fetched requests:', requests)),
          map(() => createRequestSucess({ newRequest: action.newRequest })),
          catchError((error) => {
            console.error('Error fetching requests:', error);
            return of(createRequestFailure({ error: error.message }));
          })
        )
      )
    )
  );

  // reloadRequests$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(createRequestSucess),
  //     concatMap(() => [
  //       show(), // Show loader before loading requests
  //       loadRequests(),
  //     ])
  //   )
  // );

  deleteRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteRequest),
      // tap(() => console.log('Action received: loadRequests')),
      mergeMap((action) =>
        this.requestsService
          .patchRequest(action.requestId, { is_active: false })
          .pipe(
            // tap((requests) => console.log('Fetched requests:', requests)),
            map(() => deleteRequestSucess({ requestId: action.requestId })),
            catchError((error) => {
              console.error('Error fetching requests:', error);
              return of(deleteRequestFailure({ error: error.message }));
            })
          )
      )
    )
  );
}
