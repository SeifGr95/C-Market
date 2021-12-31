import { Component, OnInit } from "@angular/core";
import { ManagementService } from "../management.service";
import { ProductsService } from "../products.service";
import Swal from "sweetalert2";
import { AuthService } from "../auth.service";
import { CartService } from "../cart.service";
import { OffreService } from "../offre.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "../../environments/environment";
@Component({
  selector: "app-acceuil",
  templateUrl: "./acceuil.component.html",
  styleUrls: ["./acceuil.component.css"],
})
export class AcceuilComponent implements OnInit {
  categories = [];
  promotions = [];
  newProducts = [];
  NewOffers = [];

  modal: any;
  firstOffer: any = {
    Description: "Test Description 2",
    PoromotionTitle: "Test2",
    createdAt: "2020-04-15T19:49:20.012Z",
    promotionImage: "uploads/2020-04-15T19-49-19.914Z-2.jpg",
  };
  selectedProd = {
    id: "",
    qty: 0,
    price: 0,
    totalPrice: 0,
    title: "",
    comment: "",
  };
  BASE_URL = environment.BASE_URL;
  constructor(
    private manager: ManagementService,
    private productService: ProductsService,
    public AuthServ: AuthService,
    private Cart: CartService,
    private offerService: OffreService,
    private modalService: NgbModal
  ) {}
  ngOnInit() {
    this.getAllOffers();
    this.getCategories();
    this.getProductsInpromotion();
    this.getNewestProducts();
  }

  getCategories() {
    this.manager.getCategories().subscribe((data) => {
      let result: any = data;
      this.categories = result.categories;
      console.log(result);
    });
  }
  getProductsInpromotion() {
    this.productService.getPromotions().subscribe((data) => {
      let result: any = data;
      this.promotions = result.products;
    });
  }
  getNewestProducts() {
    this.productService.getNewProducts().subscribe((data) => {
      let result: any = data;
      this.newProducts = result.products;
    });
  }
  getAllOffers() {
    this.offerService.getOffers().subscribe((data) => {
      let result: any = data;

      this.firstOffer = result[0];
      this.NewOffers = result.slice(1, result.length);
      console.log(this.NewOffers);
    });
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
  openLg(content, type, prod) {
    if (type == 0) {
      this.selecteProm(prod);
    } else {
      this.selectProd(prod);
    }

    this.modal = this.modalService.open(content, { size: "lg" });
  }
  selecteProm(prod) {
    this.selectedProd.id = prod._id;
    this.selectedProd.qty = 1;
    this.selectedProd.price = prod.Promotionprice;
    this.selectedProd.totalPrice = prod.Promotionprice;
    this.selectedProd.title = prod.productName;
  }
  //Bootstrap Modal Close event

  calculate(event) {
    this.selectedProd.totalPrice =
      this.selectedProd.price * this.selectedProd.qty;
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
        this.modal.close();
        this.Cart.getCart().subscribe((data) => {
          let result: any = data;

          this.Cart.setCartQte(result.cart.items.length);
          Swal.fire("Sweet", "produit Ajouter avec succées", "success");
          this.selectedProd = {
            id: "",
            qty: 0,
            price: 0,
            totalPrice: 0,
            title: "",
            comment: "",
          };
        });
      });
    } else {
      Swal.fire(
        "Erreur",
        "Vous devez etre connecter pour ajouter à votre panier",
        "error"
      );
    }
  }
}
