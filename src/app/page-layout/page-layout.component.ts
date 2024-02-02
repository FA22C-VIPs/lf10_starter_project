import { Component } from '@angular/core';
import {EmployeeListComponent} from "../employee-list/employee-list.component";
import {DetailsWrapperComponent} from "../details/details-wrapper.component";
import {LogoutButtonComponent} from "../logout-button/logout-button.component";
import {EmployeeSharedService} from "../services/EmployeeSharedService";

@Component({
  selector: 'page-layout',
  standalone: true,
    imports: [
        EmployeeListComponent,
        DetailsWrapperComponent,
        LogoutButtonComponent
    ],
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.css']
})
export class PageLayout {
  constructor(private employeeSharedService: EmployeeSharedService) {}

  handleNewEmployee() {
    this.employeeSharedService.openEmployeeCreation();
  }

  handelSkillList() {

  }
}
