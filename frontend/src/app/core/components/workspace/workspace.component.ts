import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-workspace',
  imports: [HeaderComponent, RouterOutlet],
  template: `
    <main class="h-full overflow-auto">
      <app-header class="w-full" />
      <router-outlet />
    </main>
  `,
})
export class WorkspaceComponent {}
