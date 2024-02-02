import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {map, Observable, of} from "rxjs";
import {Employee} from "../Employee";
import {ExternalEmployeeServiceHandler} from "../services/external-employee-service-handler";
import {FormsModule} from "@angular/forms";
import {EmployeeSharedService} from "../services/EmployeeSharedService";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, ExternalEmployeeServiceHandler, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  totalEmployees$: Observable<Employee[]>;
  displayedEmployees$: Observable<Employee[]>;
  searchedId$: number | undefined;
  searchedFirstname$: string = '';
  searchedLastname$: string = '';

  constructor(private handler: ExternalEmployeeServiceHandler, private employeeSharedService: EmployeeSharedService) {
    this.totalEmployees$ = of([]);
    this.fetchData();
    this.displayedEmployees$ = this.totalEmployees$;
    this.employeeSharedService.employeeDeleted$.subscribe((deletedEmployeeId) => {
      if (deletedEmployeeId !== null) {
        this.fetchData();
        this.resetDisplay();
      }
    });
  }

  fetchData() {
    this.totalEmployees$ = this.handler.requestAllEmployees();
  }

  searchForEmployee() {
    this.displayedEmployees$ = this.totalEmployees$.pipe(
      map(employees => employees.filter(employee => {
        let matchesId = this.searchedId$ != null && this.searchedId$ > -1 ? employee.id === this.searchedId$ : true;
        let matchesFirstName = this.searchedFirstname$ !== ''
          ? employee.firstName?.toLowerCase().includes(this.searchedFirstname$.toLowerCase()) : true;
        let matchesLastName = this.searchedLastname$ !== ''
          ? employee.lastName?.toLowerCase().includes(this.searchedLastname$.toLowerCase()) : true;

        return matchesId && matchesFirstName && matchesLastName;
      }))
    );
  }

  resetDisplay() {
    this.displayedEmployees$ = this.totalEmployees$;
  }

  onInputChange($event: Event) {
    this.searchForEmployee();
  }

  onEmployeeClick(employee: Employee) {
    this.employeeSharedService.selectEmployee(employee);
  }
}
