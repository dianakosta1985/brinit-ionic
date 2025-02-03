import { Component, OnInit, Input } from '@angular/core';
import { Request } from '../../../../utiles/types';
import { Router } from '@angular/router';
import { map, Observable, startWith, tap } from 'rxjs';
import { AppState } from 'src/store/AppState';
import { Store } from '@ngrx/store';
import { loadRequests } from 'src/store/requests/requests.actions';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.page.html',
  styleUrls: ['./my-requests.page.scss'],
})
export class MyRequestsPage implements OnInit {
  requestData$!: Observable<Request[]>;

  constructor(private router: Router, private store: Store<AppState>) {
    this.requestData$ = this.store.select('requests').pipe(
      map((state: any) => state?.requestsLst || []), // Handle null or undefined states
      tap((requests) => console.log('Mapped Requests:', requests)) // Debugging log
    );
  }

  ngOnInit() {
    this.store.dispatch(loadRequests());
  }

  goToCreateRequest() {
    this.router.navigate(['/create-request']);
  }
}
