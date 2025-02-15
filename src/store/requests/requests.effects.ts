import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
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
import { Router } from '@angular/router';
import { AppState } from '../AppState';
import { Store } from '@ngrx/store';

@Injectable()
export class RequestsEffects {
  constructor(
    private actions$: Actions,
    private requestsService: RequestsService,
    private router: Router,
    private store: Store<AppState>
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

  navigateAndLoadRequests$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createRequestSucess), // Wait for `createRequestSuccess` to be dispatched
        tap(() => {
          // Navigate after request is successful
          this.router.navigate(['/pages/my-requests']);
        }),
        switchMap(() => {
          // Dispatch action to load requests
          return of(this.store.dispatch(loadRequests()));
        })
      ),
    { dispatch: false } // We are not dispatching another action from this effect
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
