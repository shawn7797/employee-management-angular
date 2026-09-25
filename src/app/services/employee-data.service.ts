import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { CreateEmployee, Employee } from '../models/employees.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private http = inject(HttpClient);

  private baseUrl = environment.baseUrl;
  private apiUrl = this.baseUrl + 'employees/';

  employees = signal<Employee[]>([]);

  getEmployees(): void {
    this.http.get<Employee[]>(this.apiUrl).subscribe({
      next: (data) => {
        // console.log('Employees:', data);
        this.employees.set(data);
      },
      error: (err) => {
        console.error('Could not fetch employees:', err);
      },
    });
  }

  addEmployee(employee: CreateEmployee) {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(id: number, employee: Employee) {
    return this.http.put<Employee>(`${this.apiUrl}${id}/`, employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
