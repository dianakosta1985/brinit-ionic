import { createReducer, on } from '@ngrx/store';
import { loadRequestsSuccess, loadRequestsFailure } from './requests.actions';
import { AppInitialState } from '../AppInitialState';
import { RequestsState } from './requestsState';

const initialState = AppInitialState.requests;

export const reducer = createReducer(
  initialState,
  on(loadRequestsSuccess, (state, { requestsData }) => ({
    ...state,
    requestsData,
    error: null,
  })),
  on(loadRequestsFailure, (state) => ({
    ...state,
    error: state.error,
  }))
);

export function requestsReducer(state: RequestsState, action: any) {
  return reducer(state, action);
}
