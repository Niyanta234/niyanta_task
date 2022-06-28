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
}
