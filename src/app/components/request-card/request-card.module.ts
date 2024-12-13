import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestCardComponent } from './request-card.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, IonicModule],
  exports: [RequestCardComponent],
  declarations: [RequestCardComponent],
})
export class RequestCardModule {}
