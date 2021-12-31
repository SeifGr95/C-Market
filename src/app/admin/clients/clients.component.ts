import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/order.service";
import { UserService } from "src/app/user.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.css"],
})
export class ClientsComponent implements OnInit {
  constructor(private clientService: UserService) {}
  users = [];
  ngOnInit(): void {
    this.initorders();
  }

  initorders() {
    this.clientService.getAllUsers().subscribe((data) => {
      let result: any = data;
      this.users = result;
      console.log(this.users);
    });
  }
  deleteuser(id) {
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
        this.clientService.deleteUser(id).subscribe((data) => {
          let result: any = data;
          if (result) {
            this.initorders();
          }
        });
      }
    });
  }
}
