import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-logo',
    imports: [RouterModule],
    template: `
    <a
      [routerLink]="'/'"
      class="flex font-medium items-center text-white"
    >
      <span
        class="ml-3 text-xl bg-purple-800 rounded-full w-14 h-14 flex items-center justify-center"
      >
        CRM
      </span>
    </a>
  `
})
export class LogoComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
