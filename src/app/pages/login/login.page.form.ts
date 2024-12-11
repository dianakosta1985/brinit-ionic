import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class LoginPageForm {
  constructor(private fb: FormBuilder) {}

  createForm(): FormGroup {
    return this.fb.group({
      email: [
        '',
        Validators.required,
        Validators.email,
        //Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
      ],
      password: [
        '',
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/),
      ],
    });
  }
}
