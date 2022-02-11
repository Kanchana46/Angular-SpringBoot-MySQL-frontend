import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isSuccess: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [''],
      email: [''],
      password: ['']
    });
    //this.userService.getEmp().subscribe(data => console.log(data))
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    console.log("AAA")
    console.log(this.registerForm.value);
    this.userService.registerUser(this.registerForm.value).subscribe(
      data => {
        console.log(data)
        this.isSuccess = true;

        setTimeout(() => {
          this.isSuccess = false
        }, 4000);

        this.registerForm.reset()
      },
      error => {
        console.log(error)
      }
    )
  }



  ngOnDestroy() {
    this.isSuccess = false
  }



}
