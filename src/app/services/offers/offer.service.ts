import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer, Request } from 'utiles/types';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/brinit/offers';

  constructor(private http: HttpClient) {}

  //   fetchRequests(): Observable<Request[]> {
  //     return this.http.get<any>(this.apiUrl);
  //   }

  //   patchRequest(requestId: string, body: Partial<Request>): Observable<Request> {
  //     return this.http.patch<any>(`${this.apiUrl}/${requestId}`, body);
  //   }

  postOffer(body: Offer): Observable<Offer> {
    return this.http.post<any>(this.apiUrl, body);
  }
}
