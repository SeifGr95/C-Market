import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class OffreService {
  BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient) {}

  addOffer(forms) {
    let token = localStorage.getItem("token");

    return this.http.post(this.BASE_URL + "promotions/add", forms, {
      headers: {
        access_token: token,
      },
    });
  }

  updateOffer(id, forms) {
    let token = localStorage.getItem("token");

    return this.http.put(this.BASE_URL + "promotions/update/" + id, forms, {
      headers: {
        access_token: token,
      },
    });
  }
  deleteOffer(id) {
    let token = localStorage.getItem("token");

    return this.http.delete(this.BASE_URL + "promotions/" + id, {
      headers: {
        access_token: token,
      },
    });
  }
  getOffers() {
    let token = localStorage.getItem("token");

    return this.http.get(this.BASE_URL + "promotions");
  }
}
