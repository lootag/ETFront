import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-loginerror',
  templateUrl: './loginerror.component.html',
  styleUrls: ['./loginerror.component.scss']
})
export class LoginErrorComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder ,private ls: LoginService, private router: Router) { }

  ngOnInit(){
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
      response => localStorage.setItem("access_token", response.access_Token),
      error => console.error("There was an error", error)
    );
    if(localStorage.getItem("access_token") != null)
    {
      console.log(localStorage.getItem("access_token"));
      this.router.navigate(["search"]);
    }
    else
    {
      this.router.navigate(["loginerror"]);
    }

  }


}
