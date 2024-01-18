import { Component } from '@angular/core';
import {EmployeeListComponent} from "../employee-list/employee-list.component";
import {DetailsComponent} from "../details/details.component";
import {LogoutButtonComponent} from "../logout-button/logout-button.component";

@Component({
  selector: 'page-layout',
  standalone: true,
    imports: [
        EmployeeListComponent,
        DetailsComponent,
        LogoutButtonComponent
    ],
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.css']
})
export class PageLayout {
  constructor() {}


  handleLogout() {

  }

  handleNewEmployee() {

  }

  handelSkillList() {

  }
}
