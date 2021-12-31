import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CartService {
  BASE_URL = environment.BASE_URL;
  public NumberOfItems = 0;
  constructor(private http: HttpClient) {}
  removeItemCart(item) {
    const userID = localStorage.getItem("user");
    const cartID = localStorage.getItem("cart");
    const token = localStorage.getItem("token");
    return this.http.put(
      this.BASE_URL + "cart/" + userID + "/" + cartID + "/removeitem",
      {
        item: item,
      },
      {
        headers: {
          access_token: token,
        },
      }
    );
  }
  addToCart(item, price, quantity, comment) {
    const userID = localStorage.getItem("user");
    const cartID = localStorage.getItem("cart");
    const token = localStorage.getItem("token");
    return this.http.put(
      this.BASE_URL + "cart/" + userID + "/" + cartID + "/additem",
      {
        item: item,
        price: price,
        quantity: quantity,
        comment: comment,
      },
      {
        headers: {
          access_token: token,
        },
      }
    );
  }
  getItems() {
    return this.NumberOfItems;
  }
  getCart() {
    const userID = localStorage.getItem("user");
    const cartID = localStorage.getItem("cart");
    const token = localStorage.getItem("token");
    return this.http.get(this.BASE_URL + "cart/" + userID + "/" + cartID, {
      headers: {
        access_token: token,
      },
    });
  }
  editQuantityCart(item, price, quantity, total) {
    const userID = localStorage.getItem("user");
    const cartID = localStorage.getItem("cart");
    const token = localStorage.getItem("token");
    return this.http.put(
      this.BASE_URL + "cart/" + userID + "/" + cartID + "/updatequantity",
      {
        item: item,
        price: price,
        quantity: quantity,
        total: total,
      },
      {
        headers: {
          access_token: token,
        },
      }
    );
  }
  setCartQte(number) {
    this.NumberOfItems = number;
  }
}
