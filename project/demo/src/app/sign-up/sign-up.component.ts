import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isSignUp:boolean = false;
  isLogin:boolean = true;
  loginForm !: FormGroup;
  constructor(private auth:AuthService) { }

//   ngOnInit(): void {
// 1  this.loginForm = new FormGroup({
//   'email' : new FormControl(null, [Validators.required, Validators.email]),
//   'password' : new FormControl(null, [Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$')])
//  });    
//   }

ngOnInit(): void {
    
}


  
  
 signin(){
    this.isLogin=true;
    this.isSignUp=false;
 }
 signup(){
  this.isSignUp=true;
  this.isLogin=false;
    }
  }