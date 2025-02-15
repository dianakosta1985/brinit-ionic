import { createAction, props } from '@ngrx/store';
import { Product } from 'utiles/types';

export const loadProducts = createAction('[Products] Load Products');
export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ productsLst: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: string }>()
);

export const createProduct = createAction(
  '[Product] Create Product',
  props<{ newProduct: any }>()
);

export const createProductSucess = createAction(
  '[Product] Create Product Success',
  props<{ newProduct: Product }>()
);

export const createProductFailure = createAction(
  '[Product] Create Product Failure',
  props<{ error: string }>()
);
