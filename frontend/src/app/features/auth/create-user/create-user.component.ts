import { Role } from './../../users/users.models';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateUser } from '../auth.models';
import { CommonModule } from '@angular/common';
import { BounceOnClickDirective } from '../../../core/directives/bounce-on-click.directive';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  imports: [CommonModule, ReactiveFormsModule, BounceOnClickDirective],
  providers: [AuthService],
})
export class CreateUserComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  roles = Object.values(Role);
  createUserForm: FormGroup = this.fb.group({});
  ngOnInit() {
    this.createUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_])/),
        ],
      ],
    });
  }
  ngOnDestroy() {
    this.createUserForm = this.fb.group({});
  }

  get name() {
    return this.createUserForm.get('name');
  }

  get email() {
    return this.createUserForm.get('email');
  }

  get role() {
    return this.createUserForm.get('role');
  }

  get password() {
    return this.createUserForm.get('password');
  }

  onSubmit() {
    if (this.createUserForm.valid) {
      this.authService.register(this.createUserForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.router.navigate(['auth/sign-in']);
        },
        error: (error) => {
          console.error('Login error:', error);
          const errorMessage =
            error.status === 0 ? 'Internet connection error' : error.error;
          this.createUserForm.setErrors({ serverError: errorMessage });
        },
        complete: () => {
          console.log('Registration request completed');
        },
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
