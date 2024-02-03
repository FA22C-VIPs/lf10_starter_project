import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {EmployeeResponseDto} from "../services/dto/employee-response-dto";
import {ExternalEmployeeServiceHandler} from "../services/external-employee-service-handler";
import {EmployeeRequestDto} from "../services/dto/employee-request-dto";
import {EmployeeSharedService} from "../services/EmployeeSharedService";

@Component({
  selector: 'app-employee-creation',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './employee-creation.component.html',
  styleUrl: './employee-creation.component.css'
})
export class EmployeeCreationComponent implements OnInit {
  objectForm: FormGroup= new FormGroup({});
  newSkillSet: number[] =[17];

  constructor(private formBuilder: FormBuilder, private handler: ExternalEmployeeServiceHandler, private employeeSharedService: EmployeeSharedService) {}
  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.objectForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      street: ['', Validators.required],
      postcode: ['',postcodeLengthValidator()],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      skillSet: [this.newSkillSet]
    });
  }

  onSubmit(): void {
    console.log("hey")
      console.log("hey")
      const formData: EmployeeRequestDto = this.objectForm.value as EmployeeRequestDto;
      console.log(formData)
        this.handler.addEmployee(formData).subscribe(()=>{this.employeeSharedService.notifyEmployeeCreation()})
  }

  setSkillset() {

  }

  stopEmployeeCreation() {
    this.employeeSharedService.closedEmployeeCreation()
  }
}

export function postcodeLengthValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value as string;
    if (value && value.length !== 5) {
      return { 'Postcode Length Invalid': true };
    }
    return null;
  };
}