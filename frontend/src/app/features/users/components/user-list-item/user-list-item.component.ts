import { Component, Input } from '@angular/core';
import { User } from '../../users.models';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  standalone: true,
})
export class UserListItemComponent {
  @Input() user!: User;
}
