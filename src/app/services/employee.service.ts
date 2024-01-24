import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../Employee";
import {Observable} from "rxjs";
import {AuthGuard} from "./auth.guard";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient, private authGuard: AuthGuard)
  {
  }

  public Fetch() : Observable<Employee[]> {
    return this.http.get<Employee[]>('/backend', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.authGuard.GetToken()}`)
    });
  }
}
