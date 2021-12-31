import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { CartComponent } from "./cart/cart.component";
import { AdminModule } from "./admin/admin.module";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuard } from "./auth.guard";
import { AdminGuard } from "./admin.guard";
import { OrderdetailsComponent } from "./orderdetails/orderdetails.component";
import { RedirectGuard } from "./redirect.guard";
import { AcceuilComponent } from "./acceuil/acceuil.component";
import { ContactComponent } from "./contact/contact.component";
import { FindComponent } from "./find/find.component";
import { ResetpassComponent } from "./resetpass/resetpass.component";

const routes: Routes = [
  {
    path: "prods/:id",
    component: HomeComponent,
  },
  {
    path: "search/:name",
    component: FindComponent,
  },
  {
    path: "",
    component: AcceuilComponent,
    canActivate: [RedirectGuard],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "reset",
    component: ResetpassComponent,
  },
  { path: "contact", component: ContactComponent },

  {
    path: "cart",
    component: CartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin",
    loadChildren: "./admin/admin.module#AdminModule",
    canActivate: [AuthGuard, AdminGuard],
  },

  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "details/:id/:number",
    component: OrderdetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
