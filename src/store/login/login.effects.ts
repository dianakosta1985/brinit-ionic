import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import {
  login,
  loginFail,
  loginSuccess,
  recoverPassword,
  recoverPasswordFail,
  recoverPasswordSuccess,
} from './login.actions';

@Injectable()
export class LoginEffects {
  constructor(private action$: Actions, private authService: AuthService) {}

  recoveryPassword$ = createEffect(() =>
    this.action$.pipe(
      ofType(recoverPassword),
      switchMap((payload: { email: string }) =>
        this.authService.recoverEmailPassword(payload.email).pipe(
          map(() => recoverPasswordSuccess()),
          catchError((error) => of(recoverPasswordFail({ error })))
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(login),
      switchMap((payload: { email: string; password: string }) =>
        this.authService.login(payload.email, payload.password).pipe(
          map((user) => loginSuccess({ user })),
          catchError((error) => of(loginFail({ error })))
        )
      )
    )
  );
}
