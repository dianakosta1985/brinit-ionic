import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, of, tap } from 'rxjs';
import { AppState } from 'src/store/AppState';
import { loadProducts } from 'src/store/products/products.actions';
import { Product } from 'utiles/types';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.requestForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      tipPercentage: ['', [Validators.required]],
      quantity: [
        '',
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
      origin: ['', [Validators.required]],
      delivery: ['', [Validators.required]],
      deliveryDate: [new Date().toISOString(), [Validators.required]],
      image: [''],
    });
  }

  ngOnInit() {
    this.store.dispatch(loadProducts());
    this.productsData$ = this.store.select(
      (state) => state.products.productsLst
    );
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
      const formData = {
        ...this.requestForm.value,
        deliveryDate: this.formatDate(this.requestForm.value.deliveryDate),
      };
      console.log('Form data:', formData);
      // Implement request creation logic
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
