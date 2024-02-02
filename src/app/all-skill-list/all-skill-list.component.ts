import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {Observable, of} from "rxjs";
import {Skill} from "../Skill";
import {ExternalSkillServiceHandler} from "../services/external-skill-service-handler";


@Component({
  selector: 'all-skill-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, MatDialogClose, FormsModule, MatInputModule, ExternalSkillServiceHandler],
  templateUrl: './all-skill-list.component.html',
  styleUrl: './all-skill-list.component.css'
})
export class AllSkillListComponent {
  // allSkills$: Observable<Skill[]>;
  newSkillName: string = '';

  // constructor(private handler: ExternalSkillServiceHandler) {
  //   this.allSkills$ = of([]);
  //   this.fetchData();
  // }
  //
  // fetchData() {
  //   this.allSkills$ = this.handler.requestAllSkills();
  // }

  addNewEntry(): void {
    // this.handler.addSkill(this.newSkillName);
    this.newSkillName = '';
    // this.fetchData();
  }
}

