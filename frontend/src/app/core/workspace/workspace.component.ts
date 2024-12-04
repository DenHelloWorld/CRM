import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  template: `
    <main>
      <app-header />

      <router-outlet />
    </main>
  `,
})
export class WorkspaceComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
