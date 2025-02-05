import { Product } from 'utiles/types';

export interface ProductsState {
  productsLst: Product[];
  error: string | null;
}
