import { Component, OnInit } from "@angular/core";
import { CartService } from "../cart.service";
import Swal from "sweetalert2";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Route } from "@angular/compiler/src/core";
import { Router } from "@angular/router";
import { OrderService } from "../order.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeliveryService } from "../delivery.service";
import { environment } from "../../environments/environment";
@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  products = [];
  total: number = 0;
  cartData = {
    totalprice: 0,
    delivery: 5,
  };
  BASE_URL = environment.BASE_URL;
  canConfirm: boolean;
  address: string;
  confirmOrdertForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  modal: any;
  constructor(
    private cart: CartService,
    private formBuilder: FormBuilder,
    private router: Router,
    private orderService: OrderService,
    private modalService: NgbModal,
    private deliveryServ: DeliveryService
  ) {}

  ngOnInit(): void {
    this.initCart();

    this.confirmOrdertForm = this.formBuilder.group({
      address: ["", [Validators.required]],
    });
    this.address = localStorage.getItem("address");
  }
  invalidAddress() {
    return (
      this.submitted && this.confirmOrdertForm.controls.address.errors != null
    );
  }

  deleteItem(prod) {
    this.cart.removeItemCart(prod).subscribe((data) => {
      let result = data;
      console.log(result);
      this.initCart();
    });
  }
  OpenContent(content) {
    this.modal = this.modalService.open(content);
  }
  addOrder(items = [], total = 0, address = "") {
    this.loading = true;
    this.modal.close();
    //this.initCart()
    items = this.products;
    total = this.cartData.totalprice;
    address = this.confirmOrdertForm.controls["address"].value;
    if (items != [] && total != 0 && address != "") {
      this.orderService.addOrder(items, total, address).subscribe((data) => {
        const result: any = data;
        console.log(result);
        this.loading = false;
        Swal.fire({
          icon: "success",
          title: "Sweet!",
          text: "Order ajouté avec succés.",
          showConfirmButton: false,
          timer: 2000,
        });
        this.cart.setCartQte(0);
        this.router.navigate(["/"]);
      });
    } else {
      this.loading = false;
    }
  }

  initCart() {
    this.products = [];
    this.cart.getCart().subscribe((data) => {
      let result: any = data;
      this.products = result.cart.items;
      console.log(result);
      this.calculateTotal();
    });
  }
  calculateTotal() {
    this.deliveryServ.getDeliveryPrice().subscribe((data) => {
      let result: any = data;
      this.cartData.totalprice = 0;
      console.log(result);
      this.cartData.delivery = result.price;
      for (let item of this.products) {
        this.cartData.totalprice += item.price * item.quantity;
      }
      console.log(result);
    });

    //this.cartData.totalprice += this.cartData.delivery;
  }
  editQuantityCart(item, price, quantity, totalQuantity) {
    if (quantity > totalQuantity) {
      this.canConfirm = false;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Stock épuisé",
      });
    } else {
      this.canConfirm = true;
      this.calculateTotal();
      const total = this.cartData.totalprice;
      this.cart
        .editQuantityCart(item, price, quantity, total)
        .subscribe((data) => {
          const result: any = data;
          console.log(result);
          this.initCart();
        });
    }
  }
}
