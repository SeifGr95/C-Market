import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { OffreService } from "src/app/offre.service";
import { environment } from "../../../environments/environment";
@Component({
  selector: "app-offre",
  templateUrl: "./offre.component.html",
  styleUrls: ["./offre.component.css"],
})
export class OffreComponent implements OnInit {
  offres: [];
  title: string = "";
  desc: string = "";
  image: File;
  selectedId = "";
  BASE_URL = environment.BASE_URL;
  constructor(private offreServ: OffreService) {}

  ngOnInit(): void {
    this.getAllOffers();
  }
  fileChange(element) {
    this.image = element.target.files[0];
  }
  modifier(offer) {
    this.title = offer.PoromotionTitle;
    this.desc = offer.Description;
    this.selectedId = "";
  }
  addOffer() {
    if (this.title == "" || this.desc == "") {
      Swal.fire({
        title: "Erreur!",
        text: "Veuillez remplir les champs !",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      let formulalry = new FormData();
      formulalry.append("PoromotionTitle", this.title);
      formulalry.append("Description", this.desc);
      formulalry.append("promotionImage", this.image);
      this.offreServ.addOffer(formulalry).subscribe((data) => {
        let result: any = data;
        if (result) {
          this.title = "";
          this.desc = "";
          this.selectedId = "";
          this.getAllOffers();
        }
      });
    }
  }
  getAllOffers() {
    this.offreServ.getOffers().subscribe((data) => {
      let result: any = data;
      this.offres = result;
    });
  }
  deleteOffer(id) {
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
        this.offreServ.deleteOffer(id).subscribe((data) => {
          let result: any = data;
          if (result) {
            this.getAllOffers();
          }
        });
      }
    });
  }
  updateOffer() {
    if (this.title == "" || this.desc == "") {
      Swal.fire({
        title: "Erreur!",
        text: "Veuillez remplir les champs !",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      let formulalry = new FormData();
      formulalry.append("PoromotionTitle", this.title);
      formulalry.append("Description", this.desc);
      formulalry.append("promotionImage", this.image);
      this.offreServ
        .updateOffer(this.selectedId, formulalry)
        .subscribe((data) => {
          let result: any = data;
          if (result) {
            this.getAllOffers();
            this.title = "";
            this.desc = "";
            this.selectedId = "";
          }
        });
    }
  }
  clear() {
    this.title = "";
    this.desc = "";
    this.selectedId = "";
  }
}
