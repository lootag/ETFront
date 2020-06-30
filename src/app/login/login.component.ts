import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder ,private ls: LoginService, private router: Router) { }

  ngOnInit(){
    localStorage.removeItem("loginAttempted");
    this.loginForm = this.fb.group({
      Email: ['', [
        Validators.required
      ]],
      Password: ['',[
        Validators.required
      ]]
    })
  }

  get Email(){
    return this.loginForm.get('Email');
  }

  get Password(){
    return this.loginForm.get('Password');
  }

  onSubmit(){

    this.ls.request(this.loginForm.value).subscribe(
      response =>
      {
        localStorage.setItem("access_token", response.access_Token);
        this.router.navigate(["search"]);
      },
      error =>
      {
        this.router.navigate(["search"]);
      }

    );
    localStorage.setItem("loginAttempted", "");
    this.router.navigate(["loader"]);


  }

}
