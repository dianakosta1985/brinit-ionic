import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyRequestsPageRoutingModule } from './my-requests-routing.module';

import { MyRequestsPage } from './my-requests.page';
import { RequestCardModule } from 'src/app/components/request-card/request-card.module';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyRequestsPageRoutingModule,
    RequestCardModule,
  ],
  declarations: [MyRequestsPage, ConfirmationModalComponent],
})
export class MyRequestsPageModule {}
