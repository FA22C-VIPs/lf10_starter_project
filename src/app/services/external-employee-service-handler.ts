import {Injectable, NgModule} from '@angular/core';
import { KeycloakService } from "keycloak-angular";
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Observable, of, switchMap} from 'rxjs';
import {EmployeeResponseDto} from "./dto/employee-response-dto";

@Injectable({
  providedIn: 'root'
})
@NgModule({
  imports: [ HttpClientModule ]
})
export class ExternalEmployeeServiceHandler {
  private baseApiUrl = '/backend'; // This is equal to "http://localhost:8089" thanks to the proxy configuration

  constructor(private keycloak: KeycloakService, private http: HttpClient) {}

  private getBearerToken(): Observable<Promise<string>> {
    return of(this.keycloak.isLoggedIn()).pipe(switchMap((loggedIn) => {
      if (loggedIn) {
        return of(this.keycloak.getToken());
      } else {
        throw new Error('Not logged in.');
      }
    }));
  }

  public requestAllEmployees(): Observable<EmployeeResponseDto[]> {
    return this.getBearerToken().pipe(
      switchMap((tokenPromise) => tokenPromise),
      switchMap((token) => {
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);
        return this.http.get<EmployeeResponseDto[]>(this.baseApiUrl +"/employees", { headers });
      })
    );
  }
}
