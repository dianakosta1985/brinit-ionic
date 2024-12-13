import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyOffersPageRoutingModule } from './my-offers-routing.module';

import { MyOffersPage } from './my-offers.page';
import { RequestCardModule } from 'src/app/components/request-card/request-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyOffersPageRoutingModule,
    RequestCardModule,
  ],
  declarations: [MyOffersPage],
})
export class MyOffersPageModule {}
