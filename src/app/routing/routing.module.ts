import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListGuard } from "./list.guard";
import { HomeComponent } from "../../components/home/home.component";
import { ListComponent } from "../../components/list/list.component";

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [ListGuard] },
  {
    path: "list",
    canActivateChild: [ListGuard],
    children: [{ path: "", component: ListComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
