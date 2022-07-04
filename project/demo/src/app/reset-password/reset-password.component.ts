import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  
  resetPassword !: FormGroup;
  
  constructor(private auth:AuthService,private router:Router,private route:ActivatedRoute) { 
   
  }

  ngOnInit(): void {
   
    
    this.resetPassword = new FormGroup({
      'newpass': new FormControl('',[Validators.required,Validators.minLength(8)]),
      'confirmpass':new FormControl('',[Validators.required,Validators.minLength(8)]),
    })
  }
  
  reset(){
    
    this.auth.reset_pass({password:this.resetPassword.value,token:this.route.snapshot.params['token']})
    .subscribe(res=>{
      // console.log(res);
      alert("Password changed successfully..!!");
      this.router.navigateByUrl('/signUp');
    },(err)=>{
      alert("try again..");
      // console.log(err);

    })
  }

}
