import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/user.service";
import { AuthService } from "src/app/auth.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  users = [];
  fullname = "";
  phoneNumber = "";
  address = "";
  email = "";
  password = "";
  SelectedUser = {
    fullname: "",
    phoneNumber: "",
    address: "",
    email: "",
    userId: "",
  };
  constructor(private userService: UserService, private authServ: AuthService) {
    this.getAllUsers();
  }

  ngOnInit(): void {}

  getAllUsers() {
    this.userService.getAdmins().subscribe((data) => {
      let result: any = data;
      this.users = result;
      console.log(result);
    });
  }
  updateUser(user) {
    this.SelectedUser.fullname = user.fullname;
    this.SelectedUser.email = user.email;
    this.SelectedUser.address = user.address;
    this.SelectedUser.phoneNumber = user.phoneNumber;
    this.SelectedUser.userId = user._id;
  }
  clear() {
    this.SelectedUser.fullname = "";
    this.SelectedUser.email = "";
    this.SelectedUser.address = "";
    this.SelectedUser.email = "";
    this.SelectedUser.userId = "";
    this.fullname = "";
    this.phoneNumber = "";
    this.address = "";
    this.email = "";
    this.password = "";
  }

  confirmUpdate() {
    this.userService
      .updateAdmin(
        {
          fullname: this.SelectedUser.fullname,
          address: this.SelectedUser.address,
          phoneNumber: this.SelectedUser.phoneNumber,
        },
        this.SelectedUser.userId
      )
      .subscribe((data) => {
        let result: any = data;
        if (result) {
          this.getAllUsers();
        }
      });
  }
  deleteUser(id) {
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
        this.userService.deleteUser(id).subscribe((data) => {
          let result: any = data;
          this.getAllUsers();
        });
      }
    });
  }
  confirmAdd() {
    this.authServ
      .signUp({
        email: this.email,
        password: this.password,
        fullname: this.fullname,
        address: this.address,
        phonenumber: this.phoneNumber,
        isAdmin: true,
      })
      .subscribe((data) => {
        let result: any = data;
        if (result) {
          this.getAllUsers();
          this.fullname = "";
          this.phoneNumber = "";
          this.address = "";
          this.email = "";
          this.password = "";
        }
      });
  }
}
