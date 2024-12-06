import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './users.models';
import { CommonModule } from '@angular/common';
import {
  copyDateToClipboard,
  copyToClipboard,
} from '../../core/utils/copy-to-clipboard';

@Component({
  selector: 'users',
  standalone: true,
  imports: [CommonModule],
  providers: [UsersService],
  templateUrl: './users.component.html',
  styles: ``,
})
export class UsersComponent implements OnInit {
  private readonly userService = inject(UsersService);
  users: User[] = [];
  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.userService.get<User[]>().subscribe({
      next: (response) => {
        this.users = response.payload;
        console.log('Users:', this.users);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  public copyToClipboard(value: string, label: string): void {
    copyToClipboard(value, label);
  }

  public copyFormattedDateToClipboard(date: string, label: string): void {
    copyDateToClipboard(date, label);
  }
}
