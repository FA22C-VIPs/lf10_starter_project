import {Component, OnDestroy, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EmployeeDetailsComponent} from "../employee-details/employee-details.component";
import {Employee} from "../Employee";
import {Subscription} from "rxjs";
import {EmployeeSharedService} from "../services/EmployeeSharedService";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, EmployeeDetailsComponent],
  templateUrl: './details-wrapper.component.html',
  styleUrl: './details-wrapper.component.css'
})
export class DetailsWrapperComponent implements OnInit, OnDestroy {
  employee: Employee | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private employeeSharedService: EmployeeSharedService) {}

  ngOnInit() {
    this.subscription.add(
      this.employeeSharedService.selectedEmployee$.subscribe(employee => {
        this.employee = employee;
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
    this.employee = null;
  }
}
