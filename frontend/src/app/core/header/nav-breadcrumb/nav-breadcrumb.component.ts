import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-nav-breadcrumb',
  templateUrl: './nav-breadcrumb.component.html',
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class NavBreadcrumbComponent implements OnInit {
  public breadcrumbs: Array<{ label: string; url: string }> = [];
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.buildBreadcrumb(this.route.root)),
      )
      .subscribe((breadcrumbs: { label: string; url: string }[]) => {
        this.breadcrumbs = breadcrumbs;
      });
  }
  private buildBreadcrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Array<{ label: string; url: string }> = [],
  ): Array<{ label: string; url: string }> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }
      const label = child.snapshot.data['headerBreadcrumb'];
      if (label) {
        breadcrumbs.push({ label, url });
      }

      breadcrumbs = this.buildBreadcrumb(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
