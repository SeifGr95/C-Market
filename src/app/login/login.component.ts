import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.loginForm);
    this.spinner.show();
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log(this.loginForm.controls.email.errors.required);
      return;
    }
    this.authService
      .signIn({
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value,
      })
      .subscribe((data) => {
        let result: any = data;
        if (result.token) {
          this.authService.setAuth(true);
          localStorage.setItem("token", result.token);
          localStorage.setItem("fullname", result.user.fullname);
          localStorage.setItem("user", result.user._id);
          if (result.user.isAdmin) {
            localStorage.setItem("admin", "yes");
            this.router.navigate(["/admin"]);
          } else {
            this.router.navigate(["/"]);
            localStorage.setItem("cart", result.user.cart);
          }
          this.spinner.hide();
        } else {
          this.spinner.hide();
          Swal.fire({
            title: "Erreur!",
            text: "Adresse ou mot de passe incorrecte",
            icon: "error",
            confirmButtonText: "OK",
          });
        }

        console.log(result);
      });

    // display form values on success
  }
}
