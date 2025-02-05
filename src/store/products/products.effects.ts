import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import {
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
} from './products.actions';
import { ProductsService } from 'src/app/services/products/products.service';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      tap(() => console.log('Action received: loadProducts')),
      switchMap(() =>
        this.productsService.fetchProducts().pipe(
          //tap((productsLst) =>
          // console.log('Fetched productsLst:', productsLst)
          //),
          map((productsLst) => loadProductsSuccess({ productsLst })),
          catchError((error) => {
            console.error('Error fetching requests:', error);
            return of(loadProductsFailure({ error: error.message }));
          })
        )
      )
    )
  );
}
