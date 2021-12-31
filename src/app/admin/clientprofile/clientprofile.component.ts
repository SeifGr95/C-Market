import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/user.service";
import { OrderService } from "src/app/order.service";
import { ActivatedRoute } from "@angular/router";
import { ThrowStmt } from "@angular/compiler";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-clientprofile",
  templateUrl: "./clientprofile.component.html",
  styleUrls: ["./clientprofile.component.css"],
})
export class ClientprofileComponent implements OnInit {
  BASE_URL = environment.BASE_URL;
  user: any = {
    fullname: "",
    email: "",
    phone: "",
    address: "",
  };
  SelectedOrder: any;
  displayedOrder: any = {};
  orders = [];
  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((elm) => {
      let id = elm.id;
      this.userService.getUserProfile(id).subscribe((data) => {
        let result: any = data;
        this.user.fullname = result.fullname;
        this.user.email = result.email;
        this.user.phone = result.phone;
        this.user.address = result.address;
        console.log(data);
      });
      this.orderService.getOrdersByClient(id).subscribe((data) => {
        let result: any = data;

        this.orders = result;
      });
    });
  }
  openLg(content, order) {
    this.SelectedOrder = order;
    this.orderService
      .getOrderForFarmerById(this.SelectedOrder._id)
      .subscribe((data) => {
        let result: any = data;
        this.displayedOrder = result;
        console.log(result);
        this.modalService.open(content, { size: "lg" });
      });
  }
}
