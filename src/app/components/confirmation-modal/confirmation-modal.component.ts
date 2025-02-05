import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { ModalState } from 'src/store/confirmModal/modalState';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  @Input() message: string = 'Are you sure you want to perform this action?';
  @Input() title: string = 'Confirm action';

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
  isVisible$: Observable<boolean>;

  constructor(private store: Store<{ modal: ModalState }>) {
    this.isVisible$ = this.store.select((state) => state.modal.showModal);
  }

  ngOnInit() {}

  onConfirm() {
    this.confirmed.emit();
  }

  onCancel() {
    this.cancelled.emit();
  }
}
