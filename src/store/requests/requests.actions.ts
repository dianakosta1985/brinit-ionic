import { createAction, props } from '@ngrx/store';
import { Request } from 'utiles/types';

export const loadRequests = createAction('[Requests] Load Requests');
export const loadRequestsSuccess = createAction(
  '[Requests] Load Requests Success',
  props<{ requestsData: Request[] }>()
);
export const loadRequestsFailure = createAction(
  '[Requests] Load Requests Failure',
  props<{ error: string }>()
);
