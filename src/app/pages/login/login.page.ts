import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginPageForm } from './login.page.form';
import { Store } from '@ngrx/store';
import { hide, show } from 'src/store/loading/loading.actions';
import {
  login,
  loginFail,
  loginSuccess,
  recoverPassword,
  recoverPasswordFail,
  recoverPasswordSuccess,
} from 'src/store/login/login.actions';
import { AppState } from 'src/store/AppState';
import { ToastController } from '@ionic/angular';
import { LoginState } from 'src/store/login/LoginState';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user/User';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  form!: FormGroup;
  loginStateSub!: Subscription;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private toasterController: ToastController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = new LoginPageForm(this.fb).createForm();

    this.loginStateSub = this.store
      .select('login')
      .subscribe(async (loginState: any) => {
        this.onIsRecoveredPassword(loginState);

        // this.onIsRecoveringPassword(loginState);
        // this.onIsLoggingIn(loginState);
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

  // private onIsRecoveringPassword(loginState: LoginState) {
  //   if (loginState.isRecoveredPassword) {
  //     this.authService
  //       .recoverEmailPassword(this.form.get('email')?.value)
  //       .subscribe(
  //         () => {
  //           this.store.dispatch(recoverPasswordSuccess());
  //         },
  //         (error) => {
  //           this.store.dispatch(recoverPasswordFail({ error }));
  //           console.log(error);
  //         }
  //       );
  //   }
  // }

  // private onIsLoggingIn(loginState: LoginState) {
  //   if (loginState.isLoggingIn) {
  //     const email = this.form.get('email')?.value;
  //     const password = this.form.get('password')?.value;
  //     this.authService.login(email, password).subscribe(
  //       (user) => {
  //         this.store.dispatch(loginSuccess({ user }));
  //       },
  //       (error) => {
  //         this.store.dispatch(loginFail({ error }));
  //       }
  //     );
  //   }
  // }

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
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
      })
    );
  }

  forgotEmailPassword() {
    this.store.dispatch(
      recoverPassword({ email: this.form.get('email')?.value })
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
