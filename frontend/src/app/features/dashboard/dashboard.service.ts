import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  sayHallo() {
    console.log('Helo from CustomerDashboardService')
  }
}
