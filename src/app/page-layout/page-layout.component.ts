import {Component} from '@angular/core';
import {EmployeeListComponent} from "../employee-list/employee-list.component";
import {DetailsWrapperComponent} from "../details/details-wrapper.component";
import {LogoutButtonComponent} from "../logout-button/logout-button.component";
import {EmployeeSharedService} from "../services/EmployeeSharedService";
import {AllSkillListComponent} from "../all-skill-list/all-skill-list.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'page-layout',
  standalone: true,
  imports: [
    EmployeeListComponent,
    DetailsWrapperComponent,
    LogoutButtonComponent,
    AllSkillListComponent,
  ],
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.css']
})
export class PageLayout {

  constructor(public dialog: MatDialog, private employeeSharedService: EmployeeSharedService,) {}

  handleNewEmployee() {
    this.employeeSharedService.openEmployeeCreation();
  }

  openSkillliste() {
    this.dialog.open(AllSkillListComponent, {
      height: '400px',
      width: '600px',
    });
  }
}
