import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeSharedService {
  private selectedEmployeeSource = new BehaviorSubject<Employee | null>(null);
  selectedEmployee$ = this.selectedEmployeeSource.asObservable();

  private employeeDeletedSource = new BehaviorSubject<number | null>(null);
  employeeDeleted$ = this.employeeDeletedSource.asObservable();

  constructor() {}

  selectEmployee(employee: Employee) {
    this.selectedEmployeeSource.next(employee);
  }

  notifyEmployeeDeletion(employeeId: number) {
    this.employeeDeletedSource.next(employeeId);
  }
}
