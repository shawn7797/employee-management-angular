import { Component, inject, OnInit } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { EmployeeService } from '../../services/employee-data.service';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  imports: [NzDividerModule, NzTableModule, NzIconModule, NzPopconfirmModule],
  selector: 'app-employee-table',
  styleUrl: './employee-table.scss',
  templateUrl: './employee-table.html',
})
export class EmployeeTable implements OnInit {
  private employeeService = inject(EmployeeService);

  employees = this.employeeService.employees;

  ngOnInit(): void {
    this.employeeService.getEmployees();
  }

  deleteEmployee(empId: number) {
    this.employeeService.deleteEmployee(empId).subscribe({
      next: () => {
        console.log('Employee Deleted: ', empId);

        this.employeeService.getEmployees();
      },
      error: (err) => {
        console.error('Could not delete employee:', err);
      },
    });
  }
}
