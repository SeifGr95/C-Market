import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/order.service";
import { Router } from "@angular/router";
import { UserService } from "src/app/user.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeliveryService } from "src/app/delivery.service";

@Component({
  selector: "app-commandes",
  templateUrl: "./commandes.component.html",
  styleUrls: ["./commandes.component.css"],
})
export class CommandesComponent implements OnInit {
  modal: any;
  deliverPrice: any;
  constructor(
    private orderService: OrderService,
    private router: Router,
    private USerService: UserService,
    private modalService: NgbModal,
    private deliver: DeliveryService
  ) {}
  orders = [];
  users = [];
  //filterName = [];
  filterType = "Client";
  filterName = "";
  selectedClient: any;

  ngOnInit(): void {
    this.getAllorders();
    this.getAllClients();
    this.deliver.getDeliveryPrice().subscribe((data) => {
      let result: any = data;
      this.deliverPrice = result.price;
    });
  }
  getAllorders() {
    this.orderService.getAllOrders().subscribe((data) => {
      let result: any = data;
      this.orders = result;
      console.log(result);
    });
  }
  getOrdersByClient() {
    console.log("SelectedUser", this.selectedClient.user._id);
    this.orderService
      .getOrdersByClient(this.selectedClient.user._id)
      .subscribe((data) => {
        let result: any = data;
        this.orders = result;
        console.log(result);
      });
  }
  getAllClients() {
    this.USerService.getAllUsers().subscribe((data) => {
      let result: any = data;
      this.users = result.filter((elm) => elm.user.isAdmin == false);
      this.selectedClient = this.users[0].user;
      console.log(result);
    });
  }

  Navigate(order) {
    this.router.navigate(["/details/" + order._id]);
  }
  acceptOrder(id) {
    this.orderService.confirmOrder(id).subscribe((data) => {
      let result: any = data;
      console.log(result);
      if (result) {
        this.getAllorders();
      }
    });
  }
  refuseOrder(id) {
    this.orderService.cancelOrder(id).subscribe((data) => {
      let result: any = data;
      console.log(result);
      if (result) {
        this.getAllorders();
      }
    });
  }
  filter() {
    this.orders.filter((elm) => elm.owner.fullname == this.filterName);
  }
}
