import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  UserService } from '../Shared/_services';
import { AlertService } from '../Shared/_services/alert.service';
import { error } from 'protractor';
import { log } from 'util';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error: string = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,  
    private userService: UserService,
    private alertService: AlertService,
  ) {
    // redirect to home if already logged in
    //if (this.userService.user) {
    //  this.router.navigate(['/']);
    //}
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }//else
    this.loading = true;
    this.userService.register(this.registerForm.value)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
          this.loading = false;

        },
        errorMessage => {
          this.error = errorMessage;
          console.log(errorMessage);
          this.loading = false;

        }
    );
  }
}
