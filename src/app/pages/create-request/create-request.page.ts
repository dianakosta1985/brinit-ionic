import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSearchbar, IonSelect, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { State, Store } from '@ngrx/store';
import { filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { AppState } from 'src/store/AppState';
import {
  createProduct,
  loadProducts,
} from 'src/store/products/products.actions';
import { createRequest } from 'src/store/requests/requests.actions';
import { LocationService } from 'src/app/services/location/location.service';
import { Country, Product, StateOrProvince } from 'utiles/types';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.page.html',
  styleUrls: ['./create-request.page.scss'],
})
export class CreateRequestPage implements OnInit {
  @ViewChild('searchBar', { static: false }) searchBar!: IonSearchbar;
  requestForm: FormGroup;
  imagePreview: string | null = null;
  minDate: string = new Date().toISOString();
  newImage: string = 'assets/images/add-image.svg';

  productsData$!: Observable<Product[]>;
  newProductData!: Product;
  newProductData$!: any;
  filteredProducts: Product[] = [];
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
    private locationService: LocationService // private modalCtrl: ModalController
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
  onSearchClear() {
    this.filteredProducts = [];
    this.searchBar.value = '';
  }

  filterProduct(e: Event) {
    const target = e.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    if (query === '') {
      this.filteredProducts = [];
    } else {
      this.productsData$.subscribe((data: Product[]) => {
        this.filteredProducts = data.filter((p: Product) =>
          p.name.toLowerCase().includes(query)
        );
      });
    }
  }

  // cancelSelection() {
  //   this.modalCtrl.dismiss();
  // }

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
      let productId = this.requestForm.value.product.id || null;
      const payload = {
        // product_id: productExist,
        from_country: this.requestForm.value.originCountry,
        from_state: this.requestForm.value.originState,
        to_country: this.requestForm.value.destCountry,
        to_state: this.requestForm.value.destState,
        priority: 0, // TODO
        quantity: this.requestForm.value.quantity,
        tip: this.requestForm.value.tipPercentage,
        is_matched: false,
      };

      if (!productId) {
        this.newProductData = {
          name: this.requestForm.value.name,
          price: this.requestForm.value.price,
          images: this.newImage,
        };
        this.store.dispatch(createProduct({ newProduct: this.newProductData }));
        this.newProductData$ = this.store.select(
          (state) => state.products.newProduct
        );
        this.newProductData$
          .pipe(
            filter((pro): pro is Product => pro !== null && pro !== undefined), // Filter nulls
            tap((pro: Product) => {
              this.newProductData = pro;
              //console.log('new Product', pro);
            }),
            tap((pro: Product) => {
              this.store.dispatch(
                createRequest({
                  newRequest: {
                    ...payload,
                    product_id: pro.id,
                  },
                })
              );
            })
          )
          .subscribe();
      } else {
        this.store.dispatch(
          createRequest({
            newRequest: { ...payload, product_id: productId },
          })
        );
      }

      // this.router.navigate(['/pages/my-requests']);
    }
  }

  onProductSelection(selectedProduct: any) {
    this.requestForm.patchValue({
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.images,
    });
    this.newImage = selectedProduct.images;
    this.onSearchClear();
  }
}
