import { Component, inject, model } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { EmployeeService } from '../../services/employee-data.service';
import { CreateEmployee } from '../../models/employees.model';

@Component({
  imports: [NzModalModule, ReactiveFormsModule, NzFormModule, NzInputModule],
  selector: 'app-add-employee-modal',
  styleUrl: './add-employee-modal.scss',
  templateUrl: './add-employee-modal.html',
})
export class AddEmployeeModal {
  isModalVisible = model<boolean>(false);

  private fb = inject(NonNullableFormBuilder);
  private employeeService = inject(EmployeeService);

  employeeForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    role: ['', [Validators.required]],
    department: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  handleOk(): void {
    if (this.employeeForm.invalid) {
      this.markFormAsDirty();
      return;
    }

    const employee: CreateEmployee = {
      name: this.employeeForm.getRawValue().name,
      role: this.employeeForm.getRawValue().role,
      department: this.employeeForm.getRawValue().department,
      email: this.employeeForm.getRawValue().email,
    };

    console.log('Submitting employee:', employee);

    this.employeeService.addEmployee(employee).subscribe({
      next: (response) => {
        console.log('Employee added successfully:', response);

        this.employeeService.getEmployees();
        this.isModalVisible.set(false);
        this.employeeForm.reset();
      },

      error: (error) => {
        console.error('Failed to add employee:', error);
      },
    });
  }

  handleCancel(): void {
    this.isModalVisible.set(false);
    this.employeeForm.reset();
  }

  private markFormAsDirty(): void {
    Object.values(this.employeeForm.controls).forEach((control) => {
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
    });
  }
}
