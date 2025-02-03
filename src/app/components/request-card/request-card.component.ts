import { Component, Input, OnInit } from '@angular/core';
import { Request } from '../../../../utiles/types';
import { AppState } from 'src/store/AppState';
import { Store } from '@ngrx/store';
import { deleteRequest } from 'src/store/requests/requests.actions';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss'],
})
export class RequestCardComponent implements OnInit {
  @Input() request!: Request;
  @Input() showModal: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  openDeleteModal() {
    this.showModal = true;
  }

  closeDeleteModal() {
    this.showModal = false;
  }

  deleteRequest() {
    this.store.dispatch(deleteRequest({ requestId: this.request.id }));
    this.showModal = false;
  }
}
