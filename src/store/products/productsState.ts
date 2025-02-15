import { Product } from 'utiles/types';

export interface ProductsState {
  productsLst: Product[];
  newProduct: Product | null;
  error: string | null;
}
