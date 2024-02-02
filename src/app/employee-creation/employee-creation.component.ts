import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeSharedService} from "../services/EmployeeSharedService";

@Component({
  selector: 'app-employee-creation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-creation.component.html',
  styleUrl: './employee-creation.component.css'
})
export class EmployeeCreationComponent {
  constructor(private employeeSharedService: EmployeeSharedService) {
  }
  exitEmployeeCreation() {
    this.employeeSharedService.resetEmployeeCreation();
  }

  addNewEmployee() {
    // Check the deleteEmployee method inside EmployeeDetailsComponent for an example of the needed logic
  }
}
