import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Employee} from "../Employee";
import {ExternalEmployeeServiceHandler} from "../services/external-employee-service-handler";
import {EmployeeSharedService} from "../services/EmployeeSharedService";

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule,ExternalEmployeeServiceHandler],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {
  constructor(private handler: ExternalEmployeeServiceHandler, private employeeSharedService: EmployeeSharedService) {
  }

  @Input() employee: Employee | null = null;
  @Output() onDeselect: EventEmitter<void> = new EventEmitter();

  deselectEmployee(): void {
    this.onDeselect.emit();
  }

  editEmployee(employee: Employee) {
    // Placeholder for a different ticket
  }

  deleteEmployee(employee: Employee) {
    this.handler.removeEmployeeById(employee.id).subscribe(() => {
      this.deselectEmployee();
      this.employeeSharedService.notifyEmployeeDeletion(employee.id);
    });
  }
}
