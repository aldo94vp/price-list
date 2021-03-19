import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListGuard } from "./guards/list.guard";
import { HomeComponent } from "../components/home/home.component";
import { ListComponent } from "../components/list/list.component";
import { HomeGuard } from "./guards/home.guard";
import { NotFoundComponent } from "src/components/not-found/not-found.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  { path: "not-found/:error", component: NotFoundComponent },
  { path: "home", component: HomeComponent, canActivate: [HomeGuard] },
  {
    path: "list",
    canActivateChild: [ListGuard],
    children: [
      {
        path: "",
        component: ListComponent
      },
      { 
        path: ":listId",
        component: ListComponent
      },
    ]
  },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
