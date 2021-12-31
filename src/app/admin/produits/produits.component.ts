import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProductsService } from "src/app/products.service";
import { ManagementService } from "src/app/management.service";
import { environment } from "../../../environments/environment";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeliveryService } from "src/app/delivery.service";
@Component({
  selector: "app-produits",
  templateUrl: "./produits.component.html",
  styleUrls: ["./produits.component.css"],
})
export class ProduitsComponent implements OnInit {
  productName = "";
  modal: any;
  BASE_URl = environment.BASE_URL;
  price = 0;
  quantity = 0;
  Category = "";
  image: File;
  categories = [];
  products = [];
  selectedProduct = "";
  filterType = "Nom";
  addForm: FormGroup;
  filterName = "";
  selectedCategory = "";
  promotionprice = 0;
  pormotionId = "";
  FraisLivraison = 0;
  IdLivraison = "";
  subCategory = "";
  subCategs = [];
  constructor(
    private produitService: ProductsService,
    private categorieService: ManagementService,
    private modalService: NgbModal,
    private deliveryPrice: DeliveryService
  ) {}

  ngOnInit(): void {
    this.initFunction();
  }
  fileChange(element) {
    this.image = element.target.files[0];
  }
  Change(prod, content) {
    this.selectedProduct = prod._id;
    this.productName = prod.productName;
    this.quantity = prod.quantity;
    this.price = prod.price;
    this.Category = prod.Category._id;
    this.modal = this.modalService.open(content, { size: "lg" });
  }
  open(content) {
    this.modal = this.modalService.open(content, { size: "lg" });
  }
  update(content) {
    this.modal = this.modalService.open(content);
  }
  setPromotion(prod) {
    this.pormotionId = prod._id;
  }
  filter() {
    this.products = [];
    if (this.filterType == "Nom") {
      this.produitService.searchProduct(this.filterName).subscribe((data) => {
        let result: any = data;
        this.products = result;
        console.log(result);
      });
    } else {
      this.produitService
        .getAllProductsByCategory(this.selectedCategory)
        .subscribe((data) => {
          let result: any = data;
          console.log(result);
          this.products = [];
          this.products = result.products;
        });
    }
  }
  addproduct() {
    if (this.productName == "" || this.Category == "") {
      Swal.fire({
        title: "Erreur!",
        text: "Veuillez remplir les champs !",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      let formulalry = new FormData();
      formulalry.append("productName", this.productName);
      formulalry.append("price", this.price.toString());
      formulalry.append("quantity", this.quantity.toString());
      formulalry.append("productImage", this.image);
      formulalry.append("Category", this.Category);
      formulalry.append("subCateg", this.subCategory);
      this.produitService.addproduct(formulalry).subscribe((data) => {
        let result: any = data;
        console.log(result);
        this.getproducts();
        this.Category = "";
        this.productName = "";
        this.price = 0;
        this.quantity = 0;
      });
    }
    this.modal.close();
  }
  updateDelivery() {
    this.deliveryPrice
      .updateDeliverPrice(this.IdLivraison, this.FraisLivraison)
      .subscribe((data) => {
        let result: any = data;
        if (result) {
          this.deliveryPrice.getDeliveryPrice().subscribe((data) => {
            let result: any = data;
            this.FraisLivraison = result.price;
            this.IdLivraison = result._id;
          });
        }
      });
    this.modal.close();
  }
  AddPromotion() {
    this.produitService
      .setPromotion(this.pormotionId, this.promotionprice)
      .subscribe((data) => {
        let result: any = data;
        if (result) {
          this.getproducts();
          this.pormotionId = "";
        }
      });
  }
  CancelPromotion(prod) {
    this.produitService.cancelPromotion(prod._id).subscribe((data) => {
      let result: any = data;
      if (result) {
        this.getproducts();
        this.pormotionId = "";
      }
    });
  }
  Annuler() {
    this.categorieService.getCategories().subscribe((data) => {
      let result: any = data;
      this.categories = result.categories;
      this.Category = this.categories[0];
      this.selectedCategory = this.categories[0]._id;
    });
    this.getproducts();
  }
  clearProm() {
    this.pormotionId = "";
    this.promotionprice = 0;
    this.modal.close();
  }
  updateProduct() {
    if (this.productName == "" || this.Category == "") {
      Swal.fire({
        title: "Erreur!",
        text: "Veuillez remplir les champs !",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      let formulalry = new FormData();
      formulalry.append("productName", this.productName);
      formulalry.append("price", this.price.toString());
      formulalry.append("quantity", this.quantity.toString());
      formulalry.append("productImage", this.image);
      formulalry.append("Category", this.Category);
      this.produitService
        .updateProduct(this.selectedProduct, formulalry)
        .subscribe((data) => {
          let result: any = data;
          console.log(result);
          this.getproducts();
          this.Category = "";
          this.productName = "";
          this.price = 0;
          this.quantity = 0;
        });
    }
    this.modal.close();
  }
  getproducts() {
    this.produitService.getAllProducts().subscribe((data) => {
      let result: any = data;
      this.products = result.products;
      console.log(result);
    });
  }
  changeCateg(event) {
    let selected = this.categories.find((elm) => elm._id == this.Category);
    this.subCategs = selected.subCategories;
    this.subCategory = this.subCategs[0]._id;
    console.log("Selected", selected);
  }
  Delete(id) {
    Swal.fire({
      title: "Etes Vous Sure ?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        this.produitService.deleteProduct(id).subscribe((data) => {
          let result: any = data;
          if (result) {
            this.getproducts();
          }
        });
      }
    });
  }
  initFunction() {
    this.categorieService.getCategories().subscribe((data) => {
      let result: any = data;
      this.categories = result.categories;
      this.Category = this.categories[0];
      this.selectedCategory = this.categories[0]._id;
    });
    this.deliveryPrice.getDeliveryPrice().subscribe((data) => {
      let result: any = data;
      //console.log(result);
      this.FraisLivraison = result.price;
      this.IdLivraison = result._id;
      console.log("Id Livraison", this.IdLivraison);
    });
    this.getproducts();
  }
  clear() {
    this.Category = "";
    this.productName = "";
    this.price = 0;
    this.quantity = 0;
  }
}
