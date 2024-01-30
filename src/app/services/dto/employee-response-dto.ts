import {QualificationGetDto} from "./qualification-get-dto";

export interface EmployeeResponseDto {
  id: number;
  lastName?: string;
  firstName?: string;
  street?: string;
  postcode?: string; // Postcode validation must be handled separately in Angular forms
  city?: string;
  phone?: string;
  skillSet?: QualificationGetDto[];
}
