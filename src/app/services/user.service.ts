import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = "http://localhost:8080/api/auth";

  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post(`${this.baseURL}/signup`, user, { responseType: 'text' });
  }

  login(user) {
    return this.http.post(`${this.baseURL}/login`, user, { responseType: 'text' });
  }




}
