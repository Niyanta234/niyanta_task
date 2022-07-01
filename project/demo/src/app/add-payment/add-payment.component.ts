import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {

  
  addpayment !:FormGroup;
  
  constructor(private auth:AuthService, private router : Router ) { }

  ngOnInit(): void {
    this.addpayment = new FormGroup({
      'fullName': new FormControl('',[Validators.required]),
      'cardNo': new FormControl('',[Validators.required]),
      'expiryDate': new FormControl('',[Validators.required]),
      'cvv': new FormControl('',[Validators.required]),
      'amount':new FormControl('',[Validators.required])
    })
  }
  
  add(){
    
    this.auth.add_payment(this.addpayment.value)
    .subscribe(res=>{
      console.log(res);
      alert("Payment done successfully");
    },(err)=>{
      console.log(err);
      alert("Please try again..!!");
    })
  }

}


