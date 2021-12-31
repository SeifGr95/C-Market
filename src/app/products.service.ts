import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient) {}

  addproduct(forms) {
    let token = localStorage.getItem("token");

    return this.http.post(this.BASE_URL + "product/create", forms, {
      headers: {
        access_token: token,
      },
    });
  }
  updateProduct(id, forms) {
    let token = localStorage.getItem("token");

    return this.http.put(this.BASE_URL + "product/" + id + "/update", forms, {
      headers: {
        access_token: token,
      },
    });
  }
  getAllProducts() {
    let token = localStorage.getItem("token");

    return this.http.get(this.BASE_URL + "product", {
      headers: {
        access_token: token,
      },
    });
  }
  getAllProductsByCategory(id) {
    return this.http.get(this.BASE_URL + "product/" + id);
  }
  getAllProductsBySubs(id) {
    return this.http.get(this.BASE_URL + "product/prods/find/" + id);
  }
  deleteProduct(id) {
    let token = localStorage.getItem("token");

    return this.http.delete(this.BASE_URL + "product/" + id + "/delete", {
      headers: {
        access_token: token,
      },
    });
  }

  searchProduct(name) {
    let token = localStorage.getItem("token");

    return this.http.post(this.BASE_URL + "product/searchproduct", {
      productName: name,
    });
  }

  getPromotions() {
    return this.http.get(this.BASE_URL + "product/promotions/all");
  }
  getNewProducts() {
    return this.http.get(this.BASE_URL + "product/latest/items");
  }
  setPromotion(id, price) {
    return this.http.put(this.BASE_URL + "product/promotion/set/" + id, {
      newPrice: price,
      promotion: true,
    });
  }
  cancelPromotion(id) {
    return this.http.put(this.BASE_URL + "product/promotion/set/" + id, {
      newPrice: 0,
      promotion: false,
    });
  }
}
