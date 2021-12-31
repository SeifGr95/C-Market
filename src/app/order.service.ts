import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient) {}
  getAllOrders() {
    let token = localStorage.getItem("token");
    return this.http.get(this.BASE_URL + "orders", {
      headers: {
        access_token: token,
      },
    });
  }
  getOrderForClientById(id) {
    const token = localStorage.getItem("token");
    let userID = localStorage.getItem("user");
    return this.http.get(this.BASE_URL + "orders/" + id, {
      headers: {
        access_token: token,
      },
    });
  }

  public getOrderForFarmerById(id) {
    const token = localStorage.getItem("token");
    return this.http.get(this.BASE_URL + "orders/" + id, {
      headers: {
        access_token: token,
      },
    });
  }
  getClientOrder() {
    let userID = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    return this.http.get(this.BASE_URL + "orders/" + userID + "/orders", {
      headers: {
        access_token: token,
      },
    });
  }
  getOrdersByClient(userID) {
    let token = localStorage.getItem("token");
    return this.http.get(this.BASE_URL + "orders/" + userID + "/orders", {
      headers: {
        access_token: token,
      },
    });
  }

  filterOrderByType(userID) {
    let token = localStorage.getItem("token");
    return this.http.get(this.BASE_URL + "orders/types/" + userID, {
      headers: {
        access_token: token,
      },
    });
  }

  cancelOrder(id) {
    let token = localStorage.getItem("token");
    return this.http.put(
      this.BASE_URL + "orders/" + id + "/cancel",
      {
        isOrderCompleted: 0,
      },
      {
        headers: {
          access_token: token,
        },
      }
    );
  }
  confirmOrder(id) {
    let token = localStorage.getItem("token");
    return this.http.put(
      this.BASE_URL + "orders/" + id + "/confirm",
      {
        isOrderCompleted: 1,
      },
      {
        headers: {
          access_token: token,
        },
      }
    );
  }

  public addOrder(items, total, address) {
    const userID = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    return this.http.post(
      this.BASE_URL + "orders/" + userID + "/create",
      {
        owner: userID,
        address: address,
        total: total,
        items: items,
      },
      {
        headers: {
          access_token: token,
        },
      }
    );
  }
}
