import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestCardComponent } from './request-card.component';
import { IonicModule } from '@ionic/angular';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  exports: [RequestCardComponent],
  declarations: [RequestCardComponent, ConfirmationModalComponent],
})
export class RequestCardModule {}
