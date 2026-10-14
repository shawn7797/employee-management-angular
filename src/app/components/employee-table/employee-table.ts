import { Component, computed, inject, input, OnInit } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { EmployeeService } from '../../services/employee-data.service';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  imports: [NzDividerModule, NzTableModule, NzIconModule, NzPopconfirmModule],
  selector: 'app-employee-table',
  styleUrl: './employee-table.scss',
  templateUrl: './employee-table.html',
})
export class EmployeeTable implements OnInit {
  filterText = input('');

  private employeeService = inject(EmployeeService);
  private readonly message = inject(NzMessageService);

  employees = this.employeeService.employees;

  ngOnInit(): void {
    this.employeeService.getEmployees();
  }

  readonly filteredEmployees = computed(() => {
    const query = this.filterText().toLowerCase().trim();
    const list = this.employees();

    if (!query) return list;

    return list.filter(
      (emp) =>
        emp.name.toLowerCase().includes(query) ||
        emp.role.toLowerCase().includes(query) ||
        emp.department.toLowerCase().includes(query),
    );
  });

  deleteEmployee(empId: number) {
    this.employeeService.deleteEmployee(empId).subscribe({
      next: () => {
        // console.log('Employee Deleted: ', empId);

        this.employeeService.getEmployees();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.message.error('Error occurred while deleting employee!');
      },
    });
  }
}
