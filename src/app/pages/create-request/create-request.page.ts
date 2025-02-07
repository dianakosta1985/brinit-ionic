import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { State, Store } from '@ngrx/store';
import { map, Observable, of, tap } from 'rxjs';
import { AppState } from 'src/store/AppState';
import { loadProducts } from 'src/store/products/products.actions';
import { createRequest } from 'src/store/requests/requests.actions';
import { LocationService } from 'src/app/services/location/location.service';
import { Country, StateOrProvince } from 'utiles/types';
import { RequestsService } from 'src/app/services/requests/requests.service';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.page.html',
  styleUrls: ['./create-request.page.scss'],
})
export class CreateRequestPage implements OnInit {
  requestForm: FormGroup;
  imagePreview: string | null = null;
  minDate: string = new Date().toISOString();

  productsData$: any;
  filteredProducts: Observable<string[]> = of([]);
  selectedProduct: string = '';
  price: number | null = null;
  image: string | null = null;
  countries!: Country[];
  StatesOrgOrProvince: StateOrProvince[] = [];
  StatesDestOrProvince: StateOrProvince[] = [];
  selectedCountry!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private locationService: LocationService
  ) {
    this.requestForm = this.fb.group({
      name: ['', [Validators.required]],
      // category: ['', [Validators.required]], //TODO
      price: ['', [Validators.required, Validators.min(0)]],
      tipPercentage: ['', [Validators.required]],
      quantity: [
        '',
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
      originCountry: ['', [Validators.required]],
      destCountry: ['', [Validators.required]],
      originState: ['', [Validators.required]],
      destState: ['', [Validators.required]],
      image: [''],
      product: [''],
    });
  }

  ngOnInit() {
    this.store.dispatch(loadProducts());
    this.productsData$ = this.store.select(
      (state) => state.products.productsLst
    );
    this.fetchCountries();
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

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  uploadImage() {
    // Implement image upload logic
    console.log('Upload image');
  }

  createRequest() {
    if (this.requestForm.valid) {
      // const formData = {
      //   ...this.formatDate,
      // };

      const paload = {
        product_id: this.requestForm.value.product.id,
        from_country: this.requestForm.value.originCountry,
        from_state: this.requestForm.value.originState,
        to_country: this.requestForm.value.destCountry,
        to_state: this.requestForm.value.destState,
        priority: 0, // TODO
        quantity: this.requestForm.value.quantity,
        tip: this.requestForm.value.tipPercentage,
        is_matched: false,
      };

      this.store.dispatch(createRequest({ newRequest: paload }));

      this.router.navigate(['/pages/my-requests']);
    }
  }

  onProductSelection(e: any) {
    const selectedProduct = e.target.value;
    this.requestForm.patchValue({
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.images,
    });
  }
}
