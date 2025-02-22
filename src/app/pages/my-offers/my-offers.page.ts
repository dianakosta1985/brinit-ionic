import { Component, OnInit, ViewChild } from '@angular/core';
import { Country, Offer, StateOrProvince } from 'utiles/types';
import { LocationService } from 'src/app/services/location/location.service';
import { IonDatetime } from '@ionic/angular';
import { createOffer } from 'src/store/offers/offers.actiions';
import { Store } from '@ngrx/store';
import { hide, show } from 'src/store/loading/loading.actions';
import { AppState } from 'src/store/AppState';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.page.html',
  styleUrls: ['./my-offers.page.scss'],
})
export class MyOffersPage implements OnInit {
  showResults: boolean = false;
  requests$: Observable<any>;
  countries!: Country[];
  StatesOrgOrProvince: StateOrProvince[] = [];
  StatesDestOrProvince: StateOrProvince[] = [];
  newOffer: Offer;
  selectedCountry!: string;

  fromCountryStates: any[] = [];
  toCountryStates: any[] = [];

  isModalOpen = false;
  selectedDate: string = '';
  selectedDateFormatted: string = '';
  deliveryDate: string = '';

  constructor(
    private locationService: LocationService,
    private store: Store<AppState>
  ) {
    this.newOffer = {
      from_country: '',
      to_country: '',
      from_state: '',
      to_state: '',
      date_of_leaving: new Date(),
    };
    this.requests$ = this.store.select('offers').pipe(
      map(
        (state: any) =>
          //created_offer: state?.created_offer,
          state?.matched_requests
      ) // Handle null or undefined states
    );
  }

  // Method to trigger search and show the request cards
  searchRequest() {
    this.showResults = true;
    debugger;
    // console.log(this.newOffer);
    // this.store.dispatch(show());
    this.store.dispatch(createOffer({ newOffer: this.newOffer }));
    // this.store.dispatch(hide());
  }

  ngOnInit() {
    this.fetchCountries();
  }

  onDateChange(event: any) {
    console.log('Selected Date:', event.detail.value);
    this.newOffer.date_of_leaving = event.detail.value;
  }

  fetchCountries() {
    this.locationService.fetchCountries().subscribe((data: Country[]) => {
      this.countries = data;
    });
  }

  onOriginCountryChange(event: any) {
    this.selectedCountry = event.detail.value;
    this.fetchOriginStates(this.selectedCountry);
  }

  onDestCountryChange(event: any) {
    this.selectedCountry = event.detail.value;
    this.fetchDestStates(this.selectedCountry);
  }

  fetchOriginStates(country_id: string) {
    this.locationService
      .fetchStateOrProvince(country_id)
      .subscribe((data: StateOrProvince[]) => {
        this.StatesOrgOrProvince = data;
      });
  }

  fetchDestStates(country_id: string) {
    this.locationService
      .fetchStateOrProvince(country_id)
      .subscribe((data: StateOrProvince[]) => {
        this.StatesDestOrProvince = data;
      });
  }
}
