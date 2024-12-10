import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { CreateUserComponent } from './create-user/create-user.component';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    providers: [AuthService],
    imports: [CreateUserComponent]
})
export class AuthComponent implements OnInit {
  private readonly authService = inject(AuthService);
  constructor() {}

  ngOnInit() {}
}
