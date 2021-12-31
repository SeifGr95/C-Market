import { BrowserModule } from "@angular/platform-browser";
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  LOCALE_ID,
  NO_ERRORS_SCHEMA,
} from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { CartComponent } from "./cart/cart.component";
import { AdminComponent } from "./admin/admin.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfileComponent } from "./profile/profile.component";
import { AuthService } from "./auth.service";
import { HttpClientModule } from "@angular/common/http";
import { ManagementService } from "./management.service";
import { ProductsService } from "./products.service";
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";
import { CartService } from "./cart.service";
import { OrderService } from "./order.service";
import { OrderdetailsComponent } from "./orderdetails/orderdetails.component";
import { DatexPipe } from "./datex.pipe";
import { UserService } from "./user.service";
import { AcceuilComponent } from "./acceuil/acceuil.component";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { ContactComponent } from "./contact/contact.component";
import { FindComponent } from "./find/find.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { MessagesService } from "./messages.service";
import { OffreService } from "./offre.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { DeliveryService } from "./delivery.service";
import { ResetpassComponent } from './resetpass/resetpass.component';
registerLocaleData(localeFr);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    ProfileComponent,
    OrderdetailsComponent,
    DatexPipe,
    AcceuilComponent,
    ContactComponent,
    FindComponent,
    ResetpassComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    NgSelectModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("token");
        },
      },
    }),
  ],
  providers: [
    AuthService,
    ManagementService,
    ProductsService,
    CartService,
    OrderService,
    UserService,
    MessagesService,
    OffreService,
    DeliveryService,

    { provide: LOCALE_ID, useValue: "fr-CA" },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
