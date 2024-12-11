import { Component, computed, inject } from '@angular/core';
import { SystemMenuComponent } from './core/components/system-menu/system-menu.component';
import { WorkspaceComponent } from './core/components/workspace/workspace.component';
import { AuthService } from './features/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [SystemMenuComponent, WorkspaceComponent],
  providers: [AuthService],
  template: `
    <div class="flex w-full h-screen">
      <app-system-menu [style.width]="systemMenuWidth()" />
      <app-workspace class="flex-grow" [style.width]="workspaceWidth()" />
    </div>
  `,
})
export class AppComponent {
  public readonly authService = inject(AuthService);

  systemMenuWidth = computed(() =>
    this.authService.currrentuser.authStatus() ? '170px' : '0',
  );

  workspaceWidth = computed(() => `calc(100% - ${this.systemMenuWidth()})`);
}
