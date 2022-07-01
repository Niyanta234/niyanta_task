import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
// data :any;
  constructor(private http :HttpClient) { }
  
  btn_signup(data:any){
  console.log(data);
    return this.http.post<any>('http://localhost:3000/user/signup',data);
    
  }
  
  btn_signin(data:any){
    console.log(data);
    return this.http.post<any>('http://localhost:3000/user/login',data);
  }
  
  forgot_pass(data:any){
    console.log(data);
    return this.http.post<any>('http://localhost:3000/user/password/forgot',data);
  
  }
  
  reset_pass(data:any){
    console.log(data);
    return this.http.put<any>('http://localhost:3000/user/resetpassword/'+data.token,{password:data.password});
  }
  
  add_payment(data:any){
    console.log(data);
    return this.http.post<any>('http://localhost:3000/user/addpayment',data);
  }
  
}
