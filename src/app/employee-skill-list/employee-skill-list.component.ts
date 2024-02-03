import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {Employee} from "../Employee";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Skill} from "../Skill";
import {QualificationGetDto} from "../services/dto/qualification-get-dto";
import {MatTableModule} from "@angular/material/table";


@Component({
  selector: 'employee-skill-list',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    MatDialogContent,
    MatDialogTitle,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    MatTableModule
  ],
  templateUrl: './employee-skill-list.component.html',
  styleUrls: ['./employee-skill-list.component.css']
})
export class EmployeeSkillList{
  constructor(@Inject(MAT_DIALOG_DATA) public data: {employee: Employee}) {}
}
