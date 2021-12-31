import { Component, OnInit } from "@angular/core";
import { ManagementService } from "src/app/management.service";
import Swal from "sweetalert2";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-catgeories",
  templateUrl: "./catgeories.component.html",
  styleUrls: ["./catgeories.component.css"],
})
export class CatgeoriesComponent implements OnInit {
  name: string = "";
  categories = [];
  editId = "";
  modal: any;
  selectedCart = "";
  subName: String = "";
  selectedEdit = "";
  SelectedCat = "";
  selectedSubName: any;
  constructor(
    private management: ManagementService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }
  edit(id) {
    this.editId = id;
  }
  addCategorie() {
    this.management.addCategorie(this.name).subscribe((data) => {
      let result = data;
      console.log(result);
      if (result) {
        this.getAllCategories();
        this.name = "";
      }
    });
  }
  clear() {
    this.name = "";
  }

  getAllCategories() {
    this.management.getCategories().subscribe((data) => {
      let result: any = data;
      console.log(result);
      this.categories = result.categories;
    });
  }
  modfier() {
    this.management
      .updateCategorie(this.editId, this.name)
      .subscribe((data) => {
        let result = data;
        console.log(result);
        if (result) {
          this.getAllCategories();
          this.name = "";
        }
      });
  }
  supprimer(id) {
    Swal.fire({
      title: "Etes vous sure ?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        this.management.deleteCategorie(id).subscribe((data) => {
          let result = data;
          console.log(result);
          if (result) {
            this.getAllCategories();
            this.name = "";
          }
        });
      }
    });
  }
  openLg(content, prod) {
    this.selectedCart = prod;
    //this.selectProd(prod);
    this.modal = this.modalService.open(content);
  }
  confirmAddSub() {
    this.management
      .addSubCateg(this.selectedCart, this.subName)
      .subscribe((data) => {
        let result: any = data;
        if (result) {
          this.getAllCategories();
          this.subName = "";
          this.selectedCart = "";
          this.modal.close();
        }
      });
  }
  deleteSubCateg(catId, subId) {
    Swal.fire({
      title: "Etes vous sure ?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        this.management.deleteSubCateg(catId, subId).subscribe((data) => {
          let result = data;
          console.log(result);
          if (result) {
            this.getAllCategories();
            this.name = "";
          }
        });
      }
    });
  }
  updateSubCateg(content, cat, sub) {
    this.selectedEdit = sub._id;
    this.SelectedCat = cat;
    this.selectedSubName = sub.subName;
    this.modal = this.modalService.open(content);
  }
  confirmUpdateSub() {
    this.management
      .updateSubCateg(this.SelectedCat, this.selectedEdit, this.selectedSubName)
      .subscribe((data) => {
        let result: any = data;
        if (result) {
          this.getAllCategories();
          this.selectedSubName = "";
          this.SelectedCat = "";
          this.modal.close();
        }
      });
  }
}
