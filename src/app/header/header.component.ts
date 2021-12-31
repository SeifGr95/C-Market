import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { from } from "rxjs";
import { CartService } from "../cart.service";
import { Router } from "@angular/router";
import { ManagementService } from "../management.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  categories = [];
  searchparams = "";
  constructor(
    public authService: AuthService,
    public cartServ: CartService,
    private router: Router,
    private categorieService: ManagementService
  ) {}

  ngOnInit(): void {
    this.categorieService.getCategories().subscribe((data) => {
      let result: any = data;
      this.categories = result.categories;
      console.log(result);
    });
    let admin = localStorage.getItem("admin");
    console.log(this.authService.isAdmin());
    if (!admin) {
      this.cartServ.getCart().subscribe((data) => {
        let result: any = data;
        console.log(result);
        this.cartServ.setCartQte(result.cart.items.length);
        this.router.navigate(["/"]);

        //console.log( this.cartServ.NumberOfItems);
      });
    }
  }
  search() {
    console.log(this.searchparams);
    this.router.navigate(["/search/" + this.searchparams]);
  }
  getProducts(id) {
    this.router.navigate(["/prods/" + id + "/" + ""]);
    // this.productService.getAllProductsByCategory(id).subscribe((data) => {
    //   let result: any = data;
    //   this.products = result.products;
    // });
  }
  Logout() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }
}
