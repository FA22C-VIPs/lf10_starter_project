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

  private employeeCreationClickedSource = new BehaviorSubject<boolean>(false);
  employeeCreationClicked$ = this.employeeCreationClickedSource.asObservable();

  constructor() {}

  selectEmployee(employee: Employee) {
    this.selectedEmployeeSource.next(employee);
    this.resetEmployeeCreation();
  }

  notifyEmployeeDeletion(employeeId: number) {
    this.employeeDeletedSource.next(employeeId);
  }

  openEmployeeCreation() {
    this.employeeCreationClickedSource.next(true);
    this.resetEmployeeSelection();
  }

  resetEmployeeSelection() {
    this.selectedEmployeeSource.next(null);
  }

  resetEmployeeCreation() {
    this.employeeCreationClickedSource.next(false);
  }
}
