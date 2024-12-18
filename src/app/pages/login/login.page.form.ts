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
  constructor(private fb: FormBuilder) {}

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

  createForm(): FormGroup {
    return this.fb.group({
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
}
