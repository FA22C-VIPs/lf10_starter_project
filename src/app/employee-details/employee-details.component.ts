import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Employee} from "../Employee";
import {ExternalEmployeeServiceHandler} from "../services/external-employee-service-handler";
import {EmployeeSharedService} from "../services/EmployeeSharedService";
import {AllSkillListComponent} from "../all-skill-list/all-skill-list.component";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeSkillList} from "../employee-skill-list/employee-skill-list.component";
import {QualificationGetDto} from "../services/dto/qualification-get-dto";

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, ExternalEmployeeServiceHandler],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {
  constructor(private handler: ExternalEmployeeServiceHandler, private employeeSharedService: EmployeeSharedService, public dialog: MatDialog) {
  }

  @Input() employee: Employee | null = null;
  @Output() onDeselect: EventEmitter<void> = new EventEmitter();

  deselectEmployee(): void {
    this.onDeselect.emit();
  }

  editEmployeeSkills(employee: Employee) {
    this.dialog.open(EmployeeSkillList, {
      height: '400px',
      width: '600px',
      data: {
        data: {employee}
      }
    });
  }

  deleteEmployee(employee: Employee) {
    this.handler.removeEmployeeById(employee.id).subscribe(() => {
      this.deselectEmployee();
      this.employeeSharedService.notifyEmployeeDeletion(employee.id);
    });
  }
}
