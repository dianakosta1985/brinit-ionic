import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  findAddressNumber,
  findCity,
  findCountry,
  findState,
  findStreet,
  findZipCode,
} from 'utiles/address-utils';

@Injectable({
  providedIn: 'root',
})
export class RegisterForm {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*\d).{8,}$/), // At least 8 characters with a number
          ],
        ],
        confirmPassword: ['', Validators.required],
        phone: [
          '',
          [
            Validators.pattern(/^[0-9]{10}$/), // 10-digit phone number
          ],
        ],

        // Address Information
        address: ['', [Validators.required]],
        number: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        country: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zipCode: ['', [Validators.required, Validators.pattern(/^\d{5,6}$/)]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  setAddress(place: any) {
    const addressCompArray = place.address_components;
    this.form
      ?.get('address')
      ?.setValue(
        `${findAddressNumber(addressCompArray)} ${findStreet(addressCompArray)}`
      );
    this.form?.get('number')?.setValue(findAddressNumber(addressCompArray));
    this.form?.get('street')?.setValue(findStreet(addressCompArray));
    this.form?.get('city')?.setValue(findCity(addressCompArray));
    this.form?.get('state')?.setValue(findState(addressCompArray));
    this.form?.get('country')?.setValue(findCountry(addressCompArray));
    this.form?.get('zipCode')?.setValue(findZipCode(addressCompArray));
  }
}
