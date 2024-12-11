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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule, BounceOnClickDirective],
  providers: [AuthService],
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
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

  onSubmit() {
    if (this.loginForm.valid) {
      const formValue: LoginUser = this.loginForm.value;

      this.authService.login(formValue).subscribe({
        next: (response) => {
          console.log('Login successful:', response); // Переходим на стартовый роут приложения, записываем себе токены
        },
        error: (error) => {
          console.error('Login error:', error);
          // Написать ошибку возле кнопки сабмита
        },
        complete: () => {
          console.log('Login request completed');
        },
      });
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
