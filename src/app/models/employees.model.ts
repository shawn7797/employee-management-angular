export interface Employee {
  id: number; // Django auto-generates this id
  name: string;
  role: string;
  department: string;
  email: string;
}

export type CreateEmployee = Omit<Employee, 'id'>;
