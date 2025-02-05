import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Request } from '../../../../utiles/types';
import { AppState } from 'src/store/AppState';
import { Store } from '@ngrx/store';
import { showModal } from 'src/store/confirmModal/modal.actions';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss'],
})
export class RequestCardComponent implements OnInit {
  @Input() request!: Request;
  @Output() deleteRequest = new EventEmitter<string>();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  openDeleteModal() {
    //this.showModal = true;
    this.store.dispatch(showModal());
    this.deleteRequest.emit(this.request.id);
  }

  // closeDeleteModal() {
  //   this.showModal = false;
  // }
}
