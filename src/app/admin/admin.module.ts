import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";
import { Routes, RouterModule } from "@angular/router";

import { CommandesComponent } from "./commandes/commandes.component";
import { ProduitsComponent } from "./produits/produits.component";
import { ClientsComponent } from "./clients/clients.component";
import { CatgeoriesComponent } from "./catgeories/catgeories.component";
import { FormsModule } from "@angular/forms";
import { UsersComponent } from "./users/users.component";
import { OffreComponent } from "./offre/offre.component";
import { MessageComponent } from "./message/message.component";
import { OffresComponent } from "./offres/offres.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { ClientprofileComponent } from "./clientprofile/clientprofile.component";
import { AdminorderComponent } from "./adminorder/adminorder.component";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "clients",
        component: ClientsComponent,
      },
      {
        path: "messages",
        component: MessageComponent,
      },
      {
        path: "offres",
        component: OffreComponent,
      },
      {
        path: "categorie",
        component: CatgeoriesComponent,
      },
      {
        path: "produits",
        component: ProduitsComponent,
      },
      {
        path: "users",
        component: UsersComponent,
      },
      {
        path: "",
        component: CommandesComponent,
      },
      {
        path: "clientprofile/:id",
        component: ClientprofileComponent,
      },
      {
        path: "admindetails/:id/:number",
        component: AdminorderComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    CommandesComponent,
    ProduitsComponent,
    ClientsComponent,
    CatgeoriesComponent,
    UsersComponent,
    OffreComponent,
    MessageComponent,
    OffresComponent,
    ClientprofileComponent,
    AdminorderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgSelectModule,NgbModule
  ],
})
export class AdminModule {}
