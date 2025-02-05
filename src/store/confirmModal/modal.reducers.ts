import { createReducer, on } from '@ngrx/store';
import { hideModal, showModal } from './modal.actions';
import { ModalState } from './modalState';
import { AppInitialState } from '../AppInitialState';

const initialState: ModalState = AppInitialState.modal;

const reducer = createReducer(
  initialState,
  on(showModal, () => {
    return { showModal: true };
  }),
  on(hideModal, () => {
    return { showModal: false };
  })
);

export function modalReducer(state: ModalState, action: any) {
  return reducer(state, action);
}
