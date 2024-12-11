import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginPageForm } from './login.page.form';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form!: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = new LoginPageForm(this.fb).createForm();
  }

  login() {
    this.router.navigate(['/pages/my-requests']);
  }
}
