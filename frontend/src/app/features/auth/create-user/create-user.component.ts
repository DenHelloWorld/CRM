import { Role } from './../../users/users.models';
import { Component, inject, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BounceOnClickDirective],
  providers: [AuthService],
})
export class CreateUserComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  roles = Object.values(Role);
  createUserForm: FormGroup = this.fb.group({});
  ngOnInit(): void {
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
      const formValue: CreateUser = this.createUserForm.value;

      this.authService.register(formValue).subscribe({
        next: (response) => {
          console.log('Registration successful:', response); // Переходим на роут логина
        },
        error: (error) => {
          console.error('Registration error:', error);
          // Написать ошибку возле кнопки сабмита
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
