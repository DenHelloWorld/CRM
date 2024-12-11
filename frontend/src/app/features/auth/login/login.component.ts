import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BounceOnClickDirective } from '../../../core/directives/bounce-on-click.directive';
import { AuthService } from '../auth.service';
import { LoginUser } from '../auth.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule, BounceOnClickDirective],
  providers: [AuthService],
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  loginForm: FormGroup = this.fb.group({});
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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
    this.loginForm = this.fb.group({});
  }

  onSubmit(): void {
    if (!this.loginForm.valid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.router.navigate(['auth']);
      },
      error: (error) => {
        console.error('Login error:', error);
        const errorMessage =
          error.status === 0 ? 'Internet connection error' : error.error;
        this.loginForm.setErrors({ serverError: errorMessage });
      },
      complete: () => console.log('Login request completed'),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
