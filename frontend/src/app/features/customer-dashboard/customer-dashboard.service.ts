import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerDashboardService {

  sayHallo() {
    console.log('Helo from CustomerDashboardService')
  }
}
