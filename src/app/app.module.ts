import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import {APP_BASE_HREF} from '@angular/common';

import { PriceListComponent } from "./price-list.component";
import { CreateListComponent } from "../components/create-list/create-list.component";
import { EnterListComponent } from "../components/enter-list/enter-list.component";
import { AddProductComponent } from "../components/add-product/add-product.component";
import { ProductComponent } from "../components/product/product.component";
import { ListComponent } from "../components/list/list.component";
import { RoutingModule } from "./routing/routing.module";
import { HomeComponent } from "../components/home/home.component";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { ListGuard } from "./routing/list.guard";
import { SafeurlPipe } from "src/pipes/safeUrl";

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
    SafeurlPipe
  ],
  providers: [ListGuard, {provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [PriceListComponent]
})
export class AppModule {}
