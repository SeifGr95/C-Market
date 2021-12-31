import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MustMatch } from "./mustmatch.validator";
import { AuthService } from "../auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private SpinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        fullname: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        adresse: ["", [Validators.required]],
        phone: ["", [Validators.required, Validators.minLength(8)]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
      },
      {
        validator: MustMatch("password", "confirmPassword"),
      }
    );
  }
  onSubmit() {
    this.submitted = true;
    this.SpinnerService.show();
    console.log(this.registerForm);

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log(this.registerForm.controls.email.errors.required);
      return;
    }
    this.authService
      .signUp({
        email: this.registerForm.controls.email.value,
        password: this.registerForm.controls.password.value,
        fullname: this.registerForm.controls.fullname.value,
        address: this.registerForm.controls.adresse.value,
        phonenumber: this.registerForm.controls.phone.value,
      })
      .subscribe(
        (data) => {
          let result: any = data;
          if (result.user) {
            Swal.fire({
              title: "Success!",
              text: "Inscription Reussite veuillez vous connectez",
              icon: "success",
              confirmButtonText: "OK",
            });
            this.router.navigate(["/login"]);
          } else {
            Swal.fire({
              title: "Erreur!",
              text: "Adresse ou mot de passe incorrecte",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
          this.SpinnerService.hide();
          console.log(result);
        },
        (err) => {
          if (err) {
            console.log(err);
            this.SpinnerService.hide();
            Swal.fire({
              title: "Erreur!",
              text: "Le nom saisie est déja affecté ",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        }
      );
  }
}
