import {Component, OnDestroy, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EmployeeDetailsComponent} from "../employee-details/employee-details.component";
import {Employee} from "../Employee";
import {Subscription} from "rxjs";
import {EmployeeSharedService} from "../services/EmployeeSharedService";
import {EmployeeCreationComponent} from "../employee-creation/employee-creation.component";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, EmployeeDetailsComponent, EmployeeCreationComponent],
  templateUrl: './details-wrapper.component.html',
  styleUrl: './details-wrapper.component.css'
})
export class DetailsWrapperComponent implements OnInit, OnDestroy {
  employee: Employee | null = null;
  private subscription: Subscription = new Subscription();
  private employeeCreationClicked: boolean = false;

  constructor(private employeeSharedService: EmployeeSharedService) {}

  ngOnInit() {
    this.subscription.add(
      this.employeeSharedService.selectedEmployee$.subscribe(employee => {
        this.employee = employee;
      })
    );
    this.subscription.add(
      this.employeeSharedService.employeeCreationClicked$.subscribe(employeeCreation => {
        this.employeeCreationClicked = employeeCreation;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isEmployeeSelected(): boolean {
    return this.employee !== null;
  }

  handleDeselection() {
    this.employeeSharedService.resetEmployeeSelection();
  }

  isEmployeeCreationClicked() {
    return this.employeeCreationClicked;
  }
}
