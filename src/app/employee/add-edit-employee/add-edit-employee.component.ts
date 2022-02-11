import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.scss']
})
export class AddEditEmployeeComponent implements OnInit {

  empForm: FormGroup;
  empIdSub: Subscription
  empId

  successMessage: string = ""

  constructor(private formBuilder: FormBuilder, private empService: EmployeeService) { }

  ngOnInit() {
    this.empForm = this.formBuilder.group({
      email: [''],
      firstName: [''],
      lastName: ['']
    });
    const empId = this.empService.getEmpId();
    if (empId) {
      this.getEmployeeById(empId)
    }
  }


  get f() { return this.empForm.controls; }

  onSubmit() {
    console.log(this.empForm.value)
    if (this.empId) {
      this.empService.updateEmployee(this.empId, this.empForm.value).subscribe(
        data => {
          console.log(data)
          this.successMessage = "Employee updated succeesfully."
          setTimeout(() => {
            this.successMessage = ""
          }, 4000);
        },
        error => {
          console.log(error)
        }
      )
    } else {
      this.empService.addEmployee(this.empForm.value).subscribe(
        data => {
          console.log(JSON.parse(data))
          this.successMessage = "Employee added succeesfully."
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

  getEmployeeById(id) {
    this.empId = id;
    this.empService.getEmployeeById(id).subscribe(
      data => {
        const res = JSON.parse(data)
        console.log(res)
        this.empForm.patchValue({
          email: res.email,
          firstName: res.firstName,
          lastName: res.lastName
        })
      }
    )
  }


  ngOnDestroy() {
    //this.empIdSub.unsubscribe();
  }


}
