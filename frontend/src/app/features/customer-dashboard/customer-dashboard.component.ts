import { Component, OnInit, inject } from '@angular/core';
import { CustomerDashboardService } from './customer-dashboard.service';

@Component({
  selector: 'customer-dashboard',
  standalone: true,
  imports: [],
  providers:[CustomerDashboardService],
  template: `
    <p>
      customer-dashboard works!
    </p>
  `,
  styles: ``
})
export class CustomerDashboardComponent implements OnInit {

  public customerDashService = inject(CustomerDashboardService);

  ngOnInit(): void {
    console.log('CustomerDashboardComponent')
    this.customerDashService.sayHallo()
  }

}
