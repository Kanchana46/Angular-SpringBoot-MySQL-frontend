import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = "http://localhost:8080/api/employees";

  empIdEmit = new Subject<any>();

  empId: any

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get(this.baseURL, { responseType: 'text' })
  }

  getEmployeeById(id) {
    return this.http.get(`${this.baseURL}/${id}`, { responseType: 'text' })
  }

  addEmployee(employee) {
    return this.http.post(`${this.baseURL}/addEmployee`, employee, { responseType: 'text' });
  }

  updateEmployee(id, employee) {
    return this.http.put(`${this.baseURL}/${id}`, employee, { responseType: 'text' });
  }

  deleteEmployee(id) {
    return this.http.delete(`${this.baseURL}/${id}`, { responseType: 'text' })
  }

  getEmpId() {
    return this.empId
  }

  setEmpId(id) {
    this.empId = id
  }

}
