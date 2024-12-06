import { Component } from '@angular/core';
import { SystemMenuComponent } from './core/system-menu/system-menu.component';
import { WorkspaceComponent } from './core/workspace/workspace.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SystemMenuComponent, WorkspaceComponent],
  template: `
    <div class="flex">
      <app-system-menu [style.width]="systemMenuWidth" />
      <app-workspace [style.width]="workspaceWidth()" />
    </div>
  `,
  styles: [],
})
export class AppComponent {
  systemMenuWidth = '170px';
  workspaceWidth() {
    return `calc(100% - ${this.systemMenuWidth})`;
  }
}
