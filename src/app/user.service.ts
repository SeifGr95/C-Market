import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class UserService {
  BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient) {}

  getAllUsers() {
    let token = localStorage.getItem("token");
    return this.http.get(this.BASE_URL + "users/clients/test", {
      headers: {
        access_token: token,
      },
    });
  }

  updateUser(updateData) {
    let token = localStorage.getItem("token");
    let id = localStorage.getItem("user");
    return this.http.put(this.BASE_URL + "users/" + id, updateData, {
      headers: {
        access_token: token,
      },
    });
  }
  updateAdmin(updateData, id) {
    let token = localStorage.getItem("token");
    return this.http.put(this.BASE_URL + "users/" + id, updateData, {
      headers: {
        access_token: token,
      },
    });
  }
  deleteUser(id) {
    let token = localStorage.getItem("token");

    return this.http.delete(this.BASE_URL + "users/" + id, {
      headers: {
        access_token: token,
      },
    });
  }
  getUserDetails() {
    let token = localStorage.getItem("token");
    let id = localStorage.getItem("user");
    return this.http.get(this.BASE_URL + "users/" + id, {
      headers: {
        access_token: token,
      },
    });
  }
  getUserProfile(id) {
    let token = localStorage.getItem("token");
    return this.http.get(this.BASE_URL + "users/" + id, {
      headers: {
        access_token: token,
      },
    });
  }

  getAdmins() {
    let token = localStorage.getItem("token");

    return this.http.get(this.BASE_URL + "users/users/admin", {
      headers: {
        access_token: token,
      },
    });
  }
}
