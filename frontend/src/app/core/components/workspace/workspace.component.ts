import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  template: `
    <main>
      <app-header class="w-full" />
      <router-outlet class="w-full" />
    </main>
  `,
})
export class WorkspaceComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
