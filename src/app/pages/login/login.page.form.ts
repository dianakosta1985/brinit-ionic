import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';

export class LoginPageForm {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email],
        [this.asyncEmailValidator.bind(this)], // Example of an async validator
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        ],
      ],
    });
  }

  asyncEmailValidator(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      delay(500), // Simulate async call
      map((value) =>
        value === 'test@example.com' ? { emailTaken: true } : null
      )
    );
  }

  isFieldValid(field: string): boolean | undefined {
    const control = this.form.get(field);
    return control?.invalid && control?.touched;
  }

  isTouchedOrDirty(field: string): boolean | undefined {
    const control = this.form.get(field);
    return control?.touched || control?.dirty;
  }
}
