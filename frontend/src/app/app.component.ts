import { Component } from '@angular/core';
import { SystemMenuComponent } from './core/system-menu/system-menu.component';
import { WorkspaceComponent } from './core/workspace/workspace.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SystemMenuComponent, WorkspaceComponent],
  template: `
    <div class="flex">
      <app-system-menu />
      <app-workspace class="w-full"/>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'frontend';
}
