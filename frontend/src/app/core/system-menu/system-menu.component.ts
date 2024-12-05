import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BounceOnClickDirective } from '../directives/bounce-on-click.directive';

@Component({
  selector: 'app-system-menu',
  templateUrl: './system-menu.component.html',
  standalone: true,
  imports: [RouterModule, BounceOnClickDirective],
})
export class SystemMenuComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
