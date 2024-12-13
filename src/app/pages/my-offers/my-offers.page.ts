import { Component, OnInit } from '@angular/core';
import { data } from '../../../../api/dummyDate';
import { Offer } from 'utiles/types';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.page.html',
  styleUrls: ['./my-offers.page.scss'],
})
export class MyOffersPage implements OnInit {
  offer: Offer = {
    fromCountry: '',
    fromState: '',
    toCountry: '',
    toState: '',
  };
  showResults: boolean = false;
  requests: any[] = []; // List of requests that will be shown in the app-request-cards

  fromCountryStates: any[] = [];
  toCountryStates: any[] = [];
  countries = data.countries;
  countryStates = data.countryStates;

  constructor() {}

  onCountryChange(type: 'from' | 'to') {
    if (type === 'from') {
      this.fromCountryStates =
        data.countryStates[
          this.offer.fromCountry as unknown as keyof typeof data.countryStates
        ] || [];
      console.log(this.fromCountryStates);
    } else {
      this.toCountryStates =
        data.countryStates[
          this.offer.toCountry as unknown as keyof typeof data.countryStates
        ] || [];
    }
  }

  // Method to trigger search and show the request cards
  searchRequest() {
    this.showResults = true;
    this.requests = data.requestsData;
  }

  ngOnInit() {}
}
