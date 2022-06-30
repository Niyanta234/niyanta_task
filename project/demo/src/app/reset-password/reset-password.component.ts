import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  
  resetPassword !: FormGroup;
  
  constructor(private auth:AuthService,private router:Router) { 
   
  }

  ngOnInit(): void {
   
    
    this.resetPassword = new FormGroup({
      'newpass': new FormControl('',[Validators.required]),
      'confirmpass':new FormControl('',[Validators.required]),
    })
  }
  
  reset(){
    
    this.auth.reset_pass(this.resetPassword.value)
    .subscribe(res=>{
      console.log(res);
    },(err)=>{
      console.log(err);

    })
  }

}
