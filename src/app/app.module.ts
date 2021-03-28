// Modules
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { environment } from "src/environments/environment";

// Components
import { PriceListComponent } from "./price-list.component";
import { CreateListComponent } from "src/components/list/create-list/create-list.component";
import { EnterListComponent } from "src/components/list/enter-list/enter-list.component";
import { AddProductComponent } from "src/components/product/add-product/add-product.component";
import { ProductComponent } from "src/components/product/product.component";
import { ListComponent } from "src/components/list/list.component";
import { RoutingModule } from "src/routing/routing.module";
import { HomeComponent } from "src/components/home/home.component";
import { NotFoundComponent } from "src/components/not-found/not-found.component";
import { GoogleLoginComponent } from "src/components/authentication/login/google-login/google-login.component";
import { LoginComponent } from "src/components/authentication/login/login.component";
import { LogoutComponent } from "src/components/authentication/logout/logout.component";
import { AnonymousLoginComponent } from "src/components/authentication/login/anonymous-login/anonymous-login.component";
import { SeeListsComponent } from "src/components/list/see-lists/see-lists.component";
import { AllListsComponent } from "src/components/list/all-lists/all-lists.component";
// Guards
import { ListGuard } from "src/routing/guards/list.guard";
import { HomeGuard } from "src/routing/guards/home.guard";
// Pipes
import { TimestampPipe } from "src/pipes/timestamp";
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
    NotFoundComponent,
    GoogleLoginComponent,
    LoginComponent,
    LogoutComponent,
    AnonymousLoginComponent,
    SeeListsComponent,
    AllListsComponent,

    SafeurlPipe,
    TimestampPipe
  ],
  providers: [ListGuard, HomeGuard],
  bootstrap: [PriceListComponent]
})
export class AppModule {}
