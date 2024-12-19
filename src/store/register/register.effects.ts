import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { register, registerSuccess, registerFail } from './register.actions';
import { User } from 'src/app/model/user/User';
import { UserRegister } from 'src/app/model/user/UserRegister';

@Injectable()
export class RegisterEffects {
  constructor(private action$: Actions, private authService: AuthService) {}

  register$ = createEffect(() =>
    this.action$.pipe(
      ofType(register),
      switchMap((payload: { userRegister: UserRegister }) =>
        this.authService.register(payload.userRegister).pipe(
          map(() => registerSuccess()),
          catchError((error) => of(registerFail({ error })))
        )
      )
    )
  );
}
