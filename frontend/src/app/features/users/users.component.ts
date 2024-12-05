import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './users.models';
import { UserListItemComponent } from './components/user-list-item/user-list-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users',
  standalone: true,
  imports: [UserListItemComponent, CommonModule],
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
}
