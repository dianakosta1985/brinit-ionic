import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginPageForm } from './login.page.form';
import { Store } from '@ngrx/store';
import { hide, show } from 'src/store/loading/loading.actions';
import { login, recoverPassword } from 'src/store/login/login.actions';
import { AppState } from 'src/store/AppState';
import { ToastController } from '@ionic/angular';
import { LoginState } from 'src/store/login/LoginState';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm!: LoginPageForm;
  loginStateSub!: Subscription;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private toasterController: ToastController
  ) {
    this.loginForm = new LoginPageForm(fb);
  }

  ngOnInit() {
    this.loginStateSub = this.store
      .select('login')
      .subscribe(async (loginState: any) => {
        this.onIsRecoveredPassword(loginState);

        this.onIsLoggedIn(loginState);
        this.onError(loginState);

        this.toggleLoading(loginState);
      });
  }

  private async onError(loginState: LoginState) {
    if (loginState.error) {
      const toaster = await this.toasterController.create({
        position: 'bottom',
        message: loginState.error.message,
        color: 'danger',
      });
      toaster.present();
    }
  }

  private async onIsRecoveredPassword(loginState: LoginState) {
    if (loginState.isRecoveredPassword) {
      const toaster = await this.toasterController.create({
        position: 'bottom',
        message: 'Recovery email sent!',
        color: 'success',
      });
      toaster.present();
    }
  }

  login() {
    this.store.dispatch(
      login({
        email: this.loginForm.form.get('email')?.value,
        password: this.loginForm.form.get('password')?.value,
      })
    );
  }

  forgotEmailPassword() {
    this.store.dispatch(
      recoverPassword({ email: this.loginForm.form.get('email')?.value })
    );
  }

  ngOnDestroy(): void {
    if (this.loginStateSub) {
      this.loginStateSub.unsubscribe();
    }
  }

  private toggleLoading(loginState: LoginState) {
    if (loginState.isLoggingIn || loginState.isRecoveringPassword) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private onIsLoggedIn(loginState: LoginState) {
    if (loginState.isLoggedIn) {
      this.router.navigate(['/pages/my-requests']);
    }
  }
}
