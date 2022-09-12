import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private http: HttpClient) {}
  signUpApi(user: any): Observable<any> {
    return this.http.post(environment.url + 'session/SignUp', user);
  }
  loginApi(user: any): Observable<any> {
    return this.http.post(environment.url + 'session/login', user);
  }
}
