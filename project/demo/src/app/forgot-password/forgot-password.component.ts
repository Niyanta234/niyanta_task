import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
 
  // forgotPassword : FormGroup = new FormGroup({ });
  forgotPassword !: FormGroup;

  constructor(private auth:AuthService,private fb:FormBuilder,private router:Router) {
   
   }
   
  ngOnInit(): void {
    // this.forgotPassword = this.fb.group({
    //   email: [' ',Validators.required,Validators.email],
  
    // });
    
    this.forgotPassword = new FormGroup({
      'email' : new FormControl('', [Validators.required, Validators.email]),

    })
    
    
    
    
  }
  forgot(){
    this.auth.forgot_pass(this.forgotPassword.value)
    .subscribe(res=>{
      this.router.navigateByUrl('/setprofile');
      console.log(res);
    },(err)=>{
      console.log(err);
      if(err.length!=0){
        alert("this user is not signup or check your email id")

      }
    })
  }
  
  
}
