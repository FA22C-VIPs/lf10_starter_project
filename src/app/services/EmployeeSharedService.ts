import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeSharedService {
  private selectedEmployeeSource = new BehaviorSubject<Employee | null>(null);
  selectedEmployee$ = this.selectedEmployeeSource.asObservable();

  private employeeChangedSource = new BehaviorSubject<number | null>(null);
  employeesChanged$ = this.employeeChangedSource.asObservable();

  private employeeCreationClickedSource = new BehaviorSubject<boolean>(false);
  employeeCreationClicked$ = this.employeeCreationClickedSource.asObservable();

  constructor() {}

  selectEmployee(employee: Employee) {
    this.selectedEmployeeSource.next(employee);
    this.resetEmployeeCreation();
  }

  notifyEmployeeDeletion(employeeId: number) {
    this.employeeChangedSource.next(employeeId);
  }

  notifyEmployeeCreation() {
    this.employeeCreationClickedSource.next(false);
    this.employeeChangedSource.next(1);
  }

  openEmployeeCreation() {
    this.employeeCreationClickedSource.next(true);
    this.resetEmployeeSelection();
  }

  closedEmployeeCreation(){
    this.employeeCreationClickedSource.next(false);
  }

  resetEmployeeSelection() {
    this.selectedEmployeeSource.next(null);
  }

  resetEmployeeCreation() {
    this.employeeCreationClickedSource.next(false);
  }
}
