import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {Employee} from "../Employee";
import {ExternalEmployeeServiceHandler} from "../services/external-employee-service-handler";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, ExternalEmployeeServiceHandler],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees$: Observable<Employee[]>;

  constructor(private handler: ExternalEmployeeServiceHandler) {
    this.employees$ = of([]);
    this.fetchData();
  }

  fetchData() {
    this.employees$ = this.handler.requestAllEmployees();
  }
}
