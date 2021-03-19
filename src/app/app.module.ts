import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
// Components
import { PriceListComponent } from "./price-list.component";
import { CreateListComponent } from "../components/create-list/create-list.component";
import { EnterListComponent } from "../components/enter-list/enter-list.component";
import { AddProductComponent } from "../components/add-product/add-product.component";
import { ProductComponent } from "../components/product/product.component";
import { ListComponent } from "../components/list/list.component";
import { RoutingModule } from "../routing/routing.module";
import { HomeComponent } from "../components/home/home.component";
import { NotFoundComponent } from "../components/not-found/not-found.component";

import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AngularFirestoreModule } from "@angular/fire/firestore";
// Guards
import { ListGuard } from "../routing/guards/list.guard";
import { HomeGuard } from "../routing/guards/home.guard";
// Pipes
import { SafeurlPipe } from "../pipes/safeUrl";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  declarations: [
    PriceListComponent,
    CreateListComponent,
    EnterListComponent,
    AddProductComponent,
    ProductComponent,
    ListComponent,
    HomeComponent,
    NotFoundComponent,

    SafeurlPipe
  ],
  providers: [ListGuard, HomeGuard],
  bootstrap: [PriceListComponent]
})
export class AppModule {}
