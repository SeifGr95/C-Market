import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OrderService } from "../order.service";
import { UserService } from "../user.service";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  disabled = true;
  orders = [];
  currentEmail = "";
  currentName = "";
  currentPassword = "";
  currentPhone = "";
  currentAdress = "";
  name = "";
  selectedValue = "";
  selectedTitle: any;
  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private userSevice: UserService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        fullname: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        adresse: ["", [Validators.required]],
        phone: ["", [Validators.required, Validators.minLength(8)]],
        password: ["", [Validators.required, Validators.minLength(6)]],
      },
      {}
    );
    this.getOrders();
    this.getUserProfile();
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm);

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log(this.registerForm.controls.email.errors.required);
      return;
    }
  }
  Update(id) {
    if (id == 0) {
      console.log("Hello world");
      this.selectedTitle = "Nom & Prenom";
      this.selectedValue = "fullname";
    } else if (id == 1) {
      this.selectedTitle = "Email";
      this.selectedValue = "email";
    } else if (id == 2) {
      this.selectedTitle = "Adresse";
      this.selectedValue = "address";
    } else if (id == 3) {
      this.selectedTitle = "Téléphone";
      this.selectedValue = "phone";
    } else {
    }
  }
  getOrders() {
    let id = localStorage.getItem("user");
    this.orderService.getClientOrder().subscribe((data) => {
      let result: any = data;
      this.orders = result;
      console.log(result);
    });
  }
  getUserProfile() {
    this.userSevice.getUserDetails().subscribe((data) => {
      let result: any = data;
      this.currentEmail = result.email;
      this.currentName = result.fullname;
      this.currentAdress = result.address;
      this.currentPhone = result.phone;
      this.registerForm.controls["fullname"].setValue(result.fullname);
      this.registerForm.controls["email"].setValue(result.email);
      this.registerForm.controls["adresse"].setValue(result.address);
      this.registerForm.controls["phone"].setValue(result.phoneNumber);
      console.log(result);
    });
  }

  updateUser() {
    if (this.selectedValue == "fullname") {
      this.userSevice
        .updateUser({
          fullname: this.name,
        })
        .subscribe((data) => {
          let result: any = data;
          if (result) {
            this.getUserProfile();
          }
        });
    } else if (this.selectedValue == "email") {
      this.userSevice
        .updateUser({
          email: this.name,
        })
        .subscribe((data) => {
          let result: any = data;
          if (result) {
            this.getUserProfile();
          }
        });
    } else if (this.selectedValue == "address") {
      this.userSevice
        .updateUser({
          address: this.name,
        })
        .subscribe((data) => {
          let result: any = data;
          if (result) {
            this.getUserProfile();
          }
        });
    } else {
      console.log("Helloooooo");
      this.userSevice
        .updateUser({
          phoneNumber: this.name,
        })
        .subscribe((data) => {
          let result: any = data;
          if (result) {
            this.getUserProfile();
          }
        });
    }
    this.clear();
  }
  clear() {
    this.name = "";
  }
}
