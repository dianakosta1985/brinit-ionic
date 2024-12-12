import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginPageForm } from './login.page.form';
import { Store } from '@ngrx/store';
import { AppState } from '@capacitor/app';
import { hide, show } from 'src/store/loading/loading.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form!: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.form = new LoginPageForm(this.fb).createForm();
  }

  login() {
    this.router.navigate(['/pages/my-requests']);
  }

  forgotEmailPassword() {
    this.store.dispatch(show());

    setTimeout(() => {
      this.store.dispatch(hide());
    }, 3000);
  }
}
