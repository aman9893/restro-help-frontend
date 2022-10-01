import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private myRoute: Router ) { }
  
  sendToken(token: string) {
    localStorage.setItem("LoggedInUser", token)
  }
  getToken() {
    return localStorage.getItem("LoggedInUser")
  }

  setuserData(userdata: any) {
    localStorage.setItem("UserData", userdata)
  }
  
  getUserId(){
    return localStorage.getItem("UserData")
  }

  setuserInfo(userdata: any) {
    localStorage.setItem("UserInfo", JSON.stringify(userdata))
  }
  
  getUserInfo(){
    return localStorage.getItem("UserInfo")
  }

  isLoggednIn() {
    return this.getToken() !== null;
  }


  logout() {
    localStorage.removeItem("LoggedInUser");
    localStorage.removeItem("UserData");
    localStorage.removeItem("UserInfo")
    this.myRoute.navigate(["login"]);
  }
   
   trialExprie(){
    localStorage.removeItem("LoggedInUser");
    localStorage.removeItem("role");
    this.myRoute.navigate(["pricing"]);
   }

   setRole(role:any){
    localStorage.setItem("role", role)
   }

   getRole(){
    return localStorage.getItem("role")
  }

 
  getUserLogin(){
    return localStorage.getItem("userLogin")
  }

  loggedIn() {
    // const token: string = this.jwtHelper.tokenGetter()
    // if (!token) {
    //   return false
    // }
    // const tokenExpired: boolean = this.jwtHelper.isTokenExpired(token)
    // return !tokenExpired
    // localStorage.removeItem("LoggedInUser");
    // this.myRoute.navigate(["login"]);
  }



  //-------------------------------------- empolyeee login token------------------------------------------------------------





}
