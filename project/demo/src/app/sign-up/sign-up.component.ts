import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isSignUp:boolean = false;
  isLogin:boolean = true;
  loginform: FormGroup= new FormGroup({});
  signupform:FormGroup = new FormGroup({});
  constructor(private auth:AuthService, private fb: FormBuilder ,private cd:FormBuilder) {
    this.signupform = this.fb.group({
      email: ['', Validators.required,Validators.email],
      password:['',Validators.required,Validators.minLength(8)],
      fullName:['',Validators.required],
      mobileNo:['',Validators.required],
      conformpass:['',Validators.required]
      
    });

    this.loginform =this.cd.group({
    email: ['', Validators.required],
    password:['',Validators.required],
    })

  }

 

//   ngOnInit(): void {
// 1  this.loginForm = new FormGroup({
//   'email' : new FormControl(null, [Validators.required, Validators.email]),
//   'password' : new FormControl(null, [Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$')])
//  });    
//   }

ngOnInit(): void {
  
}

signUp(){
  this.auth.btn_signup(this.signupform.value)
  .subscribe(res=>{
    console.log(res);

  })
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