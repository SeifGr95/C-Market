import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class ManagementService {
  BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient) {}

  addCategorie(name) {
    let token = localStorage.getItem("token");
    return this.http.post(
      this.BASE_URL + "categorie/add",
      {
        name: name,
      },
      {
        headers: {
          access_token: token,
        },
      }
    );
  }
  updateCategorie(id, name) {
    let token = localStorage.getItem("token");
    return this.http.put(
      this.BASE_URL + "categorie/update/" + id,
      {
        name: name,
      },
      {
        headers: {
          access_token: token,
        },
      }
    );
  }
  deleteCategorie(id) {
    let token = localStorage.getItem("token");
    return this.http.delete(
      this.BASE_URL + "categorie/" + id,

      {
        headers: {
          access_token: token,
        },
      }
    );
  }

  getCategories() {
    return this.http.get(this.BASE_URL + "categorie/");
  }
  addSubCateg(id, name) {
    let token = localStorage.getItem("token");
    return this.http.put(
      this.BASE_URL + "categorie/" + id + "/sub/add",
      {
        name: name,
      },
      {
        headers: {
          access_token: token,
        },
      }
    );
  }
  updateSubCateg(id, subid, name) {
    let token = localStorage.getItem("token");
    return this.http.put(
      this.BASE_URL + "categorie/" + id + "/sub/update/" + subid,
      {
        name: name,
      },
      {
        headers: {
          access_token: token,
        },
      }
    );
  }
  deleteSubCateg(id, subid) {
    let token = localStorage.getItem("token");
    return this.http.put(
      this.BASE_URL + "categorie/" + id + "/sub/update/" + subid,
      {
        //name: name,
      },
      {
        headers: {
          access_token: token,
        },
      }
    );
  }
}
