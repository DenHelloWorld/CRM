import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from './users.service';

interface User {}
@Component({
  selector: 'users',
  standalone: true,
  imports: [],
  providers: [UsersService],
  template: ` <p>users works!</p> `,
  styles: ``,
})
export class UsersComponent implements OnInit {
  private readonly userService = inject(UsersService);
  ngOnInit(): void {
    this.userService.get().subscribe({
      next: (response) => {
        console.log('Response:', response);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
