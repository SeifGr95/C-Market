import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../products.service";
import { ManagementService } from "../management.service";
import { CartService } from "../cart.service";
import { AuthService } from "../auth.service";
import { ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-find",
  templateUrl: "./find.component.html",
  styleUrls: ["./find.component.css"],
})
export class FindComponent implements OnInit {
  products = [];
  BASE_URL = environment.BASE_URL;
  defaultImage = "../../assets/images/items/10.jpg";
  categories = [];
  searchName = "";
  selectedProd = {
    id: "",
    qty: 0,
    price: 0,
    totalPrice: 0,
    title: "",
    comment: "",
  };
  totalPrice: number;
  qte: number;
  modal: any;
  constructor(
    private productService: ProductsService,
    private managerService: ManagementService,
    private Cart: CartService,
    public AuthServ: AuthService,
    private ActiveRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  setImage(index) {
    this.defaultImage = index;
  }
  ngOnInit(): void {
    this.ActiveRoute.params.subscribe((items) => {
      let name = items.name;

      this.productService.searchProduct(name).subscribe(
        (data) => {
          let result: any = data;
          console.log(result);
          this.products = result;
        },
        (err) => {
          //console.log(err);
        }
      );
    });
  }
  showModal: boolean;
  show() {
    this.showModal = true; // Show-Hide Modal Check
  }
  search(event) {
    console.log(event.target.value);

    this.productService.searchProduct(event.target.value).subscribe(
      (data) => {
        let result: any = data;
        console.log(result);
        this.products = result;
      },
      (err) => {
        //console.log(err);
      }
    );
  }
  selectProd(prod) {
    if (prod.InPromotion == true) {
      this.selectedProd.id = prod._id;
      this.selectedProd.qty = 1;
      this.selectedProd.price = prod.Promotionprice;
      this.selectedProd.totalPrice = prod.Promotionprice;
      this.selectedProd.title = prod.productName;
    } else {
      this.selectedProd.id = prod._id;
      this.selectedProd.qty = 1;
      this.selectedProd.price = prod.price;
      this.selectedProd.totalPrice = prod.price;
      this.selectedProd.title = prod.productName;
    }
  }
  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }
  calculate(event) {
    this.selectedProd.totalPrice =
      this.selectedProd.price * this.selectedProd.qty;
  }

  getCategories() {
    this.managerService.getCategories().subscribe((data) => {
      let result: any = data;
      this.categories = result.categories;
    });
  }

  initPorducts() {
    this.ActiveRoute.params.subscribe((params) => {
      if (params.id != null && params.id != undefined) {
        this.getProducts(params.id);
      } else {
        console.log(params.name);
        this.searchProducts(params.name);
      }
    });
  }
  getProducts(id) {
    this.productService.getAllProductsByCategory(id).subscribe((data) => {
      let result: any = data;
      this.products = result.products;
    });
  }

  searchProducts(name) {
    this.productService.searchProduct(name).subscribe((data) => {
      let result: any = data;
      this.products = result.products;
    });
  }
  openLg(content, prod) {
    this.selectProd(prod);

    this.modal = this.modalService.open(content, { size: "lg" });
  }
  selecteProm(prod) {
    this.selectedProd.id = prod._id;
    this.selectedProd.qty = 1;
    this.selectedProd.price = prod.Promotionprice;
    this.selectedProd.totalPrice = prod.Promotionprice;
    this.selectedProd.title = prod.productName;
  }
  Confirmer() {
    if (this.AuthServ.isAuthenticated()) {
      this.Cart.addToCart(
        this.selectedProd.id,
        this.selectedProd.price,
        this.selectedProd.qty,
        this.selectedProd.comment
      ).subscribe((data) => {
        let result: any = data;

        this.Cart.getCart().subscribe((data) => {
          let result: any = data;

          this.Cart.setCartQte(result.cart.items.length);
          Swal.fire("Sweet", "produit Ajouter avec succées", "success");
        });
      });
    } else {
      Swal.fire(
        "Erreur",
        "Vous devez etre connecter pour ajouter à votre panier",
        "error"
      );
    }
    this.modal.Close();
  }
}
