import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'utiles/types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/brinit/products';

  constructor(private http: HttpClient) {}

  fetchProducts(): Observable<Product[]> {
    return this.http.get<any>(this.apiUrl);
  }

  postProduct(body: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, body);
  }
}
