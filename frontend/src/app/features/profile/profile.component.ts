import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import GLOBAL_USER from '../auth/data/user.signal';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Role, User } from '../users/users.models';
import { BounceOnClickDirective } from '../../core/directives/bounce-on-click.directive';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers: [ProfileService],
  imports: [CommonModule, ReactiveFormsModule, BounceOnClickDirective],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly profileService = inject(ProfileService);
  readonly user = GLOBAL_USER;
  profileForm: FormGroup = this.fb.group({});
  roles = Object.values(Role);
  isEditMode: boolean = false;

  constructor() {
    effect(() => {
      this.user();
    });
  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: [this.user().name, [Validators.required, Validators.minLength(3)]],
      email: [this.user().email, [Validators.required, Validators.email]],
      role: [this.user().role, [Validators.required]],
    });

    this.profileForm.disable();
  }

  ngOnDestroy() {
    this.profileForm.reset();
  }

  get formName() {
    return this.profileForm.get('name');
  }

  get formEmail() {
    return this.profileForm.get('email');
  }

  get formRole() {
    return this.profileForm.get('role');
  }

  get submitLabel(): string {
    return this.isEditMode ? 'Save' : 'Edit';
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    }
  }
  // id in parameters
  private async editCredentials(
    newCredentials: Omit<
      User,
      'id' | 'createdAt' | 'updatedAt' | 'password' | 'tasks' | 'authStatus'
    >,
    userId: User['id'],
  ) {
    (
      await this.profileService.editCredentials(newCredentials, userId)
    ).subscribe({
      next: (response) => {
        console.log('Success in ProfileComponent.editCredentials:', response);
      },
      error: (error) => {
        console.error('Error in ProfileComponent.editCredentials:', error);
      },
    });
  }

  async processEdit() {
    if (this.isEditMode) {
      await this.editCredentials(this.profileForm.value, this.user().id);
      this.profileForm.disable();
      console.log(this.profileForm.value, this.user());
    } else {
      this.profileForm.enable();
    }
    this.isEditMode = !this.isEditMode;
  }
}
