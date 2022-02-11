import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usernameOrEmail: [''],
      password: ['']
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    console.log("AAA")
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe(
      data => {
        console.log(data)
        this.loginForm.reset()
        this.router.navigateByUrl('/employees')
      },
      error => {
        console.log(error)
      }
    )
  }

}
