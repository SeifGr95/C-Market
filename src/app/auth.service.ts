import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  isAuth: false;
  BASE_URL = environment.BASE_URL + "auth/";
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}
  signIn(userData) {
    return this.http.post(this.BASE_URL + "login", userData);
  }
  signUp(userData) {
    return this.http.post(this.BASE_URL + "register", userData);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
  isAdmin() {
    let admin = localStorage.getItem("admin");
    if (admin == "yes") {
      return true;
    } else {
      return false;
    }
  }
  setAuth(value) {
    this.isAuth = value;
  }
  requestReset(body) {
    return this.http.post(`${this.BASE_URL}resetpassword`, body);
  }

  newPassword(body) {
    return this.http.post(`${this.BASE_URL}newpass`, body);
  }

  ValidPasswordToken(body) {
    return this.http.post(`${this.BASE_URL}validatepassword`, body);
  }
}
