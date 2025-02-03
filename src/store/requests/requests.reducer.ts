import { createReducer, on } from '@ngrx/store';
import {
  loadRequestsSuccess,
  loadRequestsFailure,
  deleteRequestSucess,
} from './requests.actions';
import { AppInitialState } from '../AppInitialState';
import { RequestsState } from './requestsState';

import { Request } from 'utiles/types';

const initialState = AppInitialState.requests;

export const reducer = createReducer(
  initialState,
  on(loadRequestsSuccess, (state, { requestsLst }) => ({
    ...state,
    requestsLst,
    error: null,
  })),
  on(loadRequestsFailure, (state) => ({
    ...state,
    error: state.error,
  })),
  on(deleteRequestSucess, (state, { requestId }) => ({
    ...state,
    requestsLst: state.requestsLst.filter(
      (request: Request) => request.id !== requestId
    ),
  })),
  on(deleteRequestSucess, (state) => ({
    ...state,
    error: state.error,
  }))
);

export function requestsReducer(state: RequestsState, action: any) {
  return reducer(state, action);
}
