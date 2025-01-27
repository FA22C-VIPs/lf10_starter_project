import {Injectable, NgModule} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Observable, of, switchMap} from 'rxjs';
import {QualificationGetDto} from "./dto/qualification-get-dto";
import {Skill} from "../Skill";

@Injectable({
  providedIn: 'root'
})
export class ExternalSkillServiceHandler {
  private baseApiUrl = '/backend'; // This is equal to "http://localhost:8089" thanks to the proxy configuration

  constructor(private keycloak: KeycloakService, private http: HttpClient) {
  }

  private getBearerToken(): Observable<Promise<string>> {
    return of(this.keycloak.isLoggedIn()).pipe(switchMap((loggedIn) => {
      if (loggedIn) {
        return of(this.keycloak.getToken());
      } else {
        throw new Error('Not logged in.');
      }
    }));
  }

  public requestAllSkills(): Observable<QualificationGetDto[]> {
    return this.getBearerToken().pipe(
      switchMap((tokenPromise) => tokenPromise),
      switchMap((token) => {
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);
        return this.http.get<QualificationGetDto[]>(this.baseApiUrl + "/qualifications", {headers});
      })
    );
  }

  public addSkill(skill: String): Observable<any> {
    return this.getBearerToken().pipe(
      switchMap((tokenPromise) => tokenPromise),
      switchMap((token) => {
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);
        const postData = { skill: skill };
        return this.http.post<any>(this.baseApiUrl + "/qualifications", postData, { headers });
      })
    );
  }

  deleteSkill(id: number): Observable<any> {
    return this.getBearerToken().pipe(
      switchMap((tokenPromise) => tokenPromise),
      switchMap((token) => {
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);
        return this.http.delete(`${this.baseApiUrl}/qualifications/${id}`, { headers });
      }))
  }
}
