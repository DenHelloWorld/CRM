import { Component, OnInit, inject } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [],
  providers: [DashboardService],
  templateUrl: './dashboard.html',
  styles: ``,
})
export class DashboardComponent implements OnInit {
  public dashService = inject(DashboardService);

  ngOnInit(): void {}
}
