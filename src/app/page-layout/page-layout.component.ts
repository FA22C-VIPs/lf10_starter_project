import {Component, Inject} from '@angular/core';
import {EmployeeListComponent} from "../employee-list/employee-list.component";
import {DetailsComponent} from "../details/details.component";
import {LogoutButtonComponent} from "../logout-button/logout-button.component";
import {AllSkillListComponent} from "../all-skill-list/all-skill-list.component";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'page-layout',
  standalone: true,
  imports: [
    EmployeeListComponent,
    DetailsComponent,
    LogoutButtonComponent,
    AllSkillListComponent,
  ],
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.css']
})
export class PageLayout {

  constructor(public dialog: MatDialog) {}

  handleNewEmployee() {

  }

  openSkillliste() {
    this.dialog.open(AllSkillListComponent, {
      position: {
        top: '10px',
        right: '10px'
      },
      height: '98%',
      width: '100vw',
      panelClass: 'full-screen-modal',
      data: {
        animal: 'panda',
      },
    });
  }
}


