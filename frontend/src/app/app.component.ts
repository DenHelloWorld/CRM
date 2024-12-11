import { Component, computed, inject, OnInit } from '@angular/core';
import { SystemMenuComponent } from './core/components/system-menu/system-menu.component';
import { WorkspaceComponent } from './core/components/workspace/workspace.component';
import { GLOBAL_USER } from './features/auth/user.signal';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [SystemMenuComponent, WorkspaceComponent],
  template: `
    <div class="flex w-full h-screen">
      <app-system-menu [style.width]="systemMenuWidth()" />
      <app-workspace class="flex-grow" [style.width]="workspaceWidth()" />
    </div>
  `,
})
export class AppComponent implements OnInit {
  private titleService = inject(Title);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  systemMenuWidth = computed(() => (GLOBAL_USER().authStatus ? '170px' : '0'));
  workspaceWidth = computed(() => `calc(100% - ${this.systemMenuWidth()})`);

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const route = this.getChildRoute(this.activatedRoute);
        const breadcrumb = route?.snapshot.data['headerBreadcrumb'];
        if (breadcrumb) {
          this.titleService.setTitle(breadcrumb);
        }
      });
  }

  private getChildRoute(route: ActivatedRoute): ActivatedRoute {
    return route.firstChild ? this.getChildRoute(route.firstChild) : route;
  }
}
