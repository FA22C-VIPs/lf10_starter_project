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
  TotalEmployees$: Observable<Employee[]>;
  displayedEmployees$: Observable<Employee[]>;
  // @ts-ignore
  searchedId: number;
  searchedFirstname: string = '';
  searchedLastname: string = '';

  constructor(private handler: ExternalEmployeeServiceHandler) {
    this.TotalEmployees$ = of([]);
    this.fetchData();
    this.displayedEmployees$ = this.TotalEmployees$;
  }

  fetchData() {
    this.TotalEmployees$ = this.handler.requestAllEmployees();
  }

  searchForEmployee() {
    this.displayedEmployees$ = this.TotalEmployees$.pipe(
      map(employees => employees.filter(employee => {
        let matchesId = this.searchedId > -1 ? employee.id === this.searchedId : true;
        let matchesFirstName = this.searchedFirstname !== '' ? employee.firstName?.includes(this.searchedFirstname) : true;
        let matchesLastName = this.searchedLastname !== '' ? employee.lastName?.includes(this.searchedLastname) : true;

        return matchesId && matchesFirstName && matchesLastName;
      }))
    );
  }

  ResetDisplay() {
    this.displayedEmployees$ = this.TotalEmployees$;
  }
}
