import { createReducer, on } from '@ngrx/store';
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure,
  createProductSucess,
  createProductFailure,
} from './products.actions';
import { AppInitialState } from '../AppInitialState';
import { ProductsState } from './productsState';

const initialState = AppInitialState.products;

export const reducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, { productsLst }) => ({
    ...state,
    productsLst,
    error: null,
  })),
  on(loadProductsFailure, (state) => ({
    ...state,
    error: state.error,
  })),
  on(createProductSucess, (state, { newProduct }) => ({
    ...state,
    productsLst: [...state.productsLst, newProduct],
    newProduct,
  })),
  on(createProductFailure, (state) => ({
    ...state,
    error: state.error,
  }))
);

export function productsReducer(state: ProductsState, action: any) {
  return reducer(state, action);
}
