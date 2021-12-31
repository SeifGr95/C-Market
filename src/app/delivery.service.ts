import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DeliveryService {
  BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient) {}

  getDeliveryPrice() {
    return this.http.get(this.BASE_URL + "livraison");
  }

  updateDeliverPrice(id, price) {
    return this.http.put(this.BASE_URL + "livraison/update/" + id, {
      newPrice: price,
    });
  }
}
