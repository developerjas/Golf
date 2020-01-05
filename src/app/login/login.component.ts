import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {  UserService } from '../Shared/_services';
import { User } from '../Shared/_models';
import { AlertService } from '../Shared/_services/alert.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  @Output() orderCreated = new EventEmitter<User>();
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string = null;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.login(this.loginForm.value)
      .subscribe(
        data => {
          this.router.navigate(['/order-create']);
        },
        errorMessage => {
          this.error = errorMessage;
          console.log(errorMessage);
          this.loading = false;
        }
    );
  }
}

