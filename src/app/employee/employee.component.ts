import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees: any = [];
  successMessage: string = ""
  constructor(private empService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.getEmployees()
  }

  getEmployees() {
    this.empService.getEmployees().subscribe(
      data => {
        console.log(data)
        this.employees = JSON.parse(data)
      },
      error => {
        console.log(error)
      }
    )
  }

  editEmployee(id) {
    console.log(id)
    //this.empService.empIdEmit.next(id)
    this.empService.setEmpId(id)
    this.router.navigateByUrl("employees/updateEmployee")
  }

  deleteEmployee(id) {
    this.empService.deleteEmployee(id).subscribe(
      data => {
        console.log(data)
        this.employees = this.employees.filter(item => item.id !== id);
        this.successMessage = "Employee deleted succeesfully."
        setTimeout(() => {
          this.successMessage = ""
        }, 4000);
      },
      error => {
        console.log(error)
      }
    )
  }


}
