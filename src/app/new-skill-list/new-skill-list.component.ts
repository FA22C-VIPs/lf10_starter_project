import {Component} from "@angular/core";
import {MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {ExternalSkillServiceHandler} from "../services/external-skill-service-handler";
import {QualificationGetDto} from "../services/dto/qualification-get-dto";

@Component({
  selector: 'new-skill-list',
  standalone: true,
  imports: [
    MatDialogContent,
    FormsModule,
    MatDialogTitle,
    NgForOf
  ],
  templateUrl: './new-skill-list.component.html',
  styleUrl: './new-skill-list.component.css'
})
export class NewSkillListComponent {
  allSkills: QualificationGetDto[] = [];
  newSkill: QualificationGetDto | undefined;
  knownSkills: QualificationGetDto[] = [];

  constructor(private handler: ExternalSkillServiceHandler, private dialogRef: MatDialogRef<NewSkillListComponent>) {
    this.handler.requestAllSkills().subscribe((skills: QualificationGetDto[]) => {
      this.allSkills = skills
    })
  }

  addNewEntry(): void {
    if(this.newSkill != undefined){
      this.knownSkills.push(this.newSkill);
    }
  }

  deleteSkill(id: number) {

  }

  closeDialog(): void {
    this.dialogRef.close(this.knownSkills);
  }
}
