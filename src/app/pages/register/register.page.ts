import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterForm } from './register.form';
import { LoginPageForm } from '../login/login.page.form';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { register } from 'src/store/register/register.actions';
import { RegisterState } from 'src/store/register/RegisterState';
import { hide, show } from 'src/store/loading/loading.actions';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(
    public registerForm: RegisterForm,
    private router: Router,
    private store: Store<AppState>,
    private toaster: ToastController
  ) {}

  ngOnInit() {
    this.watchRegisterState();
  }

  register() {
    if (this.registerForm.form.valid) {
      this.store.dispatch(
        register({ userRegister: this.registerForm.form.value })
      );
    }
  }

  private watchRegisterState() {
    this.store.select('register').subscribe((state) => {
      this.toggleLoading(state);

      if (state.isRegistered) {
        this.router.navigate(['/login']);
      }

      if (state.error) {
        this.toaster
          .create({
            message: state.error.message,
            duration: 5000,
            header: 'registration failed',
            color: 'danger',
          })
          .then((toast) => toast.present());
      }
    });
  }

  private toggleLoading(state: RegisterState) {
    if (state.isRegistring) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }
}
