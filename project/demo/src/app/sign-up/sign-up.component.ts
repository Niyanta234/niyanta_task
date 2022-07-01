import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isSignUp:boolean = false;
  isLogin:boolean = true;
 
  loginform!:FormGroup;
  signupform!:FormGroup;
  constructor(private auth:AuthService, private fb: FormBuilder ,private cd:FormBuilder ,private router:Router) {
  
  }
  
ngOnInit(): void {
  
  this.signupform = new FormGroup({
    'email':new FormControl('',[Validators.required,Validators.email]),
    'password':new FormControl('',[Validators.required,Validators.minLength(8)]),
    'fullName':new FormControl('',[Validators.required]),
    'mobileNo':new FormControl('',[Validators.required]),
    'confirmpass':new FormControl('',[Validators.required])
    
})

this.loginform = new FormGroup({
  'email':new FormControl('',[Validators.required, Validators.email]),
  'password':new FormControl('',[Validators.required,Validators.minLength(8)]),
})
}


signUp(){
  this.auth.btn_signup(this.signupform.value)
  .subscribe(res=>{
    console.log(res);
    alert("Registered successfully..!!")

  },(err)=>{
    console.log(err);
    if(err.length!==0){
      alert("something is wrong..!!");
    }
  })
  this.isLogin=true;
  this.isSignUp=false;
}

signIn(){
  this.auth.btn_signin(this.loginform.value)
  .subscribe(res=>{
    console.log(res);
    this.router.navigateByUrl('/setprofile');
  },(err)=>{
    console.log(err);
    if(err.length!==0){
      alert("please check your email id or password or this user is not registered");
    }
  })
  this.isSignUp=true;
  this.isLogin=false;
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