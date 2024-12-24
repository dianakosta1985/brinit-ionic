import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterForm } from './register.form';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { register } from 'src/store/register/register.actions';
import { RegisterState } from 'src/store/register/RegisterState';
import { hide, show } from 'src/store/loading/loading.actions';
import { IonInput, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationService } from 'src/app/services/location/location.service';

declare var google: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild('autocomplete') autocomplete!: IonInput;
  //registerStateSubscription: Subscription;

  constructor(
    public registerForm: RegisterForm,
    private router: Router,
    private store: Store<AppState>,
    private toaster: ToastController,
    private geolocation: Geolocation,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.watchRegisterState();
    this.fillUserAdressWithUserCurrentPosition();
  }

  // ngOnDestroy() {
  //   this.registerStateSubscription.unsubscribe();
  // }0

  ionViewDidEnter() {
    this.autocomplete.getInputElement().then((ref: any) => {
      const autocomplete = new google.maps.places.Autocomplete(ref);
      autocomplete.addListener('place_changed', () => {
        this.registerForm.setAddress(autocomplete.getPlace());
      });
    });
  }

  register() {
    if (this.registerForm.form.valid) {
      this.store.dispatch(
        register({ userRegister: this.registerForm.form.value })
      );
    }
  }

  private fillUserAdressWithUserCurrentPosition() {
    this.geolocation.getCurrentPosition().then((position: any) => {
      this.locationService.geocode(position.coords).subscribe((result: any) => {
        this.registerForm.setAddress(result);
      });
    });
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
