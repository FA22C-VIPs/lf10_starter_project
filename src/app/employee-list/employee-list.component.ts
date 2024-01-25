import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {map, Observable, of} from "rxjs";
import {Employee} from "../Employee";
import {ExternalEmployeeServiceHandler} from "../services/external-employee-service-handler";
import {FormsModule} from "@angular/forms";

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

  constructor(private handler: ExternalEmployeeServiceHandler) {
    this.totalEmployees$ = of([]);
    this.fetchData();
    this.displayedEmployees$ = this.totalEmployees$;
  }

  fetchData() {
    this.totalEmployees$ = this.handler.requestAllEmployees();
  }

  searchForEmployee() {
    this.displayedEmployees$ = this.totalEmployees$.pipe(
      map(employees => employees.filter(employee => {
        let matchesId = this.searchedId$ != null && this.searchedId$ > -1 ? employee.id === this.searchedId$ : true;
        let matchesFirstName = this.searchedFirstname$ !== '' ? employee.firstName?.includes(this.searchedFirstname$) : true;
        let matchesLastName = this.searchedLastname$ !== '' ? employee.lastName?.includes(this.searchedLastname$) : true;

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
}
