import { Component, signal } from '@angular/core';
import { NavBar } from './components/nav-bar/nav-bar';
import { EmployeeFilter } from './components/employee-filter/employee-filter';
import { EmployeeTable } from './components/employee-table/employee-table';

@Component({
  imports: [NavBar, EmployeeFilter, EmployeeTable],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('employee-management-angular');
}
