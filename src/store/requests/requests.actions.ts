import { createAction, props } from '@ngrx/store';
import { Request } from 'utiles/types';

export const loadRequests = createAction('[Requests] Load Requests');
export const loadRequestsSuccess = createAction(
  '[Requests] Load Requests Success',
  props<{ requestsLst: Request[] }>()
);
export const loadRequestsFailure = createAction(
  '[Requests] Load Requests Failure',
  props<{ error: string }>()
);

export const deleteRequest = createAction(
  '[Request] Delete Request',
  props<{ requestId: string }>() // Payload includes the ID of the request to delete
);

export const deleteRequestSucess = createAction(
  '[Requests] Delete Request Success',
  props<{ requestId: string }>()
);

export const deleteRequestFailure = createAction(
  '[Requests] Delete Request Failure',
  props<{ error: string }>()
);
